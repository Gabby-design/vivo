'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-medium">
            <i className="fa-solid fa-location-dot"></i>
            <span>Shop B8, First Bank Line (Green Pillar), New Banex Plaza, Wuse 2, Abuja</span>
          </div>
          <a href="tel:08134454586" className="hover:text-white transition flex items-center gap-1.5 font-semibold text-slate-200">
            <i className="fa-solid fa-phone text-vivo-blue"></i> 0813 445 4586
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 gradient-brand rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-vivo-blue/20">
              <span>v</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl text-slate-900">VIVO</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-vivo-light text-vivo-blue border border-vivo-blue/20">Abuja</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Banex Plaza • Official Sales Store</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600">
            <Link
              href="/"
              className={isActive('/') ? 'text-vivo-blue font-bold border-b-2 border-vivo-blue pb-1' : 'hover:text-vivo-blue transition-colors'}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className={isActive('/shop') ? 'text-vivo-blue font-bold border-b-2 border-vivo-blue pb-1' : 'hover:text-vivo-blue transition-colors'}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={isActive('/contact') ? 'text-vivo-blue font-bold border-b-2 border-vivo-blue pb-1' : 'hover:text-vivo-blue transition-colors'}
            >
              Contact & Location
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="tel:08134454586"
              className="px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition text-sm flex items-center gap-2"
            >
              <i className="fa-solid fa-phone text-vivo-blue"></i> Call Store
            </a>
            <a
              href="https://wa.me/2348134454586"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i> WhatsApp Us
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium ${isActive('/') ? 'bg-vivo-blue text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium ${isActive('/shop') ? 'bg-vivo-blue text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Shop Catalog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg font-medium ${isActive('/contact') ? 'bg-vivo-blue text-white font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              Contact & Location
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
