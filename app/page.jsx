'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [storeStatus, setStoreStatus] = useState({ isOpen: true, text: 'Open Today • Closes 6:00 PM' });

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1-6 = Mon-Sat
    const hour = now.getHours();
    let open = false;
    let closing = '6:00 PM';

    if (day >= 1 && day <= 6) {
      if (hour >= 8 && hour < 18) open = true;
      closing = '6:00 PM';
    } else if (day === 0) {
      if (hour >= 12 && hour < 17) open = true;
      closing = '5:00 PM';
    }

    if (open) {
      setStoreStatus({
        isOpen: true,
        text: `Open Today • Closes ${closing}`,
      });
    } else {
      setStoreStatus({
        isOpen: false,
        text: `Store Closed • Opens ${day === 6 ? '12:00 PM Sun' : '8:00 AM'}`,
      });
    }
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 gradient-hero-light border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-extrabold text-slate-800">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Authorized Multi-Brand Retailer</span>
                <span className="text-slate-300">•</span>
                <span className="text-amber-600 font-bold">★ 4.9 (45 Reviews)</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl xl:text-7xl text-slate-900 tracking-tight leading-[1.1]">
                Your Premier <span className="gradient-text-blue">Multi-Brand Phone</span> Store in Wuse 2, Abuja
              </h1>

              <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Step into our store at <strong>New Banex Plaza</strong> for original Apple iPhones, Samsung Galaxy, Vivo smartphones, official accessories, and expert customer care with same-day Abuja delivery.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="tel:08134454586"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-vivo-blue hover:bg-vivo-darkblue text-white font-extrabold text-base shadow-xl shadow-vivo-blue/30 transition flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-solid fa-phone text-lg"></i> Call Now (0813 445 4586)
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-300 text-slate-900 font-extrabold text-base shadow-md hover:bg-slate-100 transition flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-solid fa-location-dot text-red-500 text-lg"></i> Get Directions
                </Link>
                <a
                  href="https://wa.me/2348134454586?text=Hello!%20I'd%20like%20to%20inquire%20about%20smartphones."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg transition flex items-center justify-center gap-3 active:scale-95"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp Order
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 border-t border-slate-200">
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-truck text-emerald-600 text-sm"></i> Same-Day Abuja Delivery
                </span>
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-vivo-blue text-sm"></i> 100% Original Sealed Box
                </span>
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-person-dress text-purple-600 text-sm"></i> Women-Owned Business
                </span>
              </div>
            </div>

            {/* Right Hero Product Card Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl p-3 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl space-y-3 group cursor-pointer">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
                    }}
                    alt="Vivo V70 5G Flagship"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow">
                    In Stock at Banex Plaza
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-vivo-light">Featured Model</span>
                    <h3 className="font-heading font-black text-2xl">Vivo V70 5G</h3>
                    <p className="text-xs text-slate-300 font-medium">Triple 50MP ZEISS Portrait Camera • 80W FlashCharge</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Official Price</span>
                      <span className="font-heading font-extrabold text-2xl text-slate-900">₦450,000</span>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        storeStatus.isOpen
                          ? 'bg-emerald-500/20 text-emerald-800 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-900 border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                        }`}
                      ></span>
                      {storeStatus.text}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href="/shop"
                      className="px-5 py-3 rounded-xl bg-vivo-blue hover:bg-vivo-darkblue text-white font-bold text-sm shadow-md transition flex items-center gap-2 grow justify-center active:scale-95"
                    >
                      Browse Full Shop <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION GRID */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-vivo-blue flex items-center justify-center text-xl font-bold">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Multi-Brand Variety</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official Apple iPhones, Samsung Galaxy, Vivo 5G models, Oppo, and genuine fast chargers under one roof.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                <i className="fa-solid fa-boxes-packing"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">100% Factory Sealed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every phone sold comes in its original factory-sealed box with official manufacturer warranty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                <i className="fa-solid fa-star"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">4.9★ Rated Store</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 45 verified 5-star Google reviews from satisfied customers across Abuja and nationwide.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
                <i className="fa-solid fa-store"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Banex Plaza Location</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Physical retail store at Shop B8, First Bank Line (Green Pillar), New Banex Plaza, Wuse 2.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATED ABOUT US SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300 text-xs font-bold uppercase">
              <i className="fa-solid fa-shield-heart mr-1"></i> Authorized Sales Store
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900">About Vivo Smart Phone Office</h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We are a premier, women-owned retail business center located inside the Park N' Shop complex at New Banex Plaza, Wuse 2, Abuja.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 text-slate-700 text-sm leading-relaxed">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                <h3 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-store text-vivo-blue"></i> Physical Storefront Experience
                </h3>
                <p>
                  Located at <strong>Shop B8, First Bank Line (Green Pillar)</strong> in New Banex Plaza, our physical store allows you to inspect, verify, and purchase genuine smartphones with total peace of mind.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                <h3 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-person-dress text-purple-600"></i> Proudly Women-Owned Business
                </h3>
                <p>
                  As a women-owned electronics enterprise in Abuja, we take pride in delivering honest pricing, personalized customer support, and instant same-day doorstep delivery across FCT.
                </p>
              </div>

              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <i className="fa-solid fa-circle-exclamation text-amber-600"></i> Retail Sales Only Notice
                </div>
                <p>
                  Please note that we are strictly a retail sales store for brand new smartphones and original accessories. We do not provide phone repair or maintenance services.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-slate-200 h-80 sm:h-96 shadow-2xl bg-slate-100 group">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Banex Plaza Smartphone Retail Store"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-vivo-blue text-white text-xs font-bold px-3 py-1 rounded-full">New Banex Plaza • Shop B8</span>
                <p className="text-sm font-semibold text-slate-200">First Bank Line (Green Pillar), Aminu Kano Crescent, Wuse 2, Abuja</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATED REVIEWS SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase">
                ★ Verified Google Reviews
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-slate-900">What Our Abuja Customers Say</h2>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-3xl font-black font-heading text-slate-900">4.9</div>
              <div>
                <div className="flex text-amber-400 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className="text-xs text-slate-500 font-semibold">Based on 45 Google Reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Bought my Vivo V30 Pro at Shop B8 Banex Plaza. Authentic sealed box and the manager was extremely warm and professional. Highly recommended!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-vivo-blue font-bold flex items-center justify-center text-sm">
                  OA
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Olamide A.</h4>
                  <span className="text-xs text-emerald-600 font-medium">Verified Buyer • Wuse 2</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Got an iPhone 15 Pro Max delivered to my office in Gwarinpa within 2 hours. 100% original factory sealed box. Best phone store in Abuja!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold flex items-center justify-center text-sm">
                  FA
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fatima A.</h4>
                  <span className="text-xs text-emerald-600 font-medium">Verified Buyer • Gwarinpa</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-400 text-sm">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Fair pricing for Samsung Galaxy S24 Ultra. The Green Pillar location inside Banex Plaza is very easy to find. Excellent customer service!"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-sm">
                  EK
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Emeka K.</h4>
                  <span className="text-xs text-emerald-600 font-medium">Verified Buyer • Maitama</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
