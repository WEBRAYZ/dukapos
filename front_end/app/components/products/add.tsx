"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { api } from "@/lib/api";
import BarcodeScanner from "@/app/components/pos/barcode-scanner";

interface AddProductProps {
  onBack: () => void;
  onAdd?: (product: Record<string, any>) => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onBack, onAdd }) => {
  const [categories, setCategories] = useState<Record<string, string | number>[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
    imagePreview: "",
    sku: "",
    barcode: "",
    stockBarcodes: [] as string[],
    category: "",
    description: "",
    sellingPrice: 0,
    costPrice: 0,
    wholesalePrice: 0,
    vatRate: 16,
    supplier: "",
    openingStock: 0,
    reorderLevel: 20,
    expiryDate: "",
    isActive: true,
    trackStock: true,
    expiryAlerts: true,
    allowBelowReorder: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get<Record<string, string | number>[]>("/products/categories/");
        setCategories(data);
        if (data.length > 0 && data[0].id) {
          setFormData(prev => ({ ...prev, category: data[0].id.toString() }));
        }
      } catch (error: unknown) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const [usbStatus, setUsbStatus] = useState<'connected' | 'disconnected' | 'unsupported'>('disconnected');
  const [scanHistory, setScanHistory] = useState<{barcode: string, time: string}[]>([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const mockProductDatabase: Record<string, any> = useMemo(() => ({
    "7894900011517": { name: "Panadol Advance 500mg", sku: "MED-PAN-001", category: "Medicine", sellingPrice: 150, costPrice: 95, image: "/paracetamol-warning.jpeg" },
    "6001068020516": { name: "Dettol Hand Sanitizer 50ml", sku: "HYG-DET-002", category: "Hygiene", sellingPrice: 250, costPrice: 180, image: "/hand-sanitizer.jpg" },
    "5449000000996": { name: "Surgical Spirit 200ml", sku: "SUP-SPR-005", category: "Supply", sellingPrice: 450, costPrice: 310, image: "/vitamin-c.jpeg" },
    "4002015025040": { name: "Digital BP Monitor Pro", sku: "DEV-BPM-010", category: "Device", sellingPrice: 5500, costPrice: 3800, image: "/bp-monitor.jpg" },
  }), []);

  const handleBarcodeDetected = React.useCallback((code: string) => {
    const product = mockProductDatabase[code];
    if (product) {
      setFormData(prev => ({
        ...prev,
        barcode: code,
        name: product.name,
        sku: product.sku,
        category: product.category,
        sellingPrice: product.sellingPrice,
        costPrice: product.costPrice,
        imagePreview: product.image || prev.imagePreview,
        stockBarcodes: prev.stockBarcodes.includes(code) ? prev.stockBarcodes : [...prev.stockBarcodes, code]
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        barcode: code,
        stockBarcodes: prev.stockBarcodes.includes(code) ? prev.stockBarcodes : [...prev.stockBarcodes, code]
      }));
    }
    setScanHistory(prev => [{ barcode: code, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
  }, [mockProductDatabase]);

  const handleUploadTrigger = () => {
    // Mobile detection for upload options
    if (isMobileDevice) {
      setIsImageModalOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      alert("Please enter a product name.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("sku", formData.sku);
    data.append("barcode", formData.barcode);
    if (formData.category) {
      data.append("category", formData.category);
    }
    data.append("description", formData.description);
    data.append("selling_price", formData.sellingPrice.toString());
    data.append("cost_price", formData.costPrice.toString());
    data.append("tax_rate", formData.vatRate.toString());
    data.append("stock_quantity", formData.openingStock.toString());
    data.append("low_stock_threshold", formData.reorderLevel.toString());
    data.append("status", formData.isActive ? "ACTIVE" : "INACTIVE");
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await api.post<Record<string, string | number | boolean>>("/products/", data);
      if (onAdd) {
        onAdd(response);
      }
      onBack();
    } catch (error: unknown) {
      console.error("Failed to add product:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Error adding product: " + errorMessage);
    }
  };

  // External Device Detection and Keyboard Scanner Listener
  useEffect(() => {
    let buffer = "";
    let lastTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in a text area or specific inputs that are not the barcode input
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || (target.tagName === "INPUT" && (target as HTMLInputElement).type !== "text")) {
        return;
      }

      const currentTime = Date.now();
      
      // Scanners typically send characters very fast (usually < 50ms between keys)
      if (currentTime - lastTime > 50) {
        buffer = ""; 
      }
      
      if (e.key === "Enter") {
        if (buffer.length > 2) {
          handleBarcodeDetected(buffer);
          buffer = "";
          e.preventDefault();
        }
      } else if (e.key.length === 1) {
        buffer += e.key;
      }
      
      lastTime = currentTime;
    };

    window.addEventListener("keydown", handleKeyDown);

    // USB/HID Status Logic
    const checkDevices = async () => {
      let connected = false;
      if ('usb' in navigator) {
        const usbDevices = await navigator.usb.getDevices();
        if (usbDevices.length > 0) connected = true;
      }
      if (!connected && 'hid' in navigator) {
        // @ts-expect-error - HID API might not be in all TS types
        const hidDevices = await (navigator as any).hid.getDevices();
        if (hidDevices.length > 0) connected = true;
      }
      setUsbStatus(connected ? 'connected' : 'disconnected');
    };

    if (!('usb' in navigator) && !('hid' in navigator)) {
      setTimeout(() => setUsbStatus('unsupported'), 0);
    } else {
      checkDevices();
    }

    const handleChange = () => checkDevices();
    
    if ('usb' in navigator) {
      navigator.usb.addEventListener('connect', handleChange);
      navigator.usb.addEventListener('disconnect', handleChange);
    }
    
    if ('hid' in navigator) {
      // @ts-expect-error - HID API might not be in all TS types
      (navigator as any).hid.addEventListener('connect', handleChange);
      // @ts-expect-error - HID API might not be in all TS types
      (navigator as any).hid.addEventListener('disconnect', handleChange);
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if ('usb' in navigator) {
        navigator.usb.removeEventListener('connect', handleChange);
        navigator.usb.removeEventListener('disconnect', handleChange);
      }
      if ('hid' in navigator) {
        // @ts-expect-error - HID API might not be in all TS types
        (navigator as any).hid.removeEventListener('connect', handleChange);
        // @ts-expect-error - HID API might not be in all TS types
        (navigator as any).hid.removeEventListener('disconnect', handleChange);
      }
    };
  }, [handleBarcodeDetected]);

  const handleRequestDevices = async () => {
    try {
      if ('usb' in navigator) {
        await navigator.usb.requestDevice({ filters: [] });
      } else if ('hid' in navigator) {
        // @ts-expect-error - HID API might not be in all TS types
        await (navigator as any).hid.requestDevice({ filters: [] });
      }
    } catch (err) {
      console.error('Device access denied or cancelled', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          image: file,
          imagePreview: reader.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanAction = () => {
    if (isMobileDevice) {
      setIsScannerOpen(true);
    } else {
      handleRequestDevices();
    }
  };

  const calculateMargin = () => {
    if (formData.sellingPrice === 0) return 0;
    const profit = formData.sellingPrice - formData.costPrice;
    return Math.round((profit / formData.sellingPrice) * 100);
  };

  const margin = calculateMargin();
  const profitPerUnit = formData.sellingPrice - formData.costPrice;
  const vatAmount = formData.sellingPrice * (formData.vatRate / 100);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="flex flex-col lg:flex-row gap-6 overflow-y-auto p-4 md:p-6 no-scrollbar">
        <div className="flex-1 space-y-4">
          {/* Basic Information */}
          <section className="bg-white p-3 md:p-3 rounded-sm border border-blue-100 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-blue-900 uppercase border-b border-blue-100 pb-2">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Paracetamol 500mg"
                  className="w-full px-4 py-3.5 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900/10 transition-all font-bold text-sm outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  SKU / Product Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. PHM-001"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-bold text-sm outline-none"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Barcode / EAN
                </label>
                <input
                  type="text"
                  placeholder="Scan or enter barcode"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-bold text-sm outline-none"
                  value={formData.barcode}
                  onChange={(e) =>
                    setFormData({ ...formData, barcode: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Category *
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900/10 transition-all font-bold text-sm appearance-none outline-none"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-700">
                    ▼
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-800 uppercase">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed product specifications..."
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900/10 transition-all font-bold text-sm outline-none resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="bg-white p-3 md:p-3 rounded-sm border border-blue-100 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-blue-900 uppercase border-b border-blue-50">
              Financials & Pricing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Selling Price (KSh) *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-black text-sm outline-none"
                  value={formData.sellingPrice || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sellingPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Cost Price (KSh) *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-black text-sm outline-none"
                  value={formData.costPrice || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      costPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Wholesale Price
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-black text-sm outline-none"
                  value={formData.wholesalePrice || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      wholesalePrice: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  VAT Rate (%)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-black text-sm outline-none"
                  value={formData.vatRate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vatRate: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Stock Section */}
          <section className="bg-white p-3 md:p-3 rounded-sm border border-blue-100 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-blue-900 uppercase border-b border-blue-100">
              Inventory Controls
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Opening Stock *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900/10 transition-all font-black text-sm outline-none"
                  value={formData.openingStock || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openingStock: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Reorder Level
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900/10 transition-all font-black text-sm outline-none"
                  value={formData.reorderLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reorderLevel: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black text-slate-800 uppercase">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm focus:bg-white focus:ring-1 focus:ring-blue-900/10 transition-all font-bold text-sm outline-none"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />
              </div>

              {/* Switches Grid */}
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: "Active", sub: "Available on POS", key: "isActive" },
                  { label: "Track Stock", sub: "Enable alerts", key: "trackStock" },
                  { label: "Expiry Alerts", sub: "Pre-expiry notices", key: "expiryAlerts" },
                  { label: "Oversell", sub: "Allow negative stock", key: "allowBelowReorder" }
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between p-3.5 bg-slate-100 rounded-sm border border-blue-100 cursor-pointer hover:bg-slate-200 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-800 uppercase">{item.label}</span>
                      <span className="text-[8px] font-bold text-slate-700 uppercase">{item.sub}</span>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(formData as any)[item.key]}
                        onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-900"></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Image Upload */}
          <section className="bg-white p-5 rounded-sm border border-blue-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-blue-900 uppercase border-b border-blue-50 pb-2">
              Visual Asset
            </h3>
            
            {/* Hidden Inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleImageChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            <div 
              onClick={handleUploadTrigger}
              className="border-2 border-dashed border-blue-200 rounded-sm p-4 flex flex-col items-center justify-center space-y-4 hover:border-blue-900/30 hover:bg-slate-50/50 transition-all cursor-pointer group shadow-inner min-h-[160px]"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-inner overflow-hidden relative">
                {formData.imagePreview ? (
                  <Image src={formData.imagePreview} alt="Upload Preview" fill className="object-cover" />
                ) : (
                  "📸"
                )}
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-slate-700 uppercase">
                  {formData.imagePreview ? "Change product image" : "Upload product image"}
                </p>
                <p className="text-[9px] font-bold text-slate-600 uppercase mt-1">
                  Click to select from Files or Camera
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Mobile-friendly stack */}
        <div className="w-full lg:w-[360px] space-y-4 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Live Preview */}
            <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Preview</p>
              <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-sm border border-slate-100 border-dashed">
                <div className="relative w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center text-3xl mb-4 border border-slate-100">
                  {formData.imagePreview ? (
                    <Image src={formData.imagePreview} alt="Preview" fill className="object-cover" />
                  ) : (
                    <span className="text-slate-300 text-xl font-black">?</span>
                  )}
                </div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">{formData.name || "UNNAMED PRODUCT"}</h4>
                <p className="text-xl font-black text-blue-900 mt-2 tracking-tight">KSh {formData.sellingPrice.toLocaleString()}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="px-2.5 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-bold uppercase text-slate-500">{formData.category}</span>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${formData.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {formData.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Analysis */}
            <div className="bg-blue-900 p-5 rounded-sm shadow-lg text-white">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-200">Financial Analysis</h4>
                <span className="text-xl">💰</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-bold text-blue-200/60 uppercase">
                  <span>Gross Profit</span>
                  <span className="text-white">KSh {profitPerUnit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-blue-200/60 uppercase border-b border-white/10 pb-4">
                  <span>VAT ({formData.vatRate}%)</span>
                  <span className="text-white text-right">KSh {vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">Stock Value</p>
                    <p className="text-lg font-black tracking-tight">KSh {(formData.openingStock * formData.costPrice).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">Profit Margin</p>
                    <p className="text-3xl font-black text-blue-100 leading-none">{margin}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Sticky on mobile? */}
          <div className="flex flex-col gap-3 pt-2">
            <button 
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-900 text-white rounded-sm font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>🚀</span> Create Product
            </button>
            <button onClick={onBack} className="w-full py-4 bg-slate-200 text-slate-600 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-300 transition-all">
              Discard Changes
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scan Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {scanHistory.length > 0 && (
          <div className="bg-blue-950/90 backdrop-blur-md border border-blue-400/30 p-3 rounded-sm shadow-2xl animate-in slide-in-from-right-4 duration-300">
            <p className="text-[8px] font-black text-blue-300 uppercase tracking-widest mb-2 border-b border-blue-800 pb-1">Recent Scans</p>
            <div className="space-y-1.5">
              {scanHistory.map((scan, i) => (
                <div key={i} className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-black text-white tabular-nums">{scan.barcode}</span>
                  <span className="text-[8px] font-bold text-blue-400 uppercase">{scan.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button 
          onClick={handleScanAction}
          className={`group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] active:scale-90 ${
            usbStatus === 'connected' 
              ? 'bg-linear-to-tr from-emerald-500 to-emerald-700' 
              : 'bg-linear-to-tr from-blue-600 to-blue-800'
          }`}
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping duration-1000 scale-125 opacity-0 group-hover:opacity-100"></span>
          
          <div className="flex flex-col items-center justify-center text-white">
            <span className="text-2xl mb-0.5">{isMobileDevice ? '📷' : '📷'}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter">{isMobileDevice ? 'Scan' : 'Connect'}</span>
          </div>

          {/* Status Dot */}
          <div className={`absolute top-0 right-0 w-4 h-4 border-2 border-blue-950 rounded-full ${
            usbStatus === 'connected' ? 'bg-emerald-400' : 'bg-blue-400'
          }`}></div>
        </button>
      </div>

      {/* Barcode Scanner Modal (Mobile Only) */}
      {isScannerOpen && (
        <div className="fixed inset-0 z-[130] bg-slate-900 flex flex-col">
          <div className="flex-none bg-blue-950 p-4 border-b border-blue-900 flex items-center justify-between">
            <h2 className="text-white font-black uppercase tracking-widest text-sm">Product Barcode Scanner</h2>
            <button 
              onClick={() => setIsScannerOpen(false)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-sm text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Close
            </button>
          </div>
          <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
            <div className="w-full max-w-2xl aspect-square md:aspect-video">
              <BarcodeScanner 
                onScan={(code) => {
                  handleBarcodeDetected(code);
                  setIsScannerOpen(false);
                }}
                onClose={() => setIsScannerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Selection Modal (Mobile Only) */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsImageModalOpen(false)}
          />
          <div className="relative w-full sm:max-w-xs bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 border border-blue-100">
            <div className="p-6 space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Select Image Source</p>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => {
                    fileInputRef.current?.click();
                    setIsImageModalOpen(false);
                  }}
                  className="w-full flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">📁</div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-800 uppercase">Photo Library</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Select existing file</p>
                  </div>
                </button>
                <button 
                  onClick={() => {
                    cameraInputRef.current?.click();
                    setIsImageModalOpen(false);
                  }}
                  className="w-full flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">📷</div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-800 uppercase">Take Photo</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Use device camera</p>
                  </div>
                </button>
              </div>
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="w-full py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors pt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
