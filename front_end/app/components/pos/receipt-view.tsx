'use client';

import React, { useState } from 'react';
import { CartItem } from './checkout';

interface ReceiptViewProps {
  transaction: {
    invoiceNo: string;
    date: string;
    customer: {
      name: string;
      tier: string;
    };
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
  } | null;
  onNewSale: () => void;
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
  transactionNo: string;
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
  transactionNo
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-blue-950/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6">
            {icon}
          </div>
          <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight mb-2">{title}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Send receipt for {transactionNo}</p>
          
          <div className="space-y-4">
            <input 
              type="text" 
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-sm font-black text-gray-900 uppercase tracking-tight focus:bg-white focus:border-blue-900/20 outline-none transition-all"
            />
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-full py-5 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-800 transition-all active:scale-[0.98]"
            >
              {buttonText}
            </button>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
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

const ReceiptView: React.FC<ReceiptViewProps> = ({ transaction, onNewSale }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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

  if (!transaction) return null;

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-100 relative overflow-y-auto">
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
      <div className="w-full max-w-[480px] space-y-4 relative z-10 py-4 no-print">
        {/* Top Action Buttons */}
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => setShowEmailModal(true)}
            className="flex-1 bg-white p-2 rounded-sm border border-blue-100 shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-100 transition-all group cursor-pointer active:scale-95"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📧</span>
            <span className="text-[10px] font-black text-blue-900 uppercase">Email Receipt</span>
          </button>
          <button 
            type="button"
            onClick={() => setShowSMSModal(true)}
            className="flex-1 bg-white p-2 rounded-sm border border-blue-100 shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-100 transition-all group cursor-pointer active:scale-95"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">📱</span>
            <span className="text-[10px] font-black text-blue-900 uppercase">SMS Receipt</span>
          </button>
        </div>

        {/* The Receipt Itself - Matching Receipts Component */}
        <div id="pos-receipt" className="bg-white shadow-2xl p-3 flex flex-col items-center text-center font-mono text-xs leading-relaxed text-gray-800 border border-gray-100 rounded-sm">
          {/* Business Info */}
          <div className="mb-4">
            <h2 className="text-lg font-black uppercase mb-1 text-blue-900">MediCare Pharmacy</h2>
            <p className="font-bold">Kimathi Street, Nairobi CBD</p>
            <p>Tel: +254 700 000 000</p>
            <p>VAT No: P051234567M</p>
          </div>

          <div className="w-full border-t border-dashed border-blue-300 py-3 space-y-1 text-left">
            <div className="flex justify-between uppercase">
              <span className="font-black text-blue-900">Receipt No:</span>
              <span>{transaction.invoiceNo}</span>
            </div>
            <div className="flex justify-between uppercase">
              <span className="font-black text-blue-900">Date:</span>
              <span>{transaction.date}</span>
            </div>
            <div className="flex justify-between uppercase">
              <span className="font-black text-blue-900">Customer:</span>
              <span>{transaction.customer.name}</span>
            </div>
            <div className="flex justify-between uppercase">
              <span className="font-black text-blue-900">Payment:</span>
              <span>{transaction.paymentMethod}</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="w-full border-t border-dashed border-blue-300 pt-3 mb-3">
            <div className="flex justify-between font-black uppercase mb-2 border-b border-blue-100 pb-1 text-blue-900">
              <span className="flex-1 text-left">Description</span>
              <span className="w-12 text-center">Qty</span>
              <span className="w-20 text-right">Amount</span>
            </div>
            <div className="space-y-2">
              {transaction.items.map((item, index) => (
                <div key={index} className="flex justify-between uppercase">
                  <span className="flex-1 text-left truncate pr-2">{item.name}</span>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <span className="w-20 text-right">KSh {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="w-full border-t border-dashed border-blue-300 pt-3 space-y-1 text-right">
            <div className="flex justify-between uppercase">
              <span>Subtotal</span>
              <span>KSh {transaction.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between uppercase">
              <span>VAT (16%)</span>
              <span>KSh {transaction.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-black uppercase pt-2 border-t border-blue-100 mt-1 text-blue-900">
              <span>TOTAL PAID</span>
              <span>KSh {transaction.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Detail */}
          <div className="w-full border-t border-dashed border-blue-300 mt-4 py-3 space-y-1 text-left">
            <div className="flex justify-between uppercase">
              <span className="font-black text-blue-900">Payment Method</span>
              <span>{transaction.paymentMethod}</span>
            </div>
            <div className="flex justify-between uppercase">
              <span className="font-black text-blue-900">Change Given</span>
              <span>KSh 0</span>
            </div>
          </div>

          {/* QR Code / Barcode Placeholder */}
          <div className="my-3 flex flex-col items-center space-y-1">
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
            <p className="font-mono text-[10px] text-gray-700 uppercase">{transaction.invoiceNo}</p>
          </div>

          {/* Footer */}
          <div className="text-[10px] space-y-1">
            <p className="font-black uppercase text-blue-900">Thank you for your purchase!</p>
            <p>Exchange within 7 days with receipt.</p>
            <p className="font-bold text-red-600 uppercase">Keep out of reach of children.</p>
            <div className="pt-4 border-t border-blue-100 mt-4 italic text-slate-700">
              *** Customer Copy ***
            </div>
          </div>
        </div>

        {/* Post-Sale Actions */}
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex-1 py-3 bg-slate-300 border border-blue-100 rounded-sm flex items-center justify-center space-x-3 text-[12px] font-black uppercase text-slate-800 hover:bg-slate-400 transition-all shadow-sm"
          >
            <span className="text-xl">🖨</span>
            <span>Print Receipt</span>
          </button>
          <button 
            onClick={onNewSale}
            className="flex-1 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[12px] font-black uppercase shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all active:scale-[0.98]"
          >
            + New Sale
          </button>
        </div>
      </div>

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
        transactionNo={transaction.invoiceNo}
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
        transactionNo={transaction.invoiceNo}
      />
    </div>
  );
};

export default ReceiptView;