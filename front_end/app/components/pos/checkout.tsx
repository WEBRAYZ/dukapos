'use client';

import React, { useState, useMemo } from 'react';

export interface CartItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantity: number;
  icon: string;
  color: string;
  image: string;
}

interface CheckoutProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCompleteSale: (transaction: {
    invoiceNo: string;
    date: string;
    customer: { name: string; tier: string; color: string };
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
  }) => void;
  onCancel: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCompleteSale, 
  onCancel 
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('Walk-in Customer');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [taxRate] = useState(0.16); // Kenya Standard VAT
  const [discountPercent, setDiscountPercent] = useState(0);

  const customers = useMemo(() => [
    { name: 'Walk-in Customer', tier: 'Guest', color: 'bg-blue-50 text-blue-600' },
    { name: 'Aria Solutions LLC', tier: 'Gold', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Marcus Thorne', tier: 'Silver', color: 'bg-gray-100 text-gray-700' },
    { name: 'Yuki Nakamura', tier: 'Platinum', color: 'bg-purple-100 text-purple-700' },
    { name: 'Bloom & Craft Co.', tier: 'Bronze', color: 'bg-orange-100 text-orange-700' },
  ], []);

  const paymentMethods = [
    { name: 'Cash', icon: '💵', description: 'Physical currency' },
    { name: 'M-Pesa', icon: '📱', description: 'Mobile money' },
    { name: 'Card', icon: '💳', description: 'Visa/Mastercard' },
    { name: 'Bank', icon: '🏦', description: 'Direct transfer' },
    { name: 'Credit', icon: '⭐', description: 'Store credit' },
    { name: 'Split', icon: '✂️', description: 'Multiple methods' },
  ];

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * taxRate;
  const total = taxableAmount + tax;

  const handleCompleteSale = React.useCallback(() => {
    const transaction = {
      invoiceNo: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      customer: customers.find(c => c.name === selectedCustomer) || customers[0],
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod
    };
    onCompleteSale(transaction);
  }, [cart, customers, selectedCustomer, subtotal, tax, total, paymentMethod, onCompleteSale]);

  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full p-3 bg-gray-50/50 overflow-y-auto no-scrollbar">
      {/* M-Pesa Modal */}
      {showMPesaModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-sm" onClick={() => !isProcessing && setShowMPesaModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-8 animate-in zoom-in duration-300">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-black text-blue-900 uppercase">M-Pesa Payment</h3>
              <p className="text-xs font-bold text-gray-500 uppercase">Amount: KSh {total.toLocaleString()}</p>

              {mpesaStatus === 'idle' && (
                <div className="space-y-4 pt-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-gray-700 uppercase ml-1">Phone Number (M-Pesa)</label>
                    <input 
                      type="text" 
                      placeholder="07XX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-100 border border-blue-100 rounded-sm text-lg font-black tracking-widest focus:bg-white outline-none"
                    />
                  </div>
                  {error && <p className="text-[10px] font-black text-red-500 uppercase">{error}</p>}
                  <button 
                    onClick={initiateMPesaPayment}
                    className="w-full py-4 bg-emerald-600 text-white rounded-sm font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg"
                  >
                    Send STK Push
                  </button>
                </div>
              )}

              {mpesaStatus === 'pending' && (
                <div className="py-8 space-y-6">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm font-black text-blue-900 uppercase animate-pulse">Waiting for customer to enter PIN…</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Please do not close this window</p>
                </div>
              )}

              {mpesaStatus === 'completed' && (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-black text-emerald-600 uppercase">Payment Successful!</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">Finalizing transaction…</p>
                </div>
              )}

              {mpesaStatus === 'failed' && (
                <div className="py-8 space-y-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl text-red-500">❌</span>
                  </div>
                  <p className="text-lg font-black text-red-600 uppercase">Payment Failed</p>
                  <p className="text-xs font-bold text-gray-500">{error}</p>
                  <button 
                    onClick={() => {
                      setMpesaStatus('idle');
                      setError('');
                    }}
                    className="w-full py-4 bg-gray-100 text-gray-800 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!isProcessing && mpesaStatus !== 'completed' && (
                <button 
                  onClick={() => setShowMPesaModal(false)}
                  className="text-[10px] font-black text-gray-400 uppercase hover:text-gray-600 transition-colors pt-4 block w-full"
                >
                  Cancel and use another method
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Left Column: Order Review */}
      <div className="flex-1 flex flex-col space-y-3 min-h-0">
        <div className="bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden h-full">
          <div className="p-3 border-b border-blue-100 shrink-0 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase">Order Review</h3>
              <p className="text-[10px] font-black text-gray-600 uppercase">{cart.length} items in list</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-3">
                <div className="text-6xl grayscale opacity-50">🛒</div>
                <p className="text-xs font-black uppercase text-center">Your cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 p-3 rounded-sm bg-gray-50/50 border border-blue-100 hover:border-blue-200 hover:bg-white transition-all group">
                  <div className="w-16 h-16 rounded-sm overflow-hidden border border-blue-100 shrink-0 shadow-sm">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-black text-gray-900 uppercase line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] font-bold text-gray-600 uppercase">{item.sku}</p>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-3 bg-slate-200 rounded-xs border border-blue-100 px-2 py-1">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-blue-900 font-black px-1">-</button>
                        <span className="text-[10px] font-black text-gray-800 w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-blue-900 font-black px-1">+</button>
                      </div>
                      <p className="text-xs font-black text-blue-900">KSh {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-blue-50 bg-gray-50/30 space-y-3 shrink-0">
             <div className="flex flex-col space-y-3">
                <div>
                  <label className="text-[10px] font-black text-gray-700 uppercase block">Order Notes</label>
                  <textarea 
                    placeholder="Add special instructions or delivery notes…"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-900/10 min-h-[80px] resize-none"
                  />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column: Transaction Details */}
      <div className="w-full lg:w-[450px] flex flex-col space-y-4 overflow-auto min-h-0">
        {/* Customer & Discounts */}
        <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm space-y-3">
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-gray-700 uppercase flex items-center justify-between">
              <span>Customer</span>
              <button className="text-blue-600 hover:underline">New +</button>
            </h3>
            <select 
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-xs font-black text-gray-900 uppercase tracking-tight focus:bg-white focus:border-blue-900/20 outline-none appearance-none cursor-pointer"
            >
              {customers.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className="space-y-3 pt-3 border-t border-blue-50">
            <h3 className="text-[10px] font-black text-gray-700 uppercase">Promotion & Discount</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="PROMO CODE"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-1 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue-900/20 outline-none"
              />
              <button className="px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-xs text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-md">
                Apply
              </button>
            </div>
            <div className="flex justify-between gap-1.5">
              {[0, 5, 10, 15, 20].map(pct => (
                <button
                  key={pct}
                  onClick={() => setDiscountPercent(pct)}
                  className={`flex-1 py-2 rounded-sm text-[9px] font-black transition-all border ${
                    discountPercent === pct 
                      ? 'bg-linear-to-l from-blue-800 to-blue-950 border-blue-900 text-white shadow-sm' 
                      : 'bg-slate-100 border-blue-100 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-4 rounded-sm shadow-sm flex flex-col flex-1 overflow-hidden">
          <h3 className="text-[13px] font-black text-gray-900 uppercase mb-4 shrink-0">Payment Method</h3>
          <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 no-scrollbar">
            {paymentMethods.map((pm) => (
              <button
                key={pm.name}
                onClick={() => setPaymentMethod(pm.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-sm transition-all border-2 text-center group ${
                  paymentMethod === pm.name 
                    ? 'bg-blue-900 border-blue-900 text-white shadow-lg' 
                    : 'bg-white border-gray-50 text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{pm.icon}</span>
                <span className="text-[10px] font-black uppercase">{pm.name}</span>
                <span className={`text-[8px] font-medium uppercase mt-1 opacity-60 ${paymentMethod === pm.name ? 'text-blue-100' : 'text-gray-400'}`}>
                  {pm.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary & Actions */}
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-3 rounded-sm shadow-xl space-y-6 shrink-0 text-white">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-black uppercase opacity-80">
              <span>Subtotal</span>
              <span>KSh {subtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-[11px] font-black uppercase text-emerald-400">
                <span>Discount ({discountPercent}%)</span>
                <span>- KSh {discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-[11px] font-black uppercase opacity-80">
              <span>Taxes (VAT 16%)</span>
              <span>KSh {tax.toLocaleString()}</span>
            </div>
            <div className="h-px bg-white/10 my-4" />
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase opacity-80 mb-1">Payable Amount</p>
                <p className="text-3xl font-black tracking-tight">KSh {total.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase opacity-80">Method</p>
                <p className="text-xs font-black uppercase">{paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <button 
              onClick={handleCompleteSale}
              className="w-full py-5 bg-linear-to-l from-blue-400 to-blue-700 text-blue-100 rounded-sm font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Complete Transaction
            </button>
            <button 
              onClick={onCancel}
              className="w-full py-4 bg-transparent border border-white/20 text-white/60 rounded-sm font-black text-[10px] uppercase tracking-widest hover:text-white hover:border-white/40 transition-all"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;