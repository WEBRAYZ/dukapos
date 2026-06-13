"use client";

import React, { useState } from "react";

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "",
    address: "",
    taxId: "",
  });

  if (!isOpen) return null;

  const categories = [
    "Food & Beverage",
    "Stationery & Printing",
    "Cleaning & Maintenance",
    "Electrical & Hardware",
    "Medical & First Aid",
    "Uniforms & Sports",
    "IT & Electronics",
    "Others"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for adding a supplier would go here
    console.log("Add Supplier Data:", formData);
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
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-gray-100">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-olive rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
              🏪
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Register New Supplier</h2>
              <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">
                Add a new vendor to your procurement network.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm transition-all active:scale-90"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-10 overflow-y-auto custom-scrollbar space-y-8 max-h-[75vh]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Name</label>
              <input 
                type="text" 
                placeholder="e.g. Accra Foods Wholesale Ltd"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 focus:border-olive/30 transition-all"
              />
            </div>

            {/* Contact Person */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Person</label>
              <input 
                type="text" 
                placeholder="Full name"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 focus:border-olive/30 transition-all"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select Category...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="vendor@company.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 focus:border-olive/30 transition-all"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+233 XX XXX XXXX"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 focus:border-olive/30 transition-all"
              />
            </div>

            {/* Tax ID */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tax Identification Number (TIN)</label>
              <input 
                type="text" 
                placeholder="GHA-XXXXXXX-X"
                value={formData.taxId}
                onChange={(e) => setFormData({...formData, taxId: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 focus:border-olive/30 transition-all"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Address</label>
              <textarea 
                rows={3}
                placeholder="Street, City, Region..."
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-olive/10 focus:border-olive/30 transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex space-x-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-gray-800 transition-all active:scale-95 shadow-sm"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 bg-olive text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-olive/90 transition-all shadow-xl shadow-olive/20 active:scale-95"
            >
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;
