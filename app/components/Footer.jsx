import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-28 md:pb-14 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Store Brand & Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg">
                v
              </div>
              <div>
                <span className="font-heading font-black text-lg text-white block">VIVO Smart Phone Office</span>
                <span className="text-[10px] text-slate-400 font-medium">Abuja • Banex Plaza</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Shop B8, First Bank Line (Green Pillar), New Banex Plaza, Aminu Kano Crescent, Wuse 2, Abuja.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold text-[10px]">
                ★ 4.9 Google Reviews (45)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold text-[10px]">
                👩 Women-Owned
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-solid fa-angle-right text-vivo-blue text-[10px]"></i> Home Page
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-solid fa-angle-right text-vivo-blue text-[10px]"></i> Shop Full Catalog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-solid fa-angle-right text-vivo-blue text-[10px]"></i> Store Location & Hours
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-blue-300 transition flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-vivo-blue text-[10px]"></i> Store Owner Portal
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/2348134454586"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-2 font-bold"
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i> Instant WhatsApp Order
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Brands */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Available Brands</h4>
            <ul className="space-y-2.5 font-medium text-slate-400">
              <li>
                <Link href="/shop?category=vivo" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen text-slate-500 text-[10px]"></i> Vivo V-Series & Y-Series
                </Link>
              </li>
              <li>
                <Link href="/shop?category=iphone" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-brands fa-apple text-slate-500 text-[10px]"></i> Apple iPhone 15 & 14 Series
                </Link>
              </li>
              <li>
                <Link href="/shop?category=samsung" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-solid fa-mobile-button text-slate-500 text-[10px]"></i> Samsung Galaxy Ultra & A-Series
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-white transition flex items-center gap-2">
                  <i className="fa-solid fa-headphones text-slate-500 text-[10px]"></i> Fast Chargers & Power Banks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Hours & Contact */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">Store Hours & Call</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Mon – Sat:</span> <span className="text-white font-bold">8:00 AM – 6:00 PM</span>
              </p>
              <p className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Sunday:</span> <span className="text-white font-bold">12:00 PM – 5:00 PM</span>
              </p>
              <a href="tel:08134454586" className="block pt-2 font-bold text-vivo-blue hover:text-blue-400 text-sm flex items-center gap-2">
                <i className="fa-solid fa-phone"></i> 0813 445 4586
              </a>
              <p className="text-[10px] text-amber-400 font-semibold pt-1">⚠️ Sales Only Store • No Repairs</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-8 text-slate-500 text-[11px]">
          <p>© Vivo Smart Phone Office. Shop B8, First Bank Line, New Banex Plaza, Wuse 2, Abuja.</p>
          <p className="font-medium">100% Genuine Sealed Products • Same-Day Abuja Delivery</p>
        </div>
      </div>
    </footer>
  );
}
