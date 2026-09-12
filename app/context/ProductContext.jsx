'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

const STORAGE_KEY = 'vivo_office_products_v1';

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage or default data
  useEffect(() => {
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
    } catch (e) {
      console.error('Failed to load products from localStorage:', e);
    }
    setProductList(initialProducts);
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  const saveToStorage = (updated) => {
    setProductList(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  };

  // Add new product
  const addProduct = (newProductData) => {
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
    saveToStorage(updated);
    return newProduct;
  };

  // Edit existing product
  const editProduct = (updatedProduct) => {
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
          tags: `${updatedProduct.name} ${updatedProduct.category} ${updatedProduct.brand} ${updatedProduct.badge}`.toLowerCase(),
        };
      }
      return p;
    });

    saveToStorage(updated);
  };

  // Delete product
  const deleteProduct = (productId) => {
    const updated = productList.filter((p) => p.id !== productId);
    saveToStorage(updated);
  };

  // Reset to initial catalog
  const resetProducts = () => {
    saveToStorage(initialProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products: productList,
        isLoaded,
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
