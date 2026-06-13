'use client';

import React from 'react';

interface NewPOProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: {
    name: string;
    email: string;
    [key: string]: any;
  };
}

const NewPO: React.FC<NewPOProps> = ({ isOpen, onClose, supplier }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-3">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
              📦
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-950 uppercase">Create New Purchase Order</h3>
              <p className="text-[10px] font-bold text-slate-700 uppercase">Supplier: {supplier.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-gray-100 transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">PO Number</label>
              <input type="text" value="PO-2026-0042" readOnly className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-500 cursor-not-allowed outline-none uppercase" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Order Date</label>
              <input type="text" value="June 07, 2026" readOnly className="w-full px-6 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-500 cursor-not-allowed outline-none uppercase" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Expected Delivery</label>
              <input type="date" className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/20 transition-all" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
               <h4 className="text-[11px] font-black text-slate-800 uppercase">Order Items</h4>
               <button className="text-[11px] font-black text-blue-600 uppercase hover:underline">+ Add SKU</button>
            </div>
            
            <div className="bg-white border border-blue-100 rounded-sm overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase">Item / Description</th>
                    <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase text-center">Qty</th>
                    <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase text-right">Unit Cost</th>
                    <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr>
                    <td className="px-4 py-4">
                      <input type="text" placeholder="Start typing SKU or product name..." className="w-full bg-slate-100 border-none p-4 text-[11px] font-bold text-gray-800 focus:ring-0 uppercase" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <input type="number" defaultValue={0} className="w-14 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-center p-3 focus:outline-none focus:border-blue-500" />
                    </td>
                    <td className="px-4 py-4 text-right font-black text-slate-600 text-[11px]">KSh 0.00</td>
                    <td className="px-4 py-4 text-right font-black text-slate-600 text-[11px]">KSh 0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Shipping Method</label>
                <select className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none uppercase appearance-none cursor-pointer">
                  <option>Standard Freight</option>
                  <option>Express Delivery</option>
                  <option>Self Collection</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Notes to Supplier</label>
                <textarea rows={3} placeholder="Any specific instructions for this order..." className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none uppercase resize-none custom-scrollbar"></textarea>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-4 pr-3 justify-center">
              <div className="flex items-center space-x-12">
                 <span className="text-[11px] font-black text-slate-600 uppercasee">Total Items</span>
                 <span className="text-sm font-black text-gray-800">0</span>
              </div>
              <div className="flex items-center space-x-12 pt-3 border-t border-blue-100 w-full justify-end">
                 <span className="text-[11px] font-black text-blue-900 uppercase ">Estimated Total</span>
                 <span className="text-2xl font-black text-blue-600 uppercase ">KSh 0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-blue-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-black text-slate-600 uppercase">Auto-calculate taxes based on vendor profile</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-slate-200 text-slate-600 rounded-sm text-[10px] font-black uppercase hover:bg-slaate-300 transition-all active:scale-95"
            >
              Discard
            </button>
            <button 
              className="px-10 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95 group"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Send PO to Vendor</span>
              <span className="group-hover:translate-x-1 transition-transform">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPO;
