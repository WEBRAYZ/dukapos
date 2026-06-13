'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import POSNavbar from '@/app/components/pos/navbar';
import SalesHistory from '@/app/components/pos/sales-history';
import ReturnSales from '@/app/components/pos/return-sales';
import Receipts from '@/app/components/pos/receipts';
import Checkout, { CartItem } from '@/app/components/pos/checkout';
import ReceiptView from '@/app/components/pos/receipt-view';
import ProductDetailsModal from '@/app/components/pos/product-details-modal';
import BarcodeScanner from '@/app/components/pos/barcode-scanner';
import { useSidebar } from '@/app/components/shared/SidebarContext';

const POSPage = () => {
  const router = useRouter();
  const { isCollapsed } = useSidebar();
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [view, setView] = useState('POS Screen');

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(window.innerWidth < 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [discount, setDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutOverlay, setShowCheckoutOverlay] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any | null>(null);
  const [usbStatus, setUsbStatus] = useState<'connected' | 'disconnected' | 'unsupported'>('disconnected');
  const [lastTransaction, setLastTransaction] = useState<{
    invoiceNo: string;
    date: string;
    customer: { name: string; tier: string; color: string };
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
  } | null>(null);

  const isMounted = useRef(false);

  // USB Device Detection Logic
  useEffect(() => {
    if (!('usb' in navigator)) {
      setUsbStatus('unsupported');
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
      // Standard filters for HID/Barcode scanners could be added here, 
      // but empty filters allow user to pick any device.
      await navigator.usb.requestDevice({ filters: [] });
    } catch (err) {
      console.error('USB access denied or cancelled', err);
    }
  };

  const [categories, setCategories] = useState<string[]>(['All']);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.get<any[]>('/products/'),
          api.get<any[]>('/products/categories/'),
        ]);
        setProducts(productsData);
        setCategories(['All', ...categoriesData.map((c: any) => c.name)]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product: any) => {
    const stock = product.stock_quantity || 0;
    if (stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { 
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: product.selling_price,
        stock: stock,
        category: product.category_name,
        image: product.image,
        quantity: 1
      }];
    });
  };

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

  const handleBarcodeScan = React.useCallback((barcode: string) => {
    const product = products.find(p => p.barcode === barcode);
    if (product) {
      setScannedProduct(product);
      setSearchQuery(''); // Clear search on successful scan
      setView('POS Screen'); // Ensure we go back to POS screen to show product modal
    }
  }, [products]);

  // Global listener for external barcode scanners (keyboard wedge)
  useEffect(() => {
    let barcodeBuffer = '';
    let lastKeyTime = Date.now();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key.length > 1 && e.key !== 'Enter') return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastKeyTime;

      if (timeDiff > 50) {
        barcodeBuffer = '';
      }

      lastKeyTime = currentTime;

      if (e.key === 'Enter') {
        if (barcodeBuffer.length >= 3) {
          handleBarcodeScan(barcodeBuffer);
          if (document.activeElement?.tagName === 'INPUT') {
            (document.activeElement as HTMLInputElement).value = '';
          }
          e.preventDefault();
        }
        barcodeBuffer = '';
      } else {
        barcodeBuffer += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBarcodeScan]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pos-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
    isMounted.current = true;
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('pos-cart', JSON.stringify(cart));
    }
  }, [cart]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discount / 100);
  const vat = (subtotal - discountAmount) * 0.16;
  const total = subtotal - discountAmount + vat;

  const handleCompleteSale = async (transaction: any) => {
    try {
      // Get branch from user profile
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      const user = userStr ? JSON.parse(userStr) : null;
      const branchId = user?.branch_id || 1;

      // Prepare data for backend
      const saleData = {
        branch: branchId,
        shift: 1,  // Default or fetched from active shift
        customer: null, // Optional
        subtotal: subtotal,
        tax_amount: vat,
        total_amount: total,
        payment_mode: transaction.paymentMethod === 'Cash' ? '01' : 
                      transaction.paymentMethod === 'M-Pesa' ? '03' : '02',
        status: 'COMPLETED',
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          tax_amount: item.price * 0.16, // Example tax
          subtotal: item.price * item.quantity
        }))
      };

      const response = await api.post<any>('/pos/sales/', saleData);
      console.log("Sale response:", response);
      
      setLastTransaction({
        ...transaction,
        invoiceNo: response.sale_number || transaction.invoiceNo
      });
      setCart([]);
      setShowCheckoutOverlay(false);
      setView('Receipt');
      
      // Clear localStorage cart
      localStorage.removeItem('pos-cart');
    } catch (err: any) {
      console.error("Sale failed:", err);
      alert("Failed to complete sale: " + err.message);
    }
  };

  const renderContent = () => {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col space-y-3 min-h-0 overflow-hidden">
            {/* Search and Filter */}
            <div className="space-y-3 shrink-0 bg-white p-4 border-b border-blue-100 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search product name or barcode…"
                      className="block w-full pl-12 pr-4 py-3 bg-gray-100 border border-blue-100 rounded-sm  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:bg-white focus:border-blue-900/20 transition-all font-bold text-sm text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap border ${
                        activeCategory === cat 
                          ? 'bg-linear-to-l from-blue-800 to-blue-950 border-blue-900 text-white shadow-md' 
                          : 'bg-slate-100 text-gray-800 hover:bg-gray-200 border-blue-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="flex-1 overflow-y-auto px-4 no-scrollbar pb-32">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                  {products
                    .filter(p => activeCategory === 'All' || p.category_name === activeCategory)
                    .filter(p => {
                      if (!searchQuery) return true;
                      const query = searchQuery.toLowerCase();
                      return p.name.toLowerCase().includes(query) || 
                             p.sku.toLowerCase().includes(query) || 
                             (p.barcode && p.barcode.toLowerCase().includes(query));
                    })
                    .map(product => (
                    <div 
                      key={product.id}
                      className={`bg-white rounded-sm border border-blue-100 shadow-sm hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden group ${product.stock_quantity <= 0 ? 'opacity-60 grayscale-[0.5]' : ''}`}
                    >
                      {/* Product Image */}
                      <div className="h-36 sm:h-45 w-full relative overflow-hidden bg-gray-50 border-b border-blue-50">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-3xl">
                            📦
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <span className="bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase px-2 py-1 rounded-md shadow-sm text-gray-700 border border-blue-50">
                            {product.category_name}
                          </span>
                        </div>
                      </div>

                      <div className="p-2 flex-1 flex flex-col space-y-2">
                        <div>
                          <p className="text-[10px] font-black text-gray-600 uppercase">{product.sku}</p>
                          <h4 className="text-xs font-black text-blue-900 uppercase min-h-[2.5em]">{product.name}</h4>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <p className="text-base font-black text-blue-900">KSh {Number(product.selling_price).toLocaleString()}</p>
                          <p className={`text-[9px] font-black uppercase ${product.stock_quantity <= 0 ? 'text-red-700 bg-red-100' : 'text-emerald-600 bg-emerald-100'} px-2 py-1 rounded-full`}>
                            {product.stock_quantity <= 0 ? 'Out of stock' : `${product.stock_quantity} Stock`}
                          </p>
                        </div>

                        <button 
                          onClick={() => addToCart(product)}
                          disabled={product.stock_quantity <= 0}
                          className={`w-full py-3 rounded-xs text-[10px] font-black uppercase transition-all shadow-sm flex items-center justify-center space-x-2 ${
                            product.stock_quantity <= 0 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-linear-to-l from-blue-800 to-blue-950 text-white hover:bg-blue-800 active:scale-[0.98]'
                          }`}
                        >
                          <span>🛒</span>
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        {/* Product Details Modal for Scanned Items */}
        <ProductDetailsModal 
          product={scannedProduct}
          onClose={() => setScannedProduct(null)}
          onAddToCart={addToCart}
        />

                    {/* Slide-over Cart Sidebar */}
        <div 
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div 
            className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-sm transition-transform duration-300 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-3 border-b border-blue-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-blue-900 uppercase">Current Order</h3>
                  <p className="text-[10px] font-black text-gray-600 uppercase">{cart.reduce((a, b) => a + b.quantity, 0)} Items Selected</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-all"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-6xl grayscale opacity-70">🛒</div>
                    <p className="text-[11px] font-black uppercase text-center max-w-[240px]">Your cart is empty. Select products to start an order.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex space-x-4 group">
                        <div className="w-16 h-16 rounded-sm bg-gray-100 overflow-hidden border border-blue-100 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-[11px] font-black text-blue-950 uppercase">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-[10px] font-bold text-gray-600 mb-1 uppercase">{item.sku}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 bg-gray-100 rounded-sm px-2 py-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="text-blue-900 font-black px-1">-</button>
                              <span className="text-[11px] font-black text-gray-800 w-4 text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="text-blue-900 font-black px-1">+</button>
                            </div>
                            <p className="text-xs font-black text-blue-900 uppercase">KSh {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 bg-gray-100 border-t border-blue-100 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black text-gray-700 uppercase">
                    <span>Subtotal</span>
                    <span className="text-gray-900">KSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black text-gray-700 uppercase">
                    <span>Taxes (VAT 16%)</span>
                    <span className="text-gray-900">KSh {vat.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-blue-900 uppercase">Grand Total</span>
                    <span className="text-2xl font-black text-blue-900">KSh {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setShowCheckoutOverlay(true);
                    }}
                    disabled={cart.length === 0}
                    className={`col-span-2 py-4 rounded-sm font-black text-xs uppercase shadow-xs transition-all active:scale-[0.98] ${
                      cart.length === 0 ? 'bg-gray-200 text-gray-600 cursor-not-allowed shadow-none' : 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-blue-200 hover:bg-blue-800'
                    }`}
                  >
                    Proceed to Payment
                  </button>
                  <button 
                    onClick={() => setCart([])}
                    className="py-3 bg-slate-200 border border-blue-200 text-gray-700 rounded-xs font-black text-[10px] uppercase hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    Clear Order
                  </button>
                   <button 
                    className="py-3 bg-slate-200 border border-blue-200 text-gray-600 rounded-xs font-black text-[10px] uppercase hover:bg-gray-50 transition-all"
                  >
                    Hold Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Overlay Modal */}
        {showCheckoutOverlay && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-md" onClick={() => setShowCheckoutOverlay(false)} />
            <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                  <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight flex items-center space-x-3">
                    <span className="bg-blue-900 text-white p-2 rounded-xl text-lg">💳</span>
                    <span>Secure Checkout</span>
                  </h3>
                  <button 
                    onClick={() => setShowCheckoutOverlay(false)}
                    className="p-3 hover:bg-gray-100 rounded-2xl transition-all"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <Checkout 
                    cart={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeFromCart}
                    onCompleteSale={handleCompleteSale}
                    onCancel={() => setShowCheckoutOverlay(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (view === 'Receipt') {
    return (
      <div className="flex flex-col h-full bg-blue-50/50">
        <POSNavbar currentView={view} onViewChange={setView} />
        <div className="flex-1 p-4">
          <ReceiptView 
            transaction={lastTransaction}
            onNewSale={() => setView('POS Screen')}
          />
        </div>
      </div>
    );
  }

  if (view === 'Sales History' || view === 'Return Sales' || view === 'Receipts') {
    return (
      <div className="flex flex-col h-full bg-blue-50/50">
        <POSNavbar currentView={view} onViewChange={setView} />
        <div className="flex-1 p-4">
          {view === 'Sales History' && <SalesHistory />}
          {view === 'Return Sales' && <ReturnSales />}
          {view === 'Receipts' && <Receipts />}
        </div>
      </div>
    );
  }

  if (view === 'Barcode Scanner') {
    return (
      <div className="flex flex-col h-full bg-slate-900">
        <div className="flex-none bg-blue-950 p-4 border-b border-blue-900 flex items-center justify-between">
           <h2 className="text-white font-black uppercase tracking-widest text-sm">Universal Barcode Scanner</h2>
           <button 
             onClick={() => setView('POS Screen')}
             className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-sm text-[10px] font-black uppercase tracking-widest transition-all"
           >
             Close Scanner
           </button>
        </div>
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
          <div className="w-full max-w-2xl aspect-square md:aspect-video">
            <BarcodeScanner 
              onScan={(code) => {
                handleBarcodeScan(code);
                setView('POS Screen');
              }}
              onClose={() => setView('POS Screen')}
            />
          </div>
        </div>
        <div className="p-6 bg-blue-950/50 backdrop-blur-md text-center">
           <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest">
             Place barcode within the frame or use your USB scanner now
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-blue-50/50">
      <POSNavbar currentView={view} onViewChange={setView} />
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}

        {/* Floating Action Group */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4">
           {/* USB Status Badge */}
           {usbStatus === 'connected' && (
             <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl animate-in slide-in-from-right-10 duration-500 flex items-center space-x-2 border-2 border-white">
               <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
               <span>Scanner Connected</span>
             </div>
           )}

           {/* Floating Cart Button (visible if cart has items) */}
           {cart.length > 0 && (
             <button 
               onClick={() => setIsCartOpen(true)}
               className="flex items-center space-x-3 px-4 py-3 bg-blue-500 text-white rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all border border-white group"
             >
               <span className="text-xl">🛒</span>
               <span className="text-sm font-black uppercase">View Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
             </button>
           )}

           {/* Main Floating Scan Button */}
           <button 
             onClick={() => {
               if (isMobileDevice) {
                 setView('Barcode Scanner');
               } else {
                 handleRequestUsb();
               }
             }}
             className={`flex items-center space-x-3 px-4 py-3.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all group relative ${
               !isMobileDevice && usbStatus === 'connected' 
                 ? 'bg-emerald-600 text-white border-emerald-100' 
                 : 'bg-linear-to-l from-blue-800 to-blue-950 text-white'
             }`}
           >
             <span className="text-xl group-hover:animate-pulse">
               {isMobileDevice ? '📷' : '📷 '}
             </span>
             {isMobileDevice && (
               <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                 <span className="text-[10px] font-bold">+</span>
               </div>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default POSPage;
