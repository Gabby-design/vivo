'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [custName, setCustName] = useState('');
  const [waProduct, setWaProduct] = useState('Vivo V70 5G (₦450,000)');
  const [waOption, setWaOption] = useState('Store Pickup at Shop B8 Banex Plaza');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSendWa = () => {
    const text = encodeURIComponent(
      `Hi Vivo Smart Phone Office, my name is ${custName || 'a customer'}. I'd like to enquire about: ${waProduct} - Preference: ${waOption}.`
    );
    window.open(`https://wa.me/2348134454586?text=${text}`, '_blank');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative py-16 gradient-hero-light border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase">
            <i className="fa-solid fa-location-dot mr-1"></i> Shop B8, New Banex Plaza, Wuse 2, Abuja
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
            Contact Us & Store Location
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Visit our physical store inside Park N' Shop complex or reach out for inquiries, pricing, and fast delivery.
          </p>
        </div>
      </section>

      {/* MAIN SECTION: CONTACT CARDS, FORM & LOCATION DETAILS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="tel:08134454586"
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl hover:border-vivo-blue/50 transition space-y-4 text-center group active:scale-95 duration-150"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 text-vivo-blue flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h3 className="font-bold text-xl text-slate-900">Direct Phone Line</h3>
              <p className="text-base font-extrabold text-vivo-blue">0813 445 4586</p>
              <p className="text-xs text-slate-500">Tap to call our store representative directly.</p>
            </a>

            <a
              href="https://wa.me/2348134454586?text=Hi%20Vivo%20Smart%20Phone%20Office"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl hover:border-emerald-500/50 transition space-y-4 text-center group active:scale-95 duration-150"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <h3 className="font-bold text-xl text-slate-900">WhatsApp Chat</h3>
              <p className="text-base font-extrabold text-emerald-600">Chat with Manager</p>
              <p className="text-xs text-slate-500">Instant response for pricing & availability.</p>
            </a>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-store"></i>
              </div>
              <h3 className="font-bold text-xl text-slate-900">Physical Store</h3>
              <p className="text-sm font-extrabold text-slate-900">Shop B8, Banex Plaza</p>
              <p className="text-xs text-slate-500">Open Mon–Sat 8am–6pm, Sun 12pm–5pm.</p>
            </div>
          </div>

          {/* INQUIRY FORM & ADDRESS BREAKDOWN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Instant Inquiry Form */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <h3 className="font-heading font-extrabold text-2xl text-slate-900">Send Instant Inquiry</h3>
                <p className="text-xs text-slate-500">
                  Select your model and message preference to construct a direct WhatsApp order or inquiry!
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name (Optional):</label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    placeholder="e.g. Chidi, Amina..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Phone Model / Product:</label>
                  <select
                    value={waProduct}
                    onChange={(e) => setWaProduct(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Vivo V70 5G (₦450,000)">Vivo V70 5G (₦450,000)</option>
                    <option value="iPhone 15 Pro Max 256GB (₦1,750,000)">iPhone 15 Pro Max 256GB (₦1,750,000)</option>
                    <option value="iPhone 13 128GB (₦580,000)">iPhone 13 128GB (₦580,000)</option>
                    <option value="Samsung Galaxy S24 Ultra 512GB (₦1,380,000)">Samsung Galaxy S24 Ultra 512GB (₦1,380,000)</option>
                    <option value="Samsung Galaxy A55 5G 256GB (₦380,000)">Samsung Galaxy A55 5G 256GB (₦380,000)</option>
                    <option value="Vivo V40 5G (₦380,000)">Vivo V40 5G (₦380,000)</option>
                    <option value="Oppo Reno 11 Pro 5G 256GB (₦420,000)">Oppo Reno 11 Pro 5G 256GB (₦420,000)</option>
                    <option value="Vivo 80W Charger Kit (₦22,000)">Vivo 80W Charger Kit (₦22,000)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Delivery / Pickup Choice:</label>
                  <select
                    value={waOption}
                    onChange={(e) => setWaOption(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Store Pickup at Shop B8 Banex Plaza">Store Pickup at Shop B8 Banex Plaza</option>
                    <option value="Same-Day Abuja Home Delivery">Same-Day Abuja Home Delivery</option>
                    <option value="General Product Inquiry">General Product Inquiry</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSendWa}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i> Send Inquiry on WhatsApp
              </button>
            </div>

            {/* Storefront Photo & Address Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              {/* Storefront Photo Card */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 h-60 shadow-xl bg-slate-100 group">
                <img
                  src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80';
                  }}
                  alt="Banex Plaza Smartphone Retail Store"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-vivo-blue text-white font-bold text-xs px-3 py-1 rounded-xl shadow">
                    Physical Retail Storefront
                  </span>
                  <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-xl shadow">
                    Shop B8
                  </span>
                </div>
              </div>

              {/* Address Breakdown Card */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xl">
                <h3 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
                  <i className="fa-solid fa-building text-vivo-blue"></i> Official Store Address
                </h3>

                <div className="text-sm text-slate-600 space-y-2 leading-relaxed">
                  <p className="font-bold text-slate-900 text-base">Vivo Smart Phone Office</p>
                  <p>Shop B8, First Bank Line (Green Pillar),</p>
                  <p>New Banex Plaza, Aminu Kano Crescent,</p>
                  <p>Wuse 2, Abuja 900001, FCT, Nigeria.</p>
                  <p className="text-xs text-amber-900 font-semibold bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                    📍 <strong>Landmark Directions:</strong> Enter New Banex Plaza along Aminu Kano Crescent, walk into the First Bank Line heading toward the Park N' Shop complex, and look out for the Green Pillar at Shop B8.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:08134454586"
                    className="flex-1 py-3 rounded-xl bg-vivo-blue hover:bg-blue-600 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                  >
                    <i className="fa-solid fa-phone"></i> Call 0813 445 4586
                  </a>
                  <a
                    href="https://maps.google.com/?q=New+Banex+Plaza+Aminu+Kano+Crescent+Wuse+2+Abuja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm text-center flex items-center justify-center gap-2 hover:bg-slate-200 transition border border-slate-300 active:scale-95"
                  >
                    <i className="fa-solid fa-diamond-turn-right text-red-500"></i> Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* HOURS SCHEDULE & MAP EMBED SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Hours Schedule Card */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-heading font-bold text-xl text-slate-900 flex items-center gap-2">
                    <i className="fa-solid fa-clock text-vivo-blue"></i> Weekly Opening Hours
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
                    Open Daily
                  </span>
                </div>

                <div className="text-sm space-y-4 pt-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Monday – Friday</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 bg-blue-50/50 p-2 rounded-xl">
                    <span className="text-vivo-blue font-bold">Saturday</span>
                    <span className="font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-vivo-blue/20">
                      Open (Closes 6:00 PM)
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Sunday</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">12:00 PM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <i className="fa-solid fa-shield-halved text-amber-600"></i> Sales Only Notice
                </div>
                <p>We are strictly an authorized retail sales store. We do not provide smartphone repairs or maintenance services.</p>
              </div>
            </div>

            {/* Google Maps Interactive Embed */}
            <div className="lg:col-span-7 h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative bg-white">
              <iframe
                title="Store Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.8166580979737!2d7.472911!3d9.080517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a4f5f84d6ad%3A0xc00f074d2fa81673!2sBanex%20Plaza%2C%20Aminu%20Kano%20Cres%2C%20Wuse%202%2C%20Abuja!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* FAQ ACCORDION SECTION */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading font-black text-3xl text-slate-900">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-sm">Clear answers regarding authenticity, delivery, and payment options.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Are all smartphones sold here 100% genuine & brand new?',
                  a: 'Yes! 100% guaranteed. Every smartphone (Vivo, iPhone, Samsung, Oppo) sold at Vivo Smart Phone Office comes in its original factory-sealed box with full manufacturer warranty.',
                },
                {
                  q: 'Do you offer phone repair services?',
                  a: 'No. We are strictly an authorized retail sales store for new smartphones and original accessories. We do not offer repair services.',
                },
                {
                  q: 'Can I get doorstep delivery across Abuja?',
                  a: 'Yes! We offer same-day express delivery across Wuse 2, Maitama, Asokoro, Gwarinpa, Apo, Garki, Jabi, Utako, Lokogoma, and Kubwa. Order via WhatsApp or call 0813 445 4586.',
                },
                {
                  q: 'What payment methods are accepted at the store?',
                  a: 'We accept Instant Bank Transfers, POS Card payments, and Cash at Shop B8 in Banex Plaza.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left font-bold text-slate-900 text-base flex justify-between items-center"
                  >
                    <span>{faq.q}</span>
                    <i
                      className={`fa-solid fa-chevron-down text-slate-500 transition-transform duration-200 ${
                        openFaq === idx ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>
                  {openFaq === idx && (
                    <div className="pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
