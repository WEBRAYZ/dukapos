'use client';

import React from 'react';

interface CommitChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommitChangesModal: React.FC<CommitChangesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pendingChanges = [
    { target: 'Global System', action: 'Update', parameter: 'API Limit', from: '1,000 req/sec', to: '1,500 req/sec' },
    { target: 'Infrastructure', action: 'Toggle', parameter: 'Auto-scaling', from: 'Disabled', to: 'Enabled' },
    { target: 'Global Env', action: 'Update', parameter: 'KRA_ETIMS_GATEWAY', from: 'Legacy URL', to: 'Production V2' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto custom-scrollbar">
      {/* Dimmed Background Overlay */}
      <div 
        className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight">Commit System Changes</h3>
            <p className="text-xs font-bold text-blue-200 uppercase mt-1">Review and deploy global configuration updates</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">💾</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-b border-blue-50 pb-2">Pending Orchestration Delta</h4>
             <div className="space-y-3 max-h-[30vh] overflow-y-auto no-scrollbar pr-2">
                {pendingChanges.map((change, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-blue-50 rounded-sm group hover:border-blue-200 transition-all">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-blue-900 uppercase">{change.target} · {change.parameter}</p>
                        <div className="flex items-center space-x-2 text-[9px] font-bold text-gray-500 uppercase">
                           <span>{change.from}</span>
                           <span className="text-blue-900">→</span>
                           <span className="text-blue-900">{change.to}</span>
                        </div>
                     </div>
                     <span className="px-2 py-1 bg-blue-100 text-blue-900 rounded text-[8px] font-black uppercase tracking-tighter">
                        {change.action}
                     </span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-sm border border-yellow-100 flex items-start space-x-3">
             <span className="text-xl">⚠️</span>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-yellow-900 uppercase">Infrastructure Warning</p>
                <p className="text-[9px] font-bold text-yellow-700 uppercase leading-relaxed">
                   Applying these changes will trigger a rolling restart of the application cluster. Expected downtime: ~15-30 seconds. System state will be synchronized across all regional edge nodes.
                </p>
             </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Cancel Update
            </button>
            <button className="flex-2 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              Deploy Changes →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitChangesModal;
