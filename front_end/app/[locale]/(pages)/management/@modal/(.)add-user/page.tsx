'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddUserModal = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Cashier',
    branch: 'Main Branch',
    password: '',
    confirmPassword: ''
  });

  const roles = ['Admin', 'Manager', 'Cashier', 'Inventory', 'Supervisor'];
  const branches = ['Main Branch', 'Branch A', 'Branch B', 'Branch C'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    router.back();
  };

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-2">
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => router.back()}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-sm flex items-center justify-center text-xl font-black shadow-inner">
              👤
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-800 uppercase">Onboard New Personnel</h3>
              <p className="text-xs font-bold text-gray-400 uppercase">Configure credentials and access privileges</p>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 md:p-4 space-y-4 overflow-y-auto custom-scrollbar max-h-[75vh]">
          <form onSubmit={handleSubmit} id="add-user-form" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe"
                className="w-full px-4 py-4 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase">Email Address</label>
              <input 
                type="email" 
                placeholder="j.doe@company.com"
                className="w-full px-4 py-4 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase">Assigned Role</label>
              <select 
                className="w-full px-4 py-4 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase text-gray-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                {roles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase">Primary Branch</label>
              <select 
                className="w-full px-4 py-4 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase text-gray-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
              >
                {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase">Initial Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-4 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase text-gray-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 uppercase">Confirm Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-4 bg-slate-100 border border-slate-300 rounded-sm text-[11px] font-black uppercase text-gray-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </form>

          <div className="p-4 bg-blue-50/50 rounded-sm border border-blue-100 flex items-start space-x-4">
            <span className="text-xl">🛡️</span>
            <div>
              <h4 className="text-[11px] font-black text-blue-900 uppercase">Security Note</h4>
              <p className="text-[10px] font-bold text-blue-700/70 uppercase">
                New users will be required to change their password upon first login. Administrative privileges are subject to multi-factor authentication.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-gray-50 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-sm text-[10px] font-black uppercase hover:bg-gray-200 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-user-form"
            className="px-10 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase hover:bg-orange-600 transition-all active:scale-95"
          >
            Complete Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
