"use client";

import React, { useState } from "react";
import { useOnboarding } from "../../OnboardingContext";
import SmartImageUpload from "@/app/components/shared/SmartImageUpload";

const ProductCatalogue = () => {
  const { data, updateData } = useOnboarding();
  const [subMethod, setSubMethod] = useState<null | "form">(null);
  const [usbStatus, setUsbStatus] = useState<'connected' | 'disconnected' | 'unsupported'>('disconnected');
  
  // Image Upload State
  const [productImage, setProductImage] = useState<string | null>(null);

  // USB Device Detection Logic
  React.useEffect(() => {
    if (!('usb' in navigator)) {
      setTimeout(() => setUsbStatus('unsupported'), 0);
      return;
    }

    const checkDevices = async () => {
      const devices = await navigator.usb.getDevices();
      setUsbStatus(devices.length > 0 ? 'connected' : 'disconnected');
    };

    checkDevices();

    const handleConnect = () => setUsbStatus('connected');
    const handleDisconnect = async () => {
      const devices = await navigator.usb.getDevices();
      setUsbStatus(devices.length > 0 ? 'connected' : 'disconnected');
    };

    navigator.usb.addEventListener('connect', handleConnect);
    navigator.usb.addEventListener('disconnect', handleDisconnect);
    
    return () => {
      navigator.usb.removeEventListener('connect', handleConnect);
      navigator.usb.removeEventListener('disconnect', handleDisconnect);
    };
  }, []);

  const handleRequestUsb = async () => {
    try {
      await navigator.usb.requestDevice({ filters: [] });
    } catch (err) {
      console.error('USB access denied or cancelled', err);
    }
  };

  const handleImageChange = (imageData: string | null) => {
    setProductImage(imageData);
  };

  // Categories State
  const [allCategories, setAllCategories] = useState([
    { id: "pharmacy", label: "Pharmacy", icon: "💊" },
    { id: "personal_care", label: "Personal Care", icon: "🧴" },
    { id: "beverages", label: "Beverages", icon: "🥤" },
    { id: "supplement", label: "Supplements", icon: "🟡" },
    { id: "device", label: "Medical Devices", icon: "🩺" },
    { id: "hygiene", label: "Hygiene", icon: "🧼" },
    { id: "first_aid", label: "First Aid", icon: "🩹" },
    { id: "confectionery", label: "Confectionery", icon: "🍬" },
    { id: "merchandise", label: "General Merchandise", icon: "📦" },
    { id: "vouchers", label: "Vouchers", icon: "🎫" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestedCategories = [
    { id: "beauty", label: "Beauty & Cosmetics", icon: "💄" },
    { id: "electronics", label: "Electronics", icon: "🔌" },
    { id: "groceries", label: "Groceries", icon: "🛒" },
    { id: "stationery", label: "Stationery", icon: "📝" },
    { id: "toys", label: "Toys & Games", icon: "🧸" },
    { id: "pet_care", label: "Pet Care", icon: "🐾" },
    { id: "hardware", label: "Hardware", icon: "🔨" },
    { id: "clothing", label: "Clothing & Apparel", icon: "👕" },
    { id: "baby_care", label: "Baby Care", icon: "👶" },
    { id: "fitness", label: "Fitness & Sports", icon: "🏋️" },
  ].filter(cat => !allCategories.find(existing => existing.id === cat.id));

  const filteredSuggestions = suggestedCategories.filter(cat => 
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewCategory = (cat: { id: string, label: string, icon: string }) => {
    if (!allCategories.find(existing => existing.id === cat.id)) {
      setAllCategories(prev => [...prev, cat]);
      updateData({ selectedCategories: [...data.selectedCategories, cat.id] });
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleCustomAdd = () => {
    if (!searchTerm.trim()) return;
    const id = searchTerm.toLowerCase().replace(/\s+/g, '_');
    const newCat = { id, label: searchTerm, icon: "🏷️" };
    addNewCategory(newCat);
  };

  const toggleCategory = (id: string) => {
    if (data.selectedCategories.includes(id)) {
      updateData({ selectedCategories: data.selectedCategories.filter(c => c !== id) });
    } else {
      updateData({ selectedCategories: [...data.selectedCategories, id] });
    }
  };

  return (
    <div className="animate-in fade-in bg-white p-2 slide-in-from-bottom-4 duration-700">
      <div className="mb-3 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-blue-950 mb-1">Add your first products</h1>
          <p className="text-gray-700 font-bold text-xs">
            Import from CSV/Excel, scan barcodes, or add products manually.
          </p>
        </div>

        {/* Store Categories Dropdown - NOW AT TOP */}
        <div className="w-full lg:w-80 relative z-40">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block ml-1">Business Categories</label>
          <div 
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="w-full px-4 py-3 bg-blue-50/50 border-2 border-blue-100 rounded-sm flex items-center justify-between cursor-pointer hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="text-sm">🏢</span>
              <span className="text-[10px] font-black text-blue-950 uppercase truncate">
                {data.selectedCategories.length === 0 
                  ? "Select Store Categories" 
                  : `${data.selectedCategories.length} Categories Selected`}
              </span>
            </div>
            <span className={`text-[10px] transition-transform duration-300 ${showSuggestions ? 'rotate-180' : ''}`}>▼</span>
          </div>

          {/* Selected Categories Chips (Compact) */}
          {data.selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {data.selectedCategories.map(catId => {
                const cat = allCategories.find(c => c.id === catId);
                return (
                  <div key={catId} className="flex items-center space-x-1 px-2 py-1 bg-white border border-blue-100 rounded-full shadow-sm animate-in zoom-in-95">
                    <span className="text-xs">{cat?.icon || "🏷️"}</span>
                    <span className="text-[8px] font-black text-blue-950 uppercase">{cat?.label || catId}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(catId);
                      }}
                      className="w-3 h-3 flex items-center justify-center rounded-full bg-slate-100 text-[8px] hover:bg-red-100 hover:text-red-500 transition-colors"
                    >✕</button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dropdown Menu */}
          {showSuggestions && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-blue-100 rounded-sm shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 border-b border-blue-50">
                  <input 
                    type="text" 
                    placeholder="Search or type custom..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-3 py-2 bg-slate-50 border border-blue-100 rounded-sm text-[10px] font-black uppercase focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto p-1">
                  {/* Current Available List */}
                  {allCategories.filter(cat => cat.label.toLowerCase().includes(searchTerm.toLowerCase())).map(cat => (
                    <button
                      key={cat.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(cat.id);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-sm transition-colors text-left group ${
                        data.selectedCategories.includes(cat.id) ? 'bg-blue-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-[10px] font-black text-blue-950 uppercase">{cat.label}</span>
                      {data.selectedCategories.includes(cat.id) && (
                        <span className="ml-auto text-blue-500 text-[10px]">✓</span>
                      )}
                    </button>
                  ))}
                  
                  {/* Suggestions from External List */}
                  {filteredSuggestions.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-blue-50">
                      <p className="px-3 py-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">Suggestions</p>
                      {filteredSuggestions.map(cat => (
                        <button
                          key={cat.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            addNewCategory(cat);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 hover:bg-blue-50 transition-colors text-left group"
                        >
                          <span className="text-lg grayscale group-hover:grayscale-0">{cat.icon}</span>
                          <span className="text-[10px] font-black text-blue-950 uppercase">{cat.label}</span>
                          <span className="ml-auto opacity-0 group-hover:opacity-100 text-blue-500 text-[10px]">+ Add</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchTerm && !allCategories.find(c => c.label.toLowerCase() === searchTerm.toLowerCase()) && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomAdd();
                      }}
                      className="w-full mt-2 p-3 bg-blue-50 text-blue-600 text-[10px] font-black uppercase text-center hover:bg-blue-100 transition-all border border-dashed border-blue-200"
                    >
                      + Create Custom &quot;{searchTerm}&quot;
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Import Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { id: "bulk", title: "Import CSV / Excel", desc: "Upload your existing product list in bulk", icon: "📄" },
          { id: "manual", title: "Add Manually", desc: "Type in products one by one", icon: "✏️" },
          { id: "skip", title: "Skip for Now", desc: "Add products after setup is complete", icon: "⏭️" },
        ].map((method) => (
          <button
            key={method.id}
            onClick={() => {
              updateData({ importMethod: method.id as "bulk" | "manual" | "skip" });
              setSubMethod(null);
            }}
            className={`p-2 rounded-sm border transition-all flex flex-col items-center text-center space-y-3 group ${
              data.importMethod === method.id 
                ? "border-blue-500 bg-white shadow-xl shadow-blue-500/10 scale-[1.02]" 
                : "border-blue-100 bg-white hover:border-blue-200"
            }`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{method.icon}</span>
            <div>
              <p className={`text-xs font-black uppercase mb-1 ${data.importMethod === method.id ? "text-blue-500" : "text-blue-950"}`}>
                {method.title}
              </p>
              <p className="text-[10px] font-bold text-slate-700">{method.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Bulk Import Section */}
      {data.importMethod === "bulk" && (
        <div className="animate-in zoom-in-95 duration-500">
          <div className="border-2 border-dashed border-blue-100 rounded-sm p-4 flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors cursor-pointer bg-white shadow-sm mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
              📁
            </div>
            <p className="text-sm font-black text-green-950 mb-1">Click to upload or drag & drop your file</p>
            <p className="text-[10px] font-bold text-slate-600 uppercase mb-4">
              Supports .CSV, .XLS, .XLSX files <br />
              Max 10,000 rows · Columns: Name, SKU, Barcode, Price, Category
            </p>
            <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-sm text-[10px] font-black uppercase text-blue-950 transition-colors border border-slate-100">
              ⬇ Download CSV Template
            </button>
          </div>
        </div>
      )}

      {/* Manual Entry Section */}
      {data.importMethod === "manual" && (
        <div className="animate-in zoom-in-95 duration-500 space-y-4 mb-4">
          {!subMethod ? (
            <button 
              onClick={() => setSubMethod("form")}
              className="w-full p-10 bg-white border-2 border-blue-100 rounded-sm hover:border-blue-500 hover:shadow-xl transition-all flex flex-col items-center space-y-4 group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-sm flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-inner">
                ⌨️
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-blue-950 uppercase tracking-wider">Add Product Manually</p>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Enter product details by hand</p>
              </div>
            </button>
          ) : (
            <div className="bg-white p-4 rounded-sm border-2 border-blue-100 shadow-sm animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-blue-950">Add Product Manually</h3>
                <button onClick={() => setSubMethod(null)} className="text-[10px] font-black text-blue-500 uppercase">Go Back</button>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Image Upload Area */}
                <div className="w-full md:w-1/3">
                  <SmartImageUpload 
                    onImageChange={handleImageChange}
                    currentImage={productImage}
                  />
                </div>

                {/* Right: Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Product Name</label>
                    <input type="text" placeholder="e.g. Panadol Extra" className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Barcode / SKU</label>
                    <input type="text" placeholder="e.g. 600123456789" className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Selling Price (KES)</label>
                    <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Stock Level</label>
                    <input type="number" placeholder="0" className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-4 bg-blue-950 text-white rounded-sm text-xs font-black uppercase hover:bg-blue-900 transition-all">
                Add to List
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Scanner Button */}
      <div className="fixed bottom-24 right-8 z-30">
        <div className="relative group">
          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-950 text-white text-[10px] font-black uppercase rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-blue-800">
            {usbStatus === 'connected' ? 'Scanner Active' : 'Connect USB Scanner'}
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-blue-950 rotate-45 border-r border-t border-blue-800" />
          </div>

          <button 
            onClick={handleRequestUsb}
            disabled={usbStatus === 'unsupported'}
            className={`w-16 h-16 rounded-sm transition-all flex flex-col items-center justify-center shadow-2xl border-b-4 active:translate-y-1 active:border-b-0 ${
              usbStatus === 'connected' 
                ? 'bg-emerald-600 border-emerald-800 text-white' 
                : usbStatus === 'unsupported'
                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-900 border-blue-950 text-white hover:bg-blue-800'
            }`}
          >
            <div className="relative">
              <span className="text-2xl">📷</span>
              {usbStatus === 'connected' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-600 animate-pulse" />
              )}
            </div>
            <p className="text-[9px] font-black uppercase mt-1 tracking-tighter">
              {usbStatus === 'connected' ? 'Active' : 'Scanner'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogue;
