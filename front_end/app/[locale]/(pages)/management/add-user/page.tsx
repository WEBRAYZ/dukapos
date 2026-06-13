'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ManagementNavbar from '@/app/components/management/navbar';

const AddUserPage = () => {
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
    // Add logic to save user here
  };

  return (
    <div className="flex flex-col space-y-4">
      <ManagementNavbar activeTab="Users & Roles" onTabChange={() => {}} slim={true} />

      <div className="flex-1 p-4 md:p-6 lg:p-6 pt-0 md:pt-0 lg:pt-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Link href="/management" className="text-[10px] font-black text-blue-700 uppercase hover:text-blue-800 transition-colors flex items-center mb-2">
              ← Back to Directory
            </Link>
            <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase">Onboard New Personnel</h1>
            <p className="text-xs font-bold text-gray-700 uppercase">Configure credentials and access privileges for new team members</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="j.doe@company.com"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assigned Role</label>
                  <select 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    {roles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Branch</label>
                  <select 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  >
                    {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Password</label>
                  <input 
                    type="password" 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-200 text-orange-500 focus:ring-orange-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Send invitation email immediately</span>
                </div>
                <button type="submit" className="px-10 py-4 bg-orange-500 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 active:scale-95">
                  Complete Onboarding
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-6">
            <div className="bg-olive p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <span className="text-6xl">🛡️</span>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-orange-400 relative z-10">Role Security Level</h3>
              <div className="space-y-6 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">{formData.role} Permissions</p>
                  <ul className="space-y-2">
                    {['Access POS Terminal', 'View Own Sales', 'Process Returns'].map((perm, i) => (
                      <li key={i} className="flex items-center text-[9px] font-bold text-white/60">
                        <span className="mr-2 text-green-400">✓</span> {perm}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[9px] font-bold text-white/40 leading-relaxed italic">
                  * Note: Administrative roles require multi-factor authentication for sensitive operations.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-6">Onboarding Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile Setup</span>
                  <span className="text-[10px] font-black text-green-500">80%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div className="w-[80%] h-full bg-green-500" />
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-4">
                  The system will automatically generate a unique employee ID upon completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
