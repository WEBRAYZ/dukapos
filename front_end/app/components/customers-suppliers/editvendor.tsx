'use client';

import React from 'react';

interface EditVendorProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: {
    name: string;
    email: string;
    phone: string;
    website: string;
    category: string;
    contactPerson: string;
    address: string;
    taxId: string;
    terms: string;
    currency: string;
    leadTime: string;
    minOrder: number;
    [key: string]: any;
  };
}

const EditVendor: React.FC<EditVendorProps> = ({ isOpen, onClose, supplier }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-3">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
              🏢
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-950 uppercase">Edit Vendor Profile</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase">Updating: {supplier.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercas ml-1">Company Name</label>
              <input 
                type="text" 
                defaultValue={supplier.name}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Primary Contact</label>
              <input 
                type="text" 
                defaultValue={supplier.contactPerson}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={supplier.email}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Phone Number</label>
              <input 
                type="text" 
                defaultValue={supplier.phone}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Website</label>
              <input 
                type="text" 
                defaultValue={supplier.website}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Category</label>
              <select className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase appearance-none cursor-pointer">
                <option>{supplier.category}</option>
                <option>Food & Beverage</option>
                <option>Packaging & Supplies</option>
                <option>Equipment</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Postal Address</label>
            <input 
              type="text" 
              defaultValue={supplier.address}
              className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Tax ID / VAT</label>
              <input 
                type="text" 
                defaultValue={supplier.taxId}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Terms</label>
              <select className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase appearance-none cursor-pointer">
                <option>{supplier.terms}</option>
                <option>Net 15</option>
                <option>Net 30</option>
                <option>Net 60</option>
                <option>Due on Receipt</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Currency</label>
              <input 
                type="text" 
                defaultValue={supplier.currency}
                className="w-full px-4 py-4 bg-slate-100 border border-gray-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-slate-200 text-blue-800 rounded-sm text-[10px] font-black uppercase hover:bg-gray-100 transition-all active:scale-95"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-4">
            <button 
              className="px-10 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95 group"
            >
              <span className="text-[10px] font-black uppercase">Save Changes</span>
              <span className="group-hover:translate-x-1 transition-transform">✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVendor;
