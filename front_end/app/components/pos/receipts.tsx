'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api';

interface SaleItem {
  id: number;
  product_name: string;
  quantity: string;
  unit_price: string;
  subtotal: string;
}

interface Sale {
  id: number;
  sale_number: string;
  customer_name?: string;
  timestamp: string;
  total_amount: string;
  tax_amount: string;
  subtotal: string;
  payment_mode: string;
  cashier_name: string;
  status: string;
  mpesa_receipt?: string;
  items: SaleItem[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  buttonText: string;
  selectedTxn: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  icon, 
  placeholder, 
  value, 
  onChange, 
  buttonText,
  selectedTxn
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3">
      <div 
        className="absolute inset-0 bg-blue-950/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-sm overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-3xl mx-auto mb-3">
            {icon}
          </div>
          <h3 className="text-xl font-black text-blue-900 uppercase mb-2">{title}</h3>
          <p className="text-xs font-bold text-gray-600 uppercase mb-5">Send receipt for {selectedTxn}</p>
          
          <div className="space-y-3">
            <input 
              type="text" 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-6 py-4 bg-gray-100 border border-blue-100 rounded-sm text-sm font-black text-gray-900 uppercase focus:bg-white focus:border-blue-900/20 outline-none transition-all"
            />
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-5 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-800 transition-all active:scale-[0.98]"
            >
              {buttonText}
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-all mt-4"
            >
              Cancel & Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Receipts = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTxnId, setSelectedTxnId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await api.get<Sale[]>('/pos/sales/');
        setSales(response);
        if (response.length > 0) {
          setSelectedTxnId(response[0].sale_number);
        }
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch sales for receipts:', err);
        setError(err.message || 'Failed to load receipts');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const selectedSale = useMemo(() => {
    return sales.find(s => s.sale_number === selectedTxnId) || null;
  }, [sales, selectedTxnId]);

  const filteredSales = useMemo(() => {
    return sales.filter(s => 
      s.sale_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.customer_name && s.customer_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sales, searchQuery]);

  const handlePrint = () => {
    window.print();
  };

  const barcodeBars = [
    { opacity: 0.9, width: '2px' }, { opacity: 0.5, width: '1px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.9, width: '1px' },
    { opacity: 0.5, width: '2px' }, { opacity: 0.9, width: '1px' }, { opacity: 0.5, width: '2px' }, { opacity: 0.9, width: '2px' },
    { opacity: 0.9, width: '1px' }, { opacity: 0.5, width: '1px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.5, width: '2px' },
    { opacity: 0.9, width: '1px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.5, width: '1px' }, { opacity: 0.9, width: '1px' },
    { opacity: 0.5, width: '2px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.9, width: '1px' }, { opacity: 0.5, width: '2px' },
    { opacity: 0.9, width: '2px' }, { opacity: 0.5, width: '1px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.9, width: '1px' },
    { opacity: 0.5, width: '2px' }, { opacity: 0.9, width: '1px' }, { opacity: 0.5, width: '2px' }, { opacity: 0.9, width: '2px' },
    { opacity: 0.9, width: '1px' }, { opacity: 0.5, width: '1px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.5, width: '2px' },
    { opacity: 0.9, width: '1px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.5, width: '1px' }, { opacity: 0.9, width: '1px' },
    { opacity: 0.5, width: '2px' }, { opacity: 0.9, width: '2px' }, { opacity: 0.9, width: '1px' }, { opacity: 0.5, width: '2px' },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-8 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Loading Receipts...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 h-full overflow-hidden relative">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #pos-receipt, #pos-receipt * {
            visibility: visible;
          }
          #pos-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            border: none;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Modals */}
      <Modal 
        isOpen={showEmailModal} 
        onClose={() => setShowEmailModal(false)}
        title="Email Receipt"
        icon="📧"
        placeholder="Enter email address"
        value={email}
        onChange={setEmail}
        buttonText="Send via Email"
        selectedTxn={selectedTxnId || ''}
      />
      <Modal 
        isOpen={showSMSModal} 
        onClose={() => setShowSMSModal(false)}
        title="SMS Receipt"
        icon="📱"
        placeholder="Enter phone number"
        value={phone}
        onChange={setPhone}
        buttonText="Send via SMS"
        selectedTxn={selectedTxnId || ''}
      />

      {/* Left Sidebar: Receipts List */}
      <div className="w-[350px] flex flex-col bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden shrink-0 no-print">
        <div className="p-3 border-b border-blue-50">
          <h3 className="text-sm font-black text-olive uppercase mb-3">Receipts & Invoices</h3>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or customer…"
              className="block w-full pl-9 pr-3 py-2 bg-gray-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:bg-slate-50 focus:ring-1 focus:ring-olive transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredSales.map((item) => (
            <div 
              key={item.sale_number}
              onClick={() => setSelectedTxnId(item.sale_number)}
              className={`p-3 border-b border-blue-50 cursor-pointer transition-all hover:bg-gray-100 ${selectedTxnId === item.sale_number ? 'bg-green-50/50 border-l-4 border-l-olive' : ''}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-black text-olive">{item.sale_number}</span>
                <span className="text-xs font-black text-gray-800 font-mono">KSh {parseFloat(item.total_amount).toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-gray-700 uppercase">{item.customer_name || 'Walk-in'}</span>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-700 uppercase">{new Date(item.timestamp).toLocaleDateString()} · {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full uppercase">{item.payment_mode === '01' ? 'Cash' : item.payment_mode === '03' ? 'M-Pesa' : 'Credit'}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredSales.length === 0 && (
            <div className="p-10 text-center text-slate-400 font-black uppercase text-[10px]">No receipts found</div>
          )}
        </div>
      </div>

      {/* Right Column: Receipt Preview */}
      <div className="flex-1 flex flex-col bg-white rounded-sm border border-blue-100 shadow-xl overflow-hidden">
        {selectedSale ? (
          <>
            <div className="p-3 border-b border-blue-50 flex items-center justify-between shrink-0 bg-gray-50/30 no-print">
              <h3 className="text-sm font-black text-blue-800 uppercase flex items-center">
                <span className="mr-2">📄</span>
                Receipt Preview — {selectedTxnId}
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowEmailModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-blue-100 rounded-sm hover:bg-gray-200 transition-all text-[10px] font-black uppercase text-blue-800"
                >
                  <span>📧</span>
                  <span>Email</span>
                </button>
                <button 
                  onClick={() => setShowSMSModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-blue-100 rounded-sm hover:bg-gray-200 transition-all text-[10px] font-black uppercase text-blue-800"
                >
                  <span>📱</span>
                  <span>SMS</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-blue-100 rounded-sm hover:bg-gray-50 transition-all text-[10px] font-black uppercase text-blue-800">
                  <span>⬇</span>
                  <span>PDF</span>
                </button>
                <button 
                  onClick={handlePrint}
                  className="flex items-center space-x-2 px-6 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm hover:bg-blue-800 transition-all text-[10px] font-black uppercase shadow-lg"
                >
                  <span>🖨</span>
                  <span>Print</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-100/50 flex justify-center">
              <div id="pos-receipt" className="w-[400px] bg-white shadow-2xl p-8 flex flex-col items-center text-center font-mono text-xs leading-relaxed text-gray-800">
                <div className="mb-4">
                  <h2 className="text-lg text-blue-800 font-black uppercase">NDUKAPOS RETAIL</h2>
                  <p className='text-blue-950'>Premium POS & Inventory Solution</p>
                  <p className='text-blue-950'>Tel: +254 7XX XXX XXX</p>
                  <p className='text-blue-950'>VAT No: PXXXXXXXXX</p>
                </div>

                <div className="w-full border-t border-dashed border-blue-300 py-3 space-y-1 text-left">
                  <div className="flex justify-between uppercase">
                    <span className="text-blue-800 font-black">Receipt No:</span>
                    <span>{selectedSale.sale_number}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span className="text-blue-800 font-black">Date:</span>
                    <span>{new Date(selectedSale.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span className="text-blue-800 font-black">Cashier:</span>
                    <span>{selectedSale.cashier_name}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span className="text-blue-800 font-black">Customer:</span>
                    <span>{selectedSale.customer_name || 'Walk-in'}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span className="text-blue-800 font-black">Payment:</span>
                    <span>{selectedSale.payment_mode === '01' ? 'Cash' : selectedSale.payment_mode === '03' ? 'M-Pesa' : 'Credit'}</span>
                  </div>
                </div>

                <div className="w-full border-t border-dashed border-blue-300 pt-4 mb-3">
                  <div className="flex justify-between font-black uppercase mb-2 border-b border-blue-100 pb-1">
                    <span className="text-blue-800 flex-1">Description</span>
                    <span className="text-blue-800 w-12 text-center">Qty</span>
                    <span className="text-blue-800 w-20 text-right">Amount</span>
                  </div>
                  <div className="space-y-2">
                    {selectedSale.items.map((item) => (
                      <div key={item.id} className="flex justify-between uppercase">
                        <span className="flex-1 text-left">{item.product_name}</span>
                        <span className="w-12 text-center">{parseFloat(item.quantity)}</span>
                        <span className="w-20 text-right">KSh {parseFloat(item.subtotal).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full border-t border-dashed border-blue-300 pt-4 space-y-1 text-right">
                  <div className="flex justify-between uppercase">
                    <span>Subtotal</span>
                    <span>KSh {parseFloat(selectedSale.subtotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between uppercase">
                    <span>VAT (16%)</span>
                    <span>KSh {parseFloat(selectedSale.tax_amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-black uppercase pt-2 border-t border-blue-100 mt-1">
                    <span className='text-blue-800'>KSh {parseFloat(selectedSale.total_amount).toLocaleString()}</span>
                    <span className='text-blue-800'>TOTAL PAID</span>
                  </div>
                </div>

                <div className="w-full border-t border-dashed border-blue-300 mt-3 py-4 space-y-1 text-left">
                  <div className="flex justify-between uppercase">
                    <span className="text-blue-800 font-black">Payment Method</span>
                    <span>{selectedSale.payment_mode === '01' ? 'Cash' : selectedSale.payment_mode === '03' ? 'M-Pesa' : 'Credit'}</span>
                  </div>
                  {selectedSale.mpesa_receipt && (
                    <div className="flex justify-between uppercase">
                      <span className="text-blue-800 font-black">M-Pesa Code</span>
                      <span>{selectedSale.mpesa_receipt}</span>
                    </div>
                  )}
                </div>

                <div className="my-4 flex flex-col items-center space-y-1">
                  <div className="w-48 h-10 flex items-stretch space-x-px">
                    {barcodeBars.map((bar, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-800 flex-1" 
                        style={{ 
                          opacity: bar.opacity,
                          width: bar.width
                        }} 
                      />
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-gray-700 uppercase">{selectedSale.sale_number}</p>
                </div>

                <div className="text-[12px] space-y-1">
                  <p className="font-black uppercase tracking-widest">Thank you for your purchase!</p>
                  <p>Exchange within 7 days with receipt.</p>
                  <div className="pt-4 border-t border-blue-100 mt-3 italic text-gray-700">
                    *** Customer Copy ***
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 font-black uppercase tracking-widest text-xs">
            Select a receipt to preview
          </div>
        )}
      </div>
    </div>
  );
};

export default Receipts;
