'use client';

import React, { useState } from 'react';

const UsersManagement = () => {
  const [filter, setFilter] = useState('All');

  const stats = [
    { label: 'Global Admins', value: '4', change: 'Root Access', color: 'text-blue-900', bg: 'bg-blue-50' },
    { label: 'Tenant Admins', value: '124', change: 'Business Level', color: 'text-gray-800', bg: 'bg-gray-50' },
    { label: 'Total Accounts', value: '1,842', change: 'System Wide', color: 'text-gray-800', bg: 'bg-gray-50' },
    { label: 'Banned', value: '3', change: 'Security Risk', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const users = [
    { initials: 'SK', name: 'Sarah Kimani', email: 's.kimani@ndukapos.com', role: 'Root Admin', status: 'Active', color: 'bg-pink-100 text-pink-600' },
    { initials: 'DO', name: 'David Omari', email: 'd.omari@ndukapos.com', role: 'Security Ops', status: 'Active', color: 'bg-blue-100 text-blue-600' },
    { initials: 'ML', name: 'Musa Lin', email: 'm.lin@support.io', role: 'Support Tier 3', status: 'Active', color: 'bg-green-100 text-green-600' },
    { initials: 'RT', name: 'Rina Tano', email: 'r.tano@ndukapos.com', role: 'Billing', status: 'Offline', color: 'bg-purple-100 text-purple-600' },
    { initials: 'AM', name: 'Anna Mwangi', email: 'a.mwangi@audit.co.ke', role: 'External Auditor', status: 'Disabled', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-black text-blue-800 uppercase">Access <span className="text-blue-900">Control</span></h2>
          <p className="text-[11px] md:text-xs font-bold text-gray-700 uppercase">Manage global system administrators and privileges</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-300 border border-blue-100 text-blue-800 hover:text-gray-800 rounded-sm font-black text-[10px] md:text-[10px] uppercase transition-all shadow-sm active:scale-95 flex items-center justify-center">
            Security Log
          </button>
          <button className="flex-1 md:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[10px] md:text-[10px] uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center">
            + New Admin
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
            <p className="text-[10px] md:text-[10px] font-black text-gray-700 uppercase group-hover:text-blue-900 transition-colors relative z-10">{stat.label}</p>
            <p className={`text-xl md:text-2xl font-black ${stat.color} relative z-10`}>{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-700 uppercase relative z-10">{stat.change}</p>
            <div className={`absolute -right-2 -bottom-2 w-16 h-16 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`} />
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex p-1.5 gap-4 overflow-x-auto no-scrollbar">
          {['All', 'Root', 'Security', 'Billing', 'Support'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                filter === f 
                  ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-lg shadow-blue-950/20' 
                  : 'bg-slate-200 text-blue-800 hover:text-blue-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-800">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search identity or email…" 
            className="w-full pl-11 pr-4 py-3.5 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-700 focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none transition-all placeholder:text-gray-300 shadow-inner"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase whitespace-nowrap">Identity Signature</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase whitespace-nowrap">Access Layer</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Status</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group cursor-default">
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 md:w-10 md:h-10 rounded-sm flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform ${user.color}`}>
                        {user.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-800 uppercase">{user.name}</span>
                        <span className="text-[11px] font-bold text-gray-700 lowercase">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <span className={`px-4 py-2 rounded-sm text-[9px] font-black uppercase border ${
                      user.role.includes('Root') ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white border-blue-900' : 'bg-slate-100 text-blue-800 border-blue-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex justify-center">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                         <span className="w-1.5 h-1.5 rounded-full bg-current" />
                         <span className="text-[9px] font-black uppercase">{user.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="w-7 h-7 rounded-sm bg-gray-100 text-gray-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-blue-100 hover:border-blue-100">
                        <span className="text-lg">✏</span>
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-600 rounded-sm text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm">
                        Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 md:p-3 bg-slate-100 border-t border-blue-50 text-center">
           <p className="text-[10px] md:text-[10px] font-black text-gray-700 uppercase">
             Global Access Registry · Encryption SHA-256 enabled · Immutable audit trail active
           </p>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
