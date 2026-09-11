'use client';

import { useEffect, useState } from 'react';

export default function ProductSpecModal({ product, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (product) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [product]);

  if (!product) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const waText = encodeURIComponent(`Hi Vivo Smart Phone Office, I'd like to order: ${product.name} (${product.price}) after checking details.`);
  const waUrl = `https://wa.me/2348134454586?text=${waText}`;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white border-t sm:border border-slate-200 w-full max-w-xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full sm:translate-y-0'
        }`}
      >
        {/* Mobile Bottom Sheet Drag Handle Bar */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-2 mb-2"></div>

        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <img
            src={product.image}
            onError={(e) => {
              e.currentTarget.src = product.fallbackImg || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80';
            }}
            alt={product.name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-slate-200 shadow-md shrink-0 bg-slate-100"
          />
          <div className="space-y-1 grow">
            <span className="text-xs font-bold text-vivo-blue uppercase">{product.brand}</span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-slate-900 leading-tight">{product.name}</h3>
            <div className="flex items-center gap-2 pt-1">
              <span className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-600">{product.price}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Original Box
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">📷 Camera System</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.camera || 'N/A'}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">⚡ Chipset / Processor</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.chipset || 'N/A'}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">🔋 Battery & Charging</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.battery || 'N/A'}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">💾 Storage & RAM</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.storage || 'N/A'}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">📱 Display Specs</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.display || 'N/A'}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">🎨 Color Finishes</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.colors || 'Standard Factory Finishes'}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 gap-4">
            <span className="text-slate-500 font-medium shrink-0">📦 Sealed Box Includes</span>
            <span className="font-bold text-slate-800 text-right">{product.specs?.box || 'Original Box Sealed'}</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm text-center flex items-center justify-center gap-2 shadow-lg transition"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i> Order This Item via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
