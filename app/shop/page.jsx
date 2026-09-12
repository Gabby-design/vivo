'use client';

import { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductSpecModal from '../components/ProductSpecModal';

export default function ShopPage() {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 6;

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.tags && p.tags.toLowerCase().includes(query)) ||
        p.price.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative py-16 gradient-hero-light border-b border-slate-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100 text-vivo-blue border border-vivo-blue/20 text-xs font-bold uppercase">
            <i className="fa-solid fa-mobile-screen-button mr-1"></i> Multi-Brand Shop Catalog
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight">
            Smartphones & Accessories
          </h1>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            100% Factory Sealed Box • Apple iPhone, Samsung Galaxy, Vivo, Oppo & Chargers at Shop B8, Banex Plaza.
          </p>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-vivo-darkblue to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="bg-emerald-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase">
                Best Value Deal
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl">Apple iPhone 15 Pro Max 256GB</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Natural Titanium Finish, A17 Pro Chip, 48MP Camera with 5x Telephoto Zoom. Sealed Box.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <span className="font-heading font-black text-2xl text-emerald-400">₦1,750,000</span>
                <button
                  onClick={() => setSelectedProduct(products[0])}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs hover:bg-slate-100 transition active:scale-95"
                >
                  <i className="fa-solid fa-circle-info mr-1"></i> Full Specs
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80';
                }}
                alt="Apple iPhone 15 Pro Max"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-white text-xs font-bold">
                <span> Official Apple Factory Sealed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG GRID WITH SEARCH, FILTERS & PAGINATION */}
      <section id="catalogSection" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            <div className="max-w-md mx-auto relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by brand or model (e.g. iPhone 15, Galaxy S24, Vivo V40, AirPods)..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-vivo-blue text-sm transition"
              />
            </div>

            {/* Brand Filter Tabs (Swipable on Mobile) */}
            <div className="flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 text-sm font-semibold py-1 px-1 justify-start sm:justify-center">
              {[
                { key: 'all', label: 'All Items (20)' },
                { key: 'iphone', label: 'iPhones (4)' },
                { key: 'samsung', label: 'Samsung (4)' },
                { key: 'vivo', label: 'Vivo (5)' },
                { key: 'oppo-redmi', label: 'Oppo / Redmi (2)' },
                { key: 'accessories', label: 'Accessories (5)' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => handleCategoryChange(tab.key)}
                  className={`shrink-0 snap-start px-5 py-2.5 rounded-xl border transition active:scale-95 ${
                    selectedCategory === tab.key
                      ? 'bg-vivo-blue text-white border-vivo-blue shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {currentProducts.length > 0 ? (
            <div id="productGrid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenModal={(p) => setSelectedProduct(p)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">No Products Found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                No items matched your search query "{searchQuery}". Try searching for another brand or model!
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-vivo-blue text-white font-bold text-xs"
              >
                Clear Search Filter
              </button>
            </div>
          )}

          {/* DYNAMIC PAGINATION CONTROLS BAR */}
          {filteredProducts.length > 0 && (
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-slate-500">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}–
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} items
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <i className="fa-solid fa-chevron-left"></i> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-extrabold border transition ${
                      currentPage === pageNum
                        ? 'bg-vivo-blue text-white border-vivo-blue shadow-md'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRODUCT SPECS MODAL (SLIDES UP AS MOBILE BOTTOM SHEET) */}
      <ProductSpecModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
