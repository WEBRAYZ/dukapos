'use client';

import React from 'react';

interface LockdownSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LockdownSystemModal: React.FC<LockdownSystemModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto custom-scrollbar">
      {/* Dimmed Background Overlay */}
      <div 
        className="fixed inset-0 bg-red-950/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-red-100 overflow-hidden relative z-10 animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="bg-linear-to-l from-red-800 to-red-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight">System Lockdown Protocol</h3>
            <p className="text-xs font-bold text-red-200 uppercase mt-1">Emergency infrastructure isolation command</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">🚨</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-red-50 p-6 rounded-sm border border-red-100 space-y-3">
             <div className="flex items-center space-x-3">
                <span className="text-2xl">⚠️</span>
                <h4 className="text-sm font-black text-red-900 uppercase">Critical Action Required</h4>
             </div>
             <p className="text-[10px] font-bold text-red-700 uppercase leading-relaxed">
                Initiating a lockdown will immediately terminate all active tenant sessions, revoke global API access, and place the database in read-only mode. This action is logged and reported to the system architect.
             </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Reason for Lockdown</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-red-100 rounded-sm text-xs font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 transition-all shadow-inner uppercase cursor-pointer">
                <option>Suspected Security Breach</option>
                <option>Active DDoS Attack</option>
                <option>Critical Data Leak</option>
                <option>Emergency Infrastructure Maintenance</option>
                <option>Other / Unspecified Threat</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Verification Code</label>
              <input 
                type="text" 
                placeholder="Enter RSA Token or Master Key"
                className="w-full px-4 py-3 bg-slate-50 border border-red-100 rounded-sm text-xs font-black text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-800/20 transition-all shadow-inner uppercase"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Abort Command
            </button>
            <button className="flex-2 py-4 bg-linear-to-l from-red-700 to-red-950 text-white rounded-sm text-[10px] font-black uppercase shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              Execute Global Lockdown →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockdownSystemModal;
