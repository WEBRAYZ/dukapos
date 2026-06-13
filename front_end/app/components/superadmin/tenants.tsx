'use client';

import React, { useState, useEffect } from 'react';
import ProvisionTenantModal from './provision-tenant-modal';
import { api } from '@/lib/api';

const TenantsManagement = () => {
  const [filter, setFilter] = useState('All');
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [tenants, setTenants] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantsData, summaryData] = await Promise.all([
          api.get<any[]>('/tenants/'),
          api.get<any>('/superadmin/dashboard/summary/')
        ]);
        setTenants(tenantsData);
        setSummary(summaryData);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Global Tenants', value: summary?.totalTenants || '...', change: '↑ 0', meta: 'new businesses', color: 'text-blue-900', bg: 'bg-blue-50' },
    { label: 'Active Users', value: summary?.activeUsers || '...', change: 'Real-time', meta: 'retention rate', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Revenue (MTD)', value: summary?.revenueMtd || '...', change: '↑ 0%', meta: 'vs last month', color: 'text-olive', bg: 'bg-yellow-50' },
    { label: 'System Load', value: summary?.systemLoad || '...', change: 'Stable', meta: 'health metric', color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-blue-800 uppercase">Tenant <span className="text-blue-900">Ecosystem</span></h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase">Global business directory and subscription management</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-200 border border-blue-100 text-blue-800 hover:text-blue-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase transition-all shadow-sm">
            Export Data
          </button>
          <button 
            onClick={() => setIsProvisionModalOpen(true)}
            className="flex-1 md:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            + Provision Tenant
          </button>
        </div>
      </div>

      <ProvisionTenantModal isOpen={isProvisionModalOpen} onClose={() => setIsProvisionModalOpen(false)} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
            <p className="text-[10px] md:text-[10px] font-black text-gray-700 uppercase group-hover:text-blue-900 transition-colors relative z-10">{stat.label}</p>
            <p className={`text-xl md:text-2xl font-black ${stat.color} relative z-10`}>{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-700 uppercase mt-2 relative z-10">{stat.change} · {stat.meta}</p>
            <div className={`absolute -right-2 -bottom-2 w-16 h-16 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`} />
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-white p-3 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {['All', 'Enterprise', 'Professional', 'Starter', 'Pending'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                filter === f 
                  ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-lg shadow-blue-950/20' 
                  : 'bg-slate-100 text-blue-800 hover:text-blue-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-800">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search tenant name or owner…" 
            className="w-full pl-11 pr-4 py-3.5 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-blue-700 focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none transition-all placeholder:text-gray-300 shadow-inner"
          />
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-900 uppercase whitespace-nowrap">Organization Signature</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-900 uppercase whitespace-nowrap">Tier</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-900 uppercase hidden lg:table-cell">Resource Usage</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-900 uppercase text-center">Status</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-900 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tenants.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group cursor-default">
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 md:w-10 md:h-10 rounded-sm flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform ${t.color}`}>
                        {t.id.split('-')[1]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-800 uppercase">{t.name}</span>
                        <span className="text-[10px] font-bold text-gray-600 uppercase">{t.owner} · Since {t.since}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${
                      t.tier === 'Enterprise' ? 'bg-blue-900 text-white border-blue-900' : 
                      t.tier === 'Professional' ? 'bg-blue-50 text-blue-900 border-blue-100' : 
                      'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                      {t.tier}
                    </span>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3 hidden lg:table-cell">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-gray-800 uppercase">{t.storage} Stored</span>
                       <span className="text-[9px] font-bold text-gray-600 uppercase">{t.members} Active Members</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex justify-center">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
                        t.status === 'Active' ? 'bg-green-100 text-green-700 border-green-100' : 
                        t.status === 'Pending' ? 'bg-blue-100 text-blue-700 border-blue-100' :
                        'bg-red-100 text-red-700 border-red-100'
                      }`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'Pending' ? 'animate-pulse' : ''} bg-current`} />
                         <span className="text-[10px] font-black uppercase">{t.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="w-10 h-10 rounded-sm bg-slate-100 text-gray-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100">
                        <span className="text-lg">👁</span>
                      </button>
                      <button className="w-10 h-10 rounded-sm bg-slate-100 text-gray-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100">
                        <span className="text-lg">⚙</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 md:p-3 bg-gray-50 border-t border-blue-50 text-center">
           <p className="text-[9px] md:text-[10px] font-black text-gray-800 uppercase">
             Global Tenant Registry · Data Isolated SHA-256 · Secure multi-region storage active
           </p>
        </div>
      </div>
    </div>
  );
};

export default TenantsManagement;
