'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileDock() {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-2 px-3 shadow-[0_-10px_25px_rgba(0,0,0,0.08)] pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-4 gap-1 text-center">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl active:scale-95 transition-transform ${
            isActive('/') ? 'text-vivo-blue font-bold' : 'text-slate-500 hover:text-vivo-blue'
          }`}
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[10px] mt-0.5 font-semibold">Home</span>
        </Link>
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl active:scale-95 transition-transform ${
            isActive('/shop') ? 'text-vivo-blue font-bold' : 'text-slate-500 hover:text-vivo-blue'
          }`}
        >
          <i className="fa-solid fa-store text-lg"></i>
          <span className="text-[10px] mt-0.5 font-semibold">Shop</span>
        </Link>
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl active:scale-95 transition-transform ${
            isActive('/contact') ? 'text-vivo-blue font-bold' : 'text-slate-500 hover:text-vivo-blue'
          }`}
        >
          <i className="fa-solid fa-location-dot text-lg"></i>
          <span className="text-[10px] mt-0.5 font-semibold">Location</span>
        </Link>
        <a
          href="https://wa.me/2348134454586"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl text-emerald-600 active:scale-95 transition-transform"
        >
          <i className="fa-brands fa-whatsapp text-xl"></i>
          <span className="text-[10px] mt-0.5 font-semibold">Chat</span>
        </a>
      </div>
    </div>
  );
}
