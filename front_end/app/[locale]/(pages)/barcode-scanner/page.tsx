'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import Checkout, { CartItem } from '@/app/components/pos/checkout';
import ReceiptView from '@/app/components/pos/receipt-view';

interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  stock: number;
  category: string;
  location: string;
  icon: string;
  color: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones Pro', sku: 'WH-PRO-BLK', barcode: '6900000000001', price: 149.99, stock: 12, category: 'Electronics', location: 'Aisle 4-B', icon: '🎧', color: 'bg-blue-50 text-blue-600', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop' },
  { id: 2, name: 'Leather Notebook A5', sku: 'NB-LTH-A5', barcode: '6900000000002', price: 34.50, stock: 45, category: 'Stationery', location: 'Aisle 2-A', icon: '📓', color: 'bg-orange-50 text-orange-600', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=500&auto=format&fit=crop' },
  { id: 3, name: 'USB-C Hub 7-Port', sku: 'HUB-7C-GRY', barcode: '6900000000003', price: 79.00, stock: 8, category: 'Electronics', location: 'Aisle 4-C', icon: '🔌', color: 'bg-blue-50 text-blue-600', image: 'https://images.unsplash.com/photo-1461151351821-79734979f831?q=80&w=500&auto=format&fit=crop' },
  { id: 4, name: 'Bamboo Desk Organizer', sku: 'DO-BAM-NAT', barcode: '6900000000004', price: 45.00, stock: 15, category: 'Office', location: 'Aisle 1-D', icon: '📦', color: 'bg-stone-100 text-stone-600', image: 'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?q=80&w=500&auto=format&fit=crop' },
  { id: 5, name: 'Paracetamol 500mg', sku: 'MED-PARA-500', barcode: '6900000000005', price: 25, stock: 142, category: 'Medicine', location: 'Section B-12', icon: '💊', color: 'bg-green-50 text-green-600', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500&auto=format&fit=crop' },
  { id: 6, name: 'Amoxicillin 250mg', sku: 'MED-AMOX-250', barcode: '6900000000006', price: 180, stock: 58, category: 'Antibiotic', location: 'Section B-12', icon: '🔵', color: 'bg-blue-50 text-blue-600', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500&auto=format&fit=crop' },
  { id: 7, name: 'Vitamin C 1000mg', sku: 'SUPP-VITC-1K', barcode: '6900000000007', price: 95, stock: 213, category: 'Supplement', location: 'Section A-01', icon: '🟡', color: 'bg-yellow-50 text-yellow-600', image: 'https://images.unsplash.com/photo-1616671285442-df388e04025f?q=80&w=500&auto=format&fit=crop' },
];

const BarcodeScannerPage = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [view, setView] = useState<'Scanner' | 'Checkout' | 'Receipt'>('Scanner');
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'POS' | 'Inventory' | 'Settings'>('POS');
  const [cameras, setCameras] = useState<Record<string, string>[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [flashOn, setFlashOn] = useState(false);
  const [scanFlash, setScanFlash] = useState(false);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isMounted = useRef(false);

  const addToCart = React.useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return [{ ...existing, quantity: existing.quantity + 1 }, ...prev.filter(item => item.id !== product.id)];
      }
      return [{ ...product, quantity: 1 }, ...prev];
    });
  }, []);

  const onScanSuccess = React.useCallback((decodedText: string) => {
    if (decodedText === lastScanned) return;
    
    // Trigger visual success cue
    setScanFlash(true);
    setTimeout(() => setScanFlash(false), 200);

    setLastScanned(decodedText);
    const product = products.find(p => p.barcode === decodedText);
    
    if (product) {
      addToCart(product);
    }

    setTimeout(() => setLastScanned(null), 1000);
  }, [lastScanned, addToCart]);

  const onScanFailure = React.useCallback(() => {}, []);

  // Load cart on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pos-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setTimeout(() => setCart(parsed), 0);
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
    isMounted.current = true;
  }, []);

  // Save cart on change
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('pos-cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Auto-initialize Scanner Engine
  useEffect(() => {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        setCameras(devices.map(d => ({ id: d.id, label: d.label })));
        const backCamera = devices.find(d => d.label.toLowerCase().includes('back')) || devices[0];
        setSelectedCamera(backCamera.id);
      }
    }).catch(err => console.error("Error getting cameras", err));
  }, []);

  useEffect(() => {
    if (isScanning && view === 'Scanner' && selectedCamera) {
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;
      
      html5QrCode.start(
        selectedCamera,
        {
          fps: 20, // Increased FPS for high-throughput
          qrbox: { width: 300, height: 300 },
          aspectRatio: 1.0
        },
        onScanSuccess,
        onScanFailure
      ).catch(err => console.error("Unable to start scanning", err));
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error("Error stopping scanner", err));
      }
    };
  }, [isScanning, view, selectedCamera, onScanSuccess, onScanFailure]);

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans overflow-hidden">
      
      {/* TOP ENTERPRISE BAR */}
      <header className="h-16 bg-white border-b border-blue-100 px-6 flex items-center justify-between shrink-0 shadow-sm z-30">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.jpeg"
              alt="DUKAPOS Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded object-cover shadow-md"
            />
            <div>
              <h1 className="text-sm font-black uppercase text-blue-900">ScanCore Enterprise</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Network: Stable • Site: HQ-WAREHOUSE-01</p>
            </div>
          </div>
          
          <div className="hidden md:flex h-8 w-px bg-slate-100" />
          
          <nav className="hidden md:flex items-center space-x-1">
            {['POS', 'Inventory', 'Settings'].map(tab => (
              <button 
                key={tab}
                onClick={() => {
                  if (tab === 'Inventory') router.push('/inventory');
                  else if (tab === 'Settings') router.push('/settings');
                  else setActiveTab(tab as any);
                }}
                className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase transition-all ${
                  activeTab === tab ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right flex flex-col items-end">
             <span className="text-[10px] font-black uppercase text-slate-400">Terminal #042</span>
             <span className="text-[9px] font-bold text-blue-600 uppercase">Auth: J. DOE (ADMIN)</span>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all active:scale-95 border border-blue-200 text-slate-400"
          >
            ✕
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-100">
        {view === 'Scanner' ? (
          <>
            {/* LEFT: SCANNER ENGINE */}
            <div className="flex-1 flex flex-col p-4 md:p-6 space-y-4 overflow-hidden relative">
              <div className="absolute top-12 left-12 z-20 flex flex-col space-y-2">
                 <div className="flex items-center space-x-2 bg-blue-50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-blue-200 shadow-xl">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black uppercase text-slate-600">Live Feed 1080p</span>
                 </div>
                 {lastScanned && (
                   <div className="bg-blue-600 text-white px-4 py-2 rounded-sm text-[11px] font-black uppercase animate-in slide-in-from-left duration-300 shadow-xl border border-blue-400">
                     Detected: {lastScanned}
                   </div>
                 )}
              </div>

              <div className="flex-1 bg-slate-900 border-[1rem] rounded-2xl border-blue-950 shadow-inner overflow-hidden relative group">
                <div id="reader" className="w-full h-full object-cover"></div>
                
                {/* Visual Flash Feedback */}
                {scanFlash && (
                  <div className="absolute inset-0 bg-white/40 z-30 animate-pulse pointer-events-none" />
                )}
                
                {/* SCANNER OVERLAY OVERLAY */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                   <div className="w-72 h-72 border-2 border-blue-500/40 rounded-sm relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 shadow-sm" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 shadow-sm" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 shadow-sm" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 shadow-sm" />
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400/50 animate-scan" />
                   </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 bg-white/95 backdrop-blur-xl p-4 rounded-sm border border-slate-200 shadow-2xl z-20 w-[90%] sm:w-auto max-w-lg">
                   <div className="flex flex-col space-y-1 w-full sm:w-auto">
                     <label className="text-[9px] font-black text-slate-400 uppercase">Input Source</label>
                     <select 
                        value={selectedCamera}
                        onChange={(e) => setSelectedCamera(e.target.value)}
                        className="bg-white border border-blue-200 text-[10px] font-black uppercase px-4 py-2 rounded-sm outline-none focus:border-blue-500 transition-colors w-full"
                     >
                       {cameras.map(cam => <option key={cam.id} value={cam.id}>{cam.label}</option>)}
                     </select>
                   </div>
                   <div className="flex items-center space-x-3 w-full sm:w-auto justify-center">
                     <button 
                       onClick={() => setFlashOn(!flashOn)}
                       className={`w-10 h-10 rounded flex items-center justify-center border transition-all ${flashOn ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
                     >
                       🔦
                     </button>
                     <button 
                       onClick={() => setIsScanning(!isScanning)}
                       className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-blue-800 transition-all shadow-xl active:scale-95 whitespace-nowrap"
                     >
                       {isScanning ? 'Disable Engine' : 'Enable Engine'}
                     </button>
                   </div>
                </div>
              </div>

              {/* QUICK PERFORMANCE MONITOR */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 shrink-0">
                 <div className="bg-white p-4 border border-blue-200 rounded-sm shadow-sm">
                   <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Response Time</p>
                   <div className="flex items-center justify-between">
                     <span className="text-lg font-black text-blue-600">8ms</span>
                     <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 rounded-sm uppercase tracking-tighter">Instant</span>
                   </div>
                 </div>
                 <div className="bg-white p-4 border border-blue-200 rounded-sm shadow-sm">
                   <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Decode Rate</p>
                   <div className="flex items-center justify-between">
                     <span className="text-lg font-black text-blue-600">99.9%</span>
                     <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-1.5 rounded-sm uppercase tracking-tighter">Optimal</span>
                   </div>
                 </div>
                 <div className="bg-white p-4 border border-blue-200 rounded-sm shadow-sm">
                   <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Live Sync</p>
                   <div className="flex items-center justify-between">
                     <span className="text-lg font-black text-blue-600">Active</span>
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                   </div>
                 </div>
                 <div className="bg-white p-4 border border-blue-200 rounded-sm shadow-sm">
                   <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Throughput</p>
                   <div className="flex items-center justify-between">
                     <span className="text-lg font-black text-blue-600">High</span>
                     <span className="text-[10px] font-bold text-slate-600 italic">SECURE</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* RIGHT: REAL-TIME TRANSACTION LEDGER */}
            <aside className="w-full lg:w-[480px] bg-white border-l border-blue-100 flex flex-col shrink-0 z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.03)]">
               <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
                  <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 bg-blue-900 rounded-sm flex items-center justify-center text-white text-xs">🗃️</div>
                     <div>
                        <h2 className="text-xs font-black uppercase text-blue-950">Live Ledger</h2>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Real-time sync enabled</p>
                     </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-sm text-[11px] font-black border border-blue-400 shadow-sm uppercase">
                      {cart.reduce((a, b) => a + b.quantity, 0)} Units
                    </span>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar bg-slate-50/50">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-6 opacity-40">
                      <div className="w-32 h-32 rounded-full border-4 border-dashed border-blue-200 flex items-center justify-center text-6xl">
                        [||]
                      </div>
                      <div className="text-center">
                        <p className="font-black uppercase text-sm text-slate-400 tracking-widest">Scanner Ready</p>
                        <p className="text-[9px] font-bold uppercase mt-1 italic text-slate-300">Awaiting product identification...</p>
                      </div>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="bg-white border border-blue-100 p-3 rounded-sm flex items-center space-x-4 animate-in slide-in-from-right-4 duration-300 hover:shadow-md hover:border-blue-300 transition-all group relative">
                         <div className={`w-14 h-14 rounded-sm flex items-center justify-center text-2xl shadow-inner ${item.color.split(' ')[0]} shrink-0 border border-blue-50`}>
                            {item.icon}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                               <h4 className="text-[12px] font-black uppercase text-blue-950 truncate leading-none mb-1">{item.name}</h4>
                               <span className="text-[13px] font-black text-blue-900">KSh {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-2">
                               <span>{item.sku}</span>
                               <span>•</span>
                               <span>{item.category}</span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-1">
                               <div className="flex items-center space-x-1 bg-blue-50/50 border border-blue-100 p-0.5 rounded-sm">
                                 <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center hover:bg-white hover:text-red-500 rounded transition-all text-sm font-black text-blue-900">−</button>
                                 <span className="w-8 text-center text-[12px] font-black text-blue-950">{item.quantity}</span>
                                 <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center hover:bg-white hover:text-green-600 rounded transition-all text-sm font-black text-blue-900">+</button>
                               </div>
                               <button 
                                 onClick={() => removeFromCart(item.id)}
                                 className="opacity-0 group-hover:opacity-100 px-3 py-1.5 text-[9px] font-black uppercase text-red-500 hover:bg-red-50 rounded-sm transition-all"
                               >
                                 Delete Item
                               </button>
                            </div>
                         </div>
                      </div>
                    ))
                  )}
               </div>

               <div className="p-6 bg-white border-t-2 border-blue-900 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end px-1 gap-4">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.2em] mb-1">Net Payable Amount</span>
                        <span className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tighter uppercase leading-none truncate">
                          KSh {subtotal.toLocaleString()}
                          <span className="text-lg text-blue-400/50 ml-1">.00</span>
                        </span>
                     </div>
                     <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end space-y-0 sm:space-y-1 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm uppercase tracking-tighter">Tax Incl. (16%)</span>
                        <span className="text-[11px] font-black text-slate-900 uppercase">Items: {cart.length}</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <button 
                       onClick={() => setCart([])}
                       className="py-4 rounded-sm bg-slate-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-slate-200 text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 shadow-sm"
                     >
                       Void Order
                     </button>
                     <button 
                       disabled={cart.length === 0}
                       onClick={() => setView('Checkout')}
                       className={`py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl transition-all relative overflow-hidden group ${
                         cart.length === 0 
                          ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200' 
                          : 'bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 active:scale-95 shadow-blue-500/40'
                       }`}
                     >
                       <span className="relative z-10 flex items-center justify-center">
                         Checkout Case
                         <svg className="w-4 h-4 ml-2 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                       </span>
                     </button>
                  </div>
               </div>
            </aside>
          </>
        ) : view === 'Checkout' ? (
          <div className="flex-1 flex gap-4 h-full bg-white p-6 rounded-2xl border border-blue-100 shadow-xl overflow-hidden">
            <Checkout 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onCompleteSale={(transaction) => {
                setLastTransaction(transaction);
                setCart([]);
                setView('Receipt');
              }}
              onCancel={() => setView('Scanner')}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white p-6 rounded-2xl border border-blue-100 shadow-xl overflow-hidden">
            <ReceiptView 
              transaction={lastTransaction}
              onNewSale={() => setView('Scanner')}
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScannerPage;
