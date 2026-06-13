'use client';

import React, { useState } from 'react';
import ProvisionSiteModal from './provision-site-modal';
import ManageSiteModal from './manage-site-modal';
import SiteLogsModal from './site-logs-modal';

const BranchesManagement = () => {
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  
  const stats = [
    { label: 'Total Branches', value: '42', sub: 'Across 8 regions', color: 'text-gray-800' },
    { label: 'Active Now', value: '38', sub: '4 scheduled maintenance', color: 'text-green-600' },
    { label: 'System Sync', value: '99.8%', sub: 'Healthy latency', color: 'text-blue-900' },
    { label: 'Attention', value: '2', sub: 'Connectivity issues', color: 'text-red-500' },
  ];

  const branches = [
    { id: 'BR-NBI-01', name: 'Nairobi Central', region: 'Nairobi', status: 'Online', users: 12, health: '98%', color: 'bg-blue-100 text-blue-900' },
    { id: 'BR-MSA-01', name: 'Mombasa Port', region: 'Coast', status: 'Online', users: 8, health: '96%', color: 'bg-orange-100 text-orange-700' },
    { id: 'BR-KSM-01', name: 'Kisumu Hub', region: 'Lake Victoria', status: 'Offline', users: 0, health: '0%', color: 'bg-red-50 text-red-600' },
    { id: 'BR-ELD-01', name: 'Eldoret North', region: 'Rift Valley', status: 'Maintenance', users: 2, health: '45%', color: 'bg-gray-100 text-gray-500' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-black text-blue-800 uppercase">Global <span className="text-blue-900">Branches</span></h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase">Manage physical site deployments and regional connectivity</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-300 border border-blue-100 text-blue-800 hover:text-gray-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase transition-all shadow-sm active:scale-95">
            Regional Map
          </button>
          <button 
            onClick={() => setIsProvisionModalOpen(true)}
            className="flex-1 md:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            + Provision Site
          </button>
        </div>
      </div>

      <ProvisionSiteModal isOpen={isProvisionModalOpen} onClose={() => setIsProvisionModalOpen(false)} />
      <ManageSiteModal 
        isOpen={isManageModalOpen} 
        onClose={() => setIsManageModalOpen(false)} 
        site={selectedSite}
      />
      <SiteLogsModal 
        isOpen={isLogsModalOpen} 
        onClose={() => setIsLogsModalOpen(false)} 
        site={selectedSite}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center group hover:shadow-xl transition-all cursor-default">
            <p className="text-[9px] md:text-[10px] font-black text-gray-700 uppercase group-hover:text-blue-900 transition-colors">{stat.label}</p>
            <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-600 uppercase">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-3">
        {branches.map((br) => (
          <div key={br.id} className="bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden hover:shadow-2xl transition-all group relative">
             <div className="p-3 md:p-3 pb-3 flex items-start justify-between border-b border-blue-50">
                <div className="space-y-1">
                   <h4 className="text-sm font-black text-blue-800 uppercase">{br.name}</h4>
                   <p className="text-[10px] font-bold text-gray-600 uppercase">{br.region}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${
                  br.status === 'Online' ? 'bg-green-100 text-green-700 border-green-100' : 
                  br.status === 'Offline' ? 'bg-red-100 text-red-700 border-red-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                }`}>
                  {br.status}
                </div>
             </div>
             
             <div className="p-3 md:p-3 space-y-3 flex-1">
                <div className="flex justify-between items-center text-[11px] font-black uppercase">
                   <span className="text-gray-700">Health Index</span>
                   <span className={br.health === '0%' ? 'text-red-500' : 'text-blue-900'}>{br.health}</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden border border-blue-50">
                   <div className={`h-full ${br.status === 'Online' ? 'bg-blue-900 shadow-lg shadow-blue-200' : 'bg-gray-300'} transition-all duration-1000 origin-left`} style={{ width: br.health }} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-700 uppercase">Active Users</p>
                      <p className="text-xs font-black text-blue-800">{br.users}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[9px] font-black text-gray-700 uppercase">Site ID</p>
                      <p className="text-[10px] font-bold text-blue-900 uppercase truncate">{br.id}</p>
                   </div>
                </div>
             </div>

             <div className="p-5 bg-gray-50/50 flex gap-3">
                <button 
                  onClick={() => {
                    setSelectedSite(br);
                    setIsLogsModalOpen(true);
                  }}
                  className="flex-1 py-3 bg-slate-300 border border-blue-100 rounded-sm text-[9px] font-black text-slate-800 uppercase hover:text-blue-900 transition-all shadow-sm active:scale-95"
                >
                   Logs
                </button>
                <button 
                  onClick={() => {
                    setSelectedSite(br);
                    setIsManageModalOpen(true);
                  }}
                  className="flex-2 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[9px] font-black uppercase shadow-lg shadow-blue-950/20 hover:bg-blue-800 transition-all active:scale-95"
                >
                   Manage Site
                </button>
             </div>
             
             <div className={`absolute -right-2 -bottom-2 w-12 h-12 ${br.color.split(' ')[0]} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
          </div>
        ))}
      </div>

      {/* Sync Status Registry */}
      <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden relative group">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-4 max-w-2xl">
               <h3 className="text-sm font-black uppercase text-blue-800">Operational Integrity Sync</h3>
               <p className="text-[10px] md:text-xs font-medium text-gray-700 uppercase">All regional branch nodes are currently synchronized with the global state machine. Encryption SHA-256 is enforced across all edge tunnels.</p>
               <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center space-x-2.5">
                     <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-200" />
                     <span className="text-[10px] font-black uppercase">Nairobi Core: 12ms</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                     <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-200" />
                     <span className="text-[10px] font-black uppercase">Mombasa Edge: 18ms</span>
                  </div>
               </div>
            </div>
            <button className="shrink-0 px-10 py-5 bg-blue-50 text-blue-900 border border-blue-100 rounded-sm text-[10px] font-black uppercase hover:bg-blue-900 hover:text-white transition-all shadow-md active:scale-95">
               Refresh Topology
            </button>
         </div>
      </div>
    </div>
  );
};

export default BranchesManagement;
