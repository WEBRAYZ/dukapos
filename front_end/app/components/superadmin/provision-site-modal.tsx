'use client';

import React from 'react';

interface ProvisionSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProvisionSiteModal: React.FC<ProvisionSiteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Background Overlay */}
      <div 
        className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight">Provision New Site</h3>
            <p className="text-xs font-bold text-blue-200 uppercase mt-1">Initialize global infrastructure deployment</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">🏢</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Site Name</label>
              <input 
                type="text" 
                placeholder="e.g. Nakuru Hub"
                className="w-full px-4 py-3 bg-slate-50 border border-blue-100 rounded-sm text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all shadow-inner uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Region / Cluster</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-blue-100 rounded-sm text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all shadow-inner uppercase cursor-pointer">
                <option>Nairobi Region</option>
                <option>Coast Region</option>
                <option>Rift Valley</option>
                <option>Lake Victoria</option>
                <option>Central Highlands</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Infrastructure Tier</label>
            <div className="grid grid-cols-3 gap-3">
              {['Edge Node', 'Regional Hub', 'Global Core'].map((tier) => (
                <button 
                  key={tier}
                  className={`px-4 py-4 rounded-sm border text-[10px] font-black uppercase transition-all ${
                    tier === 'Edge Node' ? 'bg-blue-900 text-white border-blue-900 shadow-lg' : 'bg-slate-50 text-gray-400 border-blue-50 hover:border-blue-200'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Initial Capacity</label>
            <div className="flex items-center space-x-4">
              <input 
                type="range" 
                className="flex-1 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-900"
              />
              <span className="text-xs font-black text-blue-900">50 Users</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button className="flex-2 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              Initialize Deployment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvisionSiteModal;
