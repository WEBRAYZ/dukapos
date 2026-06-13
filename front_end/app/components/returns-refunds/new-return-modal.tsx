"use client";

import React, { useState } from "react";

interface NewReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewReturnModal: React.FC<NewReturnModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    orderId: "",
    items: [{ name: "", quantity: 1, price: 0 }],
    reason: "",
    refundMethod: "Store Credit",
    restockInventory: true,
  });

  if (!isOpen) return null;

  const refundMethods = ["Store Credit", "Original Payment", "Cash", "Bank Transfer"];
  const reasons = ["Defective", "Wrong Size", "Changed Mind", "Not as Described", "Damaged in Transit", "Other"];

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 1, price: 0 }]
    });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index)
      });
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log("Submitting return:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col border border-gray-100">
        {/* Header */}
        <div className="px-8 py-8 border-b border-gray-50 flex justify-between items-start shrink-0">
          <div>
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Initiate New Return</h2>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              Process customer returns, exchanges, and restocks.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          
          {/* Customer & Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Name</label>
              <input 
                type="text" 
                placeholder="Search or enter name..."
                required
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900/30 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Original Order ID</label>
              <input 
                type="text" 
                placeholder="ORD-XXXXX"
                required
                value={formData.orderId}
                onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900/30 transition-all"
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Items to Return</label>
              <button 
                type="button"
                onClick={handleAddItem}
                className="text-[9px] font-black text-blue-900 uppercase tracking-widest hover:underline"
              >
                + Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-end space-x-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-50 group">
                  <div className="flex-1 space-y-1.5">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Product Name</p>
                    <input 
                      type="text" 
                      placeholder="Product Name"
                      required
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold focus:outline-none focus:border-blue-900/30 transition-all"
                    />
                  </div>
                  <div className="w-20 space-y-1.5">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Qty</p>
                    <input 
                      type="number" 
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold focus:outline-none focus:border-blue-900/30 transition-all"
                    />
                  </div>
                  <div className="w-32 space-y-1.5">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Price (KSh)</p>
                    <input 
                      type="number" 
                      min="0"
                      required
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
                      className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-bold focus:outline-none focus:border-blue-900/30 transition-all"
                    />
                  </div>
                  {formData.items.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Reason & Refund */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Return Reason</label>
                <select 
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select a reason...</option>
                  {reasons.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Refund Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {refundMethods.map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({...formData, refundMethod: m})}
                      className={`px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-tight transition-all border ${
                        formData.refundMethod === m 
                        ? "bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-900/20" 
                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary & Options */}
            <div className="bg-gray-50 rounded-[2rem] p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em]">Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Subtotal</span>
                    <span className="text-[10px] font-black text-gray-800">KSh {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Restock Fee</span>
                    <span className="text-[10px] font-black text-gray-800">KSh 0</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-black text-blue-900 uppercase">Total Refund</span>
                    <span className="text-xl font-black text-blue-900 tracking-tight">KSh {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black text-gray-800 uppercase">Restock Inventory</p>
                  <p className="text-[7px] font-bold text-gray-400 uppercase">Add items back to stock</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, restockInventory: !formData.restockInventory })}
                  className={`w-10 h-5 rounded-full transition-all relative ${formData.restockInventory ? 'bg-blue-900' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.restockInventory ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex space-x-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-gray-800 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-blue-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
            >
              Process Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReturnModal;
