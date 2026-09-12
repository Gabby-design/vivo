'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'vivo_office_products_v1';

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch products from REST API
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProductList(json.data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          } catch (e) {}
          setIsLoaded(true);
          return;
        }
      }
    } catch (e) {
      console.warn('API fetch failed, reading local storage cache:', e);
    }

    // Fallback to localStorage or initial data
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductList(parsed);
          setIsLoaded(true);
          return;
        }
      }
    } catch (e) {}

    setProductList(initialProducts);
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product via API
  const addProduct = async (newProductData) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductData),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const updated = [json.data, ...productList];
          setProductList(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return json.data;
        }
      }
    } catch (e) {
      console.error('API POST failed:', e);
    }

    // Fallback local addition
    const nextId = productList.length > 0 ? Math.max(...productList.map((p) => p.id)) + 1 : 1;
    const formattedPriceNumber = parseInt(String(newProductData.priceNumber || newProductData.price).replace(/[^0-9]/g, '')) || 0;
    const formattedPrice = newProductData.price.startsWith('₦') ? newProductData.price : `₦${Number(formattedPriceNumber).toLocaleString()}`;

    const newProduct = {
      id: nextId,
      name: newProductData.name || 'New Smartphone',
      price: formattedPrice,
      priceNumber: formattedPriceNumber,
      category: newProductData.category || 'vivo',
      brand: newProductData.brand || 'Vivo Smartphone',
      badge: newProductData.badge || 'New Arrival',
      tag: newProductData.tag || 'Official Store Warranty',
      desc: newProductData.desc || 'High performance smartphone with official warranty.',
      specs: {
        camera: newProductData.specs?.camera || '50MP Main Camera System',
        chipset: newProductData.specs?.chipset || 'Octa-Core High Speed Processor',
        battery: newProductData.specs?.battery || '5000mAh Battery + Fast Charge',
        storage: newProductData.specs?.storage || '8GB RAM • 256GB Storage',
        display: newProductData.specs?.display || '6.7-inch 120Hz Full HD+ Display',
        colors: newProductData.specs?.colors || 'Black, Blue',
        box: newProductData.specs?.box || 'Phone, Charger, Cable, Protective Case',
      },
      image: newProductData.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      fallbackImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      tags: `${newProductData.name} ${newProductData.category} ${newProductData.brand} ${newProductData.badge}`.toLowerCase(),
    };

    const updated = [newProduct, ...productList];
    setProductList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  };

  // Edit existing product via API
  const editProduct = async (updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const updated = productList.map((p) => (p.id === updatedProduct.id ? json.data : p));
          setProductList(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return;
        }
      }
    } catch (e) {
      console.error('API PUT failed:', e);
    }

    // Fallback local edit
    const formattedPriceNumber = parseInt(String(updatedProduct.priceNumber || updatedProduct.price).replace(/[^0-9]/g, '')) || 0;
    const formattedPrice = String(updatedProduct.price).startsWith('₦')
      ? updatedProduct.price
      : `₦${Number(formattedPriceNumber).toLocaleString()}`;

    const updated = productList.map((p) => {
      if (p.id === updatedProduct.id) {
        return {
          ...p,
          ...updatedProduct,
          price: formattedPrice,
          priceNumber: formattedPriceNumber,
          tags: `${updatedProduct.name} ${updatedProduct.category} ${updatedProduct.brand}`.toLowerCase(),
        };
      }
      return p;
    });

    setProductList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Delete product via API
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          const updated = productList.filter((p) => p.id !== productId);
          setProductList(updated);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return;
        }
      }
    } catch (e) {
      console.error('API DELETE failed:', e);
    }

    // Fallback local delete
    const updated = productList.filter((p) => p.id !== productId);
    setProductList(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Reset to initial catalog
  const resetProducts = () => {
    setProductList(initialProducts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
  };

  return (
    <ProductContext.Provider
      value={{
        products: productList,
        isLoaded,
        fetchProducts,
        addProduct,
        editProduct,
        deleteProduct,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
