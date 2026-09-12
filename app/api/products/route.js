import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '../../lib/db';

// GET /api/products
export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products (Add New Product)
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price) {
      return NextResponse.json({ success: false, error: 'Product name and price are required.' }, { status: 400 });
    }

    const currentProducts = getProducts();
    const nextId = currentProducts.length > 0 ? Math.max(...currentProducts.map((p) => p.id)) + 1 : 1;

    const formattedPriceNumber = parseInt(String(body.priceNumber || body.price).replace(/[^0-9]/g, '')) || 0;
    const formattedPrice = String(body.price).startsWith('₦')
      ? body.price
      : `₦${Number(formattedPriceNumber).toLocaleString()}`;

    const newProduct = {
      id: nextId,
      name: body.name,
      price: formattedPrice,
      priceNumber: formattedPriceNumber,
      category: body.category || 'vivo',
      brand: body.brand || 'Vivo Smartphone',
      badge: body.badge || 'Official Store Warranty',
      tag: body.tag || 'Abuja Ready Stock',
      desc: body.desc || 'High performance smartphone with official warranty.',
      specs: {
        camera: body.specs?.camera || '50MP Main Camera System',
        chipset: body.specs?.chipset || 'Octa-Core High Speed Processor',
        battery: body.specs?.battery || '5000mAh Battery + Fast Charge',
        storage: body.specs?.storage || '8GB RAM • 256GB Storage',
        display: body.specs?.display || '6.7-inch 120Hz Display',
        colors: body.specs?.colors || 'Black, Blue',
        box: body.specs?.box || 'Phone, Charger, Cable, Protective Case',
      },
      image: body.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
      fallbackImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      tags: `${body.name} ${body.category} ${body.brand} ${body.badge}`.toLowerCase(),
    };

    const updated = [newProduct, ...currentProducts];
    saveProducts(updated);

    return NextResponse.json({ success: true, message: 'Product created successfully', data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}
