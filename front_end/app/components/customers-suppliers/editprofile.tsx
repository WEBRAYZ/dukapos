'use client';

import React from 'react';

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  customer: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    branch: string;
    tier: string;
    [key: string]: any;
  };
}

const EditProfile: React.FC<EditProfileProps> = ({ isOpen, onClose, customer }) => {
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
        <div className="bg-white border-b border-blue-100 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
              👤
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-800 uppercase">Edit Customer Profile</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase">Updating: {customer.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-700 uppercase ml-1">Full Name</label>
              <input 
                type="text" 
                defaultValue={customer.name}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Email Address</label>
              <input 
                type="email" 
                defaultValue={customer.email}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Phone Number</label>
              <input 
                type="text" 
                defaultValue={customer.phone}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Date of Birth</label>
              <input 
                type="text" 
                defaultValue={customer.dob}
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Physical Address</label>
            <input 
              type="text" 
              defaultValue={customer.address}
              className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase ml-1">Assigned Branch</label>
              <div className="relative">
                <select className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase appearance-none cursor-pointer">
                  <option>{customer.branch}</option>
                  <option>Westlands Branch</option>
                  <option>Karen Branch</option>
                  <option>Industrial Area Branch</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 text-xs">▼</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase ml-1">Customer Tier</label>
              <div className="relative">
                <select className="w-full px-6 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-500/20 transition-all uppercase appearance-none cursor-pointer">
                  <option>{customer.tier}</option>
                  <option>Silver</option>
                  <option>Gold</option>
                  <option>Platinum</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 text-xs">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-blue-100 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-slate-200 text-blue-700 rounded-sm text-[10px] font-black uppercase hover:bg-slate-300 transition-all active:scale-95"
          >
            Cancel Changes
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

export default EditProfile;
