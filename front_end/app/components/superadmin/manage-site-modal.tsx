'use client';

import React from 'react';

interface ManageSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: {
    id: string;
    name: string;
    region: string;
    status: string;
    users: number;
    health: string;
  } | null;
}

const ManageSiteModal: React.FC<ManageSiteModalProps> = ({ isOpen, onClose, site }) => {
  if (!isOpen || !site) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Background Overlay */}
      <div 
        className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                  site.status === 'Online' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                  site.status === 'Offline' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                }`}>
                  {site.status}
                </span>
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Site ID: {site.id}</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight">{site.name} Control Panel</h3>
            <p className="text-xs font-bold text-blue-200 uppercase mt-1">Regional Node Infrastructure Management</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">⚙️</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-blue-50">
               <p className="text-[9px] font-black text-blue-900 uppercase mb-1">Health Index</p>
               <p className="text-xl font-black text-blue-800">{site.health}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-blue-50">
               <p className="text-[9px] font-black text-blue-900 uppercase mb-1">Active Users</p>
               <p className="text-xl font-black text-blue-800">{site.users}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-blue-50">
               <p className="text-[9px] font-black text-blue-900 uppercase mb-1">Region</p>
               <p className="text-xs font-black text-blue-800 truncate">{site.region}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Site Operations</h4>
            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center space-x-3 p-4 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 transition-all group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📉</div>
                  <div className="text-left">
                     <p className="text-[10px] font-black text-gray-800 uppercase">Traffic Logs</p>
                     <p className="text-[9px] font-bold text-gray-400 uppercase">View site bandwidth</p>
                  </div>
               </button>
               <button className="flex items-center space-x-3 p-4 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 transition-all group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🔄</div>
                  <div className="text-left">
                     <p className="text-[10px] font-black text-gray-800 uppercase">Restart Node</p>
                     <p className="text-[9px] font-bold text-gray-400 uppercase">Reboot site gateway</p>
                  </div>
               </button>
               <button className="flex items-center space-x-3 p-4 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 transition-all group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🔐</div>
                  <div className="text-left">
                     <p className="text-[10px] font-black text-gray-800 uppercase">Auth Tokens</p>
                     <p className="text-[9px] font-bold text-gray-400 uppercase">Rotate site keys</p>
                  </div>
               </button>
               <button className="flex items-center space-x-3 p-4 bg-white border border-blue-100 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all group">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">⚠️</div>
                  <div className="text-left">
                     <p className="text-[10px] font-black text-red-800 uppercase">Decommission</p>
                     <p className="text-[9px] font-bold text-red-400 uppercase">Offboard this site</p>
                  </div>
               </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Close Panel
            </button>
            <button className="flex-1 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSiteModal;
