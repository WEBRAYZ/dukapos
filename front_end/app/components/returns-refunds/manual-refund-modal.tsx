"use client";

import React, { useState } from "react";

interface ManualRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManualRefundModal: React.FC<ManualRefundModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    refundAmount: "",
    refundReason: "",
    paymentMethod: "Cash",
    notes: "",
  });

  if (!isOpen) return null;

  const paymentMethods = ["Cash", "Card", "Bank Transfer", "Store Credit"];
  const reasons = ["Overpayment", "Goodwill Refund", "Pricing Error", "Order Cancellation", "Other"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for submitting the manual refund would go here
    console.log("Manual Refund Data:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay for dimming */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-gray-100">
        {/* Header */}
        <div className="px-8 py-8 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Manual Refund Entry</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              Record a refund outside of the standard return workflow.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm transition-all"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Name</label>
              <input 
                type="text" 
                placeholder="Enter customer name..."
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>

            {/* Refund Amount */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Refund Amount (KSh)</label>
              <input 
                type="number" 
                placeholder="0.00"
                required
                value={formData.refundAmount}
                onChange={(e) => setFormData({...formData, refundAmount: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500/50 transition-all"
              />
            </div>

            {/* Refund Reason */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reason for Refund</label>
              <select 
                required
                value={formData.refundReason}
                onChange={(e) => setFormData({...formData, refundReason: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold focus:outline-none focus:border-orange-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select reason...</option>
                {reasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({...formData, paymentMethod: m})}
                    className={`px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all border ${
                      formData.paymentMethod === m 
                      ? "bg-orange-500 text-white border-orange-500 shadow-md" 
                      : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Internal Notes</label>
              <textarea 
                rows={3}
                placeholder="Additional details for audit trail..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:border-orange-500/50 transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex space-x-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-gray-800 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
            >
              Issue Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualRefundModal;
