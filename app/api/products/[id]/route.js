import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '../../../../lib/db';

// PUT /api/products/[id] (Update Product)
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const currentProducts = getProducts();

    const index = currentProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    const formattedPriceNumber = parseInt(String(body.priceNumber || body.price).replace(/[^0-9]/g, '')) || 0;
    const formattedPrice = String(body.price).startsWith('₦')
      ? body.price
      : `₦${Number(formattedPriceNumber).toLocaleString()}`;

    const updatedProduct = {
      ...currentProducts[index],
      ...body,
      id,
      price: formattedPrice,
      priceNumber: formattedPriceNumber,
      tags: `${body.name || currentProducts[index].name} ${body.category || currentProducts[index].category} ${body.brand || currentProducts[index].brand}`.toLowerCase(),
    };

    currentProducts[index] = updatedProduct;
    saveProducts(currentProducts);

    return NextResponse.json({ success: true, message: 'Product updated successfully', data: updatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] (Delete Product)
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const currentProducts = getProducts();

    const filtered = currentProducts.filter((p) => p.id !== id);
    if (filtered.length === currentProducts.length) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    saveProducts(filtered);

    return NextResponse.json({ success: true, message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
