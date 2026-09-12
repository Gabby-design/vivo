'use client';

import { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import Link from 'next/link';

const PRESET_IMAGES = [
  { label: 'Vivo Phone', url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80' },
  { label: 'Apple iPhone', url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80' },
  { label: 'Samsung Galaxy', url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80' },
  { label: 'AirPods / Audio', url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80' },
];

const DEFAULT_PIN = '1234';

export default function AdminPage() {
  const { products, addProduct, editProduct, deleteProduct, resetProducts } = useProducts();
  const [pinInput, setPinInput] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'vivo',
    brand: 'Vivo V-Series',
    price: '',
    priceNumber: '',
    badge: 'Official Store Warranty',
    tag: 'Abuja Ready Stock',
    desc: '',
    image: PRESET_IMAGES[0].url,
    specs: {
      camera: '',
      chipset: '',
      battery: '',
      storage: '',
      display: '',
      colors: '',
      box: '',
    },
  });

  // Handle Login PIN via API
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthed(true);
        setAuthError('');
      } else {
        setAuthError(json.error || 'Incorrect Security PIN. Default PIN is 1234.');
      }
    } catch (err) {
      if (pinInput.trim() === DEFAULT_PIN) {
        setIsAuthed(true);
      } else {
        setAuthError('Authentication error. Default PIN is 1234.');
      }
    }
  };

  // Open Modal for Create
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'vivo',
      brand: 'Vivo V-Series',
      price: '',
      priceNumber: '',
      badge: 'ZEISS Portrait',
      tag: 'Official Warranty',
      desc: '',
      image: PRESET_IMAGES[0].url,
      specs: {
        camera: '50MP OIS Main + Ultra-Wide System',
        chipset: 'High-Performance Octa-Core Chip',
        battery: '5000mAh Battery + 80W Fast Charge',
        storage: '12GB RAM • 256GB High Speed Storage',
        display: '6.78-inch 120Hz AMOLED Display',
        colors: 'Black, Blue',
        box: 'Phone, Fast Charger, Cable, Case',
      },
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || 'vivo',
      brand: item.brand || '',
      price: item.price || '',
      priceNumber: item.priceNumber || '',
      badge: item.badge || '',
      tag: item.tag || '',
      desc: item.desc || '',
      image: item.image || PRESET_IMAGES[0].url,
      specs: {
        camera: item.specs?.camera || '',
        chipset: item.specs?.chipset || '',
        battery: item.specs?.battery || '',
        storage: item.specs?.storage || '',
        display: item.specs?.display || '',
        colors: item.specs?.colors || '',
        box: item.specs?.box || '',
      },
    });
    setIsModalOpen(true);
  };

  // Submit Form (Add or Edit)
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill out product name and price.');
      return;
    }

    if (editingItem) {
      editProduct({
        ...formData,
        id: editingItem.id,
      });
      alert(`Updated ${formData.name} successfully!`);
    } else {
      addProduct(formData);
      alert(`Added ${formData.name} to the store catalog!`);
    }
    setIsModalOpen(false);
  };

  // Delete product confirm
  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) {
      deleteProduct(id);
    }
  };

  // Reset to default dataset
  const handleResetCatalog = () => {
    if (confirm('Reset catalog back to original 20 default products? Custom products will be replaced.')) {
      resetProducts();
    }
  };

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.price.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [products, searchQuery, activeCategory]);

  // Inventory stats
  const stats = useMemo(() => {
    const totalCount = products.length;
    const totalVal = products.reduce((acc, curr) => acc + (curr.priceNumber || 0), 0);
    const vivoCount = products.filter((p) => p.category === 'vivo').length;
    const iphoneCount = products.filter((p) => p.category === 'iphone').length;
    const samsungCount = products.filter((p) => p.category === 'samsung').length;
    const accCount = products.filter((p) => p.category === 'accessories').length;
    return { totalCount, totalVal, vivoCount, iphoneCount, samsungCount, accCount };
  }, [products]);

  // If not logged in, render PIN Lock Screen
  if (!isAuthed) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 gradient-hero-light">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-100 text-vivo-blue rounded-full flex items-center justify-center mx-auto text-2xl">
            <i className="fa-solid fa-lock"></i>
          </div>
          <div className="space-y-2">
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">Owner Portal Access</h1>
            <p className="text-slate-600 text-sm">Enter security PIN to access product management & pricing controls.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full text-center tracking-widest font-mono text-2xl px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vivo-blue text-slate-900"
                autoFocus
              />
            </div>

            {authError && <p className="text-rose-600 text-xs font-semibold">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-vivo-blue hover:bg-blue-700 text-white font-bold text-base transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <i className="fa-solid fa-key mr-2"></i> Unlock Admin Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
            <span>Store: Shop B8, Banex Plaza</span>
            <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-mono">PIN: 1234</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/60 pb-24">
      {/* ADMIN HEADER */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <i className="fa-solid fa-shield-halved"></i> Store Manager Portal
              </div>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
                Product Inventory & Catalog Control
              </h1>
              <p className="text-slate-400 text-sm">
                Add, edit, change prices, or remove smartphones live from Shop B8, Banex Plaza catalog.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenAddModal}
                className="py-3 px-5 rounded-xl bg-vivo-blue hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 active:scale-95"
              >
                <i className="fa-solid fa-circle-plus text-base"></i> Add New Product
              </button>
              <button
                onClick={handleResetCatalog}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
                title="Reset back to default 20 products"
              >
                <i className="fa-solid fa-rotate-left"></i> Reset
              </button>
              <button
                onClick={() => setIsAuthed(false)}
                className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 transition-all text-xs"
                title="Lock Portal"
              >
                <i className="fa-solid fa-power-off"></i>
              </button>
            </div>
          </div>

          {/* DASHBOARD METRICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800">
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 text-xs font-medium">Total Items</span>
              <p className="text-2xl font-black text-white">{stats.totalCount}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-400 text-xs font-medium">Stock Value</span>
              <p className="text-lg font-bold text-emerald-400 truncate">₦{stats.totalVal.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-blue-400 text-xs font-medium">Vivo Models</span>
              <p className="text-2xl font-black text-white">{stats.vivoCount}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-slate-300 text-xs font-medium">Apple iPhones</span>
              <p className="text-2xl font-black text-white">{stats.iphoneCount}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-sky-400 text-xs font-medium">Samsung Galaxy</span>
              <p className="text-2xl font-black text-white">{stats.samsungCount}</p>
            </div>
            <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
              <span className="text-amber-400 text-xs font-medium">Accessories</span>
              <p className="text-2xl font-black text-white">{stats.accCount}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & INVENTORY TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* ACTION / SEARCH BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, price, brand..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-vivo-blue text-slate-800"
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['all', 'vivo', 'iphone', 'samsung', 'accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS LIST */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-heading font-extrabold text-lg text-slate-900">
              Store Catalog ({filteredProducts.length} Items)
            </h2>
            <Link href="/shop" target="_blank" className="text-vivo-blue hover:underline text-xs font-bold flex items-center gap-1">
              View Public Shop Page <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <i className="fa-solid fa-box-open text-4xl text-slate-300"></i>
              <p className="text-slate-500 text-sm font-medium">No products found matching your filter.</p>
              <button onClick={handleOpenAddModal} className="px-4 py-2 bg-vivo-blue text-white rounded-lg text-xs font-bold">
                + Add Product Now
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 overflow-x-auto">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                  {/* Thumbnail & Basic Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = p.fallbackImg || PRESET_IMAGES[0].url;
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-100 text-vivo-blue">
                          {p.category}
                        </span>
                        {p.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            {p.badge}
                          </span>
                        )}
                        <span className="text-slate-400 text-xs font-mono">ID: #{p.id}</span>
                      </div>
                      <h3 className="font-heading font-extrabold text-base text-slate-900">{p.name}</h3>
                      <p className="text-slate-500 text-xs line-clamp-1">{p.desc}</p>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <span className="font-heading font-black text-lg text-slate-900">{p.price}</span>
                      <p className="text-[10px] text-emerald-600 font-semibold">Available at Banex Shop B8</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-vivo-blue text-slate-700 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold border border-rose-200 transition-all"
                        title="Delete Product"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center flex-shrink-0">
              <h3 className="font-heading font-extrabold text-lg flex items-center gap-2">
                <i className={editingItem ? 'fa-solid fa-pen-to-square text-vivo-blue' : 'fa-solid fa-plus-circle text-emerald-400'}></i>
                {editingItem ? `Edit Product: ${editingItem.name}` : 'Add New Product to Store'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-800"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmitForm} className="p-6 overflow-y-auto space-y-6">
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Basic Information</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vivo V30 Pro 5G"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Brand / Model Line</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Vivo V-Series, Apple iPhone"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900 bg-white"
                    >
                      <option value="vivo">Vivo</option>
                      <option value="iphone">Apple iPhone</option>
                      <option value="samsung">Samsung Galaxy</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Price (Naira ₦) *</label>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g. ₦450,000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      placeholder="e.g. ZEISS Portrait"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    placeholder="Brief highlight of key feature (e.g. ZEISS Optics Triple Camera, 80W FlashCharge)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900"
                  />
                </div>
              </div>

              {/* Image URL & Presets */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Product Image</h4>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-vivo-blue text-slate-900 font-mono text-xs"
                  />
                </div>

                {/* Preset image buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Or select sample image:</span>
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 border border-slate-200"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

                {/* Live Preview */}
                {formData.image && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <img src={formData.image} alt="Preview" className="w-12 h-12 object-contain bg-white rounded border p-1" />
                    <span className="text-xs text-slate-600 font-semibold">Live Image Preview</span>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Technical Specifications</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Camera Specs</label>
                    <input
                      type="text"
                      value={formData.specs.camera}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, camera: e.target.value } })}
                      placeholder="e.g. 50MP ZEISS OIS Main + 50MP Ultra-Wide"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Chipset / Processor</label>
                    <input
                      type="text"
                      value={formData.specs.chipset}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, chipset: e.target.value } })}
                      placeholder="e.g. MediaTek Dimensity 8200 (4nm)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Battery & Charging</label>
                    <input
                      type="text"
                      value={formData.specs.battery}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, battery: e.target.value } })}
                      placeholder="e.g. 5000mAh Battery + 80W FlashCharge"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">RAM & Storage</label>
                    <input
                      type="text"
                      value={formData.specs.storage}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, storage: e.target.value } })}
                      placeholder="e.g. 12GB Extended RAM • 256GB UFS 3.1"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">Display Screen</label>
                    <input
                      type="text"
                      value={formData.specs.display}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, display: e.target.value } })}
                      placeholder="e.g. 6.78-inch 120Hz 1.5K Curved AMOLED"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700">In the Box</label>
                    <input
                      type="text"
                      value={formData.specs.box}
                      onChange={(e) => setFormData({ ...formData, specs: { ...formData.specs, box: e.target.value } })}
                      placeholder="e.g. Phone, Fast Charger, Type-C Cable, Case"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-vivo-blue text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-vivo-blue hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95"
                >
                  <i className="fa-solid fa-check mr-1.5"></i>
                  {editingItem ? 'Save Changes' : 'Publish Product to Shop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
