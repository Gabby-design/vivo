'use client';

import { useState } from 'react';

export default function ProductCard({ product, onOpenModal }) {
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleWaOrder = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Hi Vivo Smart Phone Office, I'm interested in the ${product.name} (${product.price}).`);
    window.open(`https://wa.me/2348134454586?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={() => onOpenModal(product)}
      className="product-card bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-vivo-blue transition cursor-pointer flex flex-col justify-between active:scale-95 duration-150"
    >
      <div>
        <div className="h-56 relative overflow-hidden group bg-slate-100">
          <img
            src={imgSrc}
            onError={() => setImgSrc(product.fallbackImg || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80')}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-vivo-blue uppercase">{product.brand}</span>
            <span className="text-[10px] text-slate-500 font-medium">{product.tag}</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl text-slate-900 leading-snug">{product.name}</h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{product.desc}</p>
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-100 mt-4 space-y-2">
        <div className="flex justify-between items-baseline pt-2">
          <span className="text-xs text-slate-500">Official Price</span>
          <span className="font-heading font-extrabold text-xl text-slate-900">{product.price}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenModal(product)}
            className="py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition"
          >
            <i className="fa-solid fa-circle-info mr-1"></i> Specs
          </button>
          <button
            onClick={handleWaOrder}
            className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-1 transition shadow-sm"
          >
            <i className="fa-brands fa-whatsapp"></i> Order
          </button>
        </div>
      </div>
    </div>
  );
}
