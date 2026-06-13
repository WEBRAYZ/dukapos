'use client';

import React, { useState } from 'react';
import CommitChangesModal from './commit-changes-modal';

const SettingsManagement = () => {
  const [activeGroup, setActiveGroup] = useState('Global System');
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);

  const settings = [
    { group: 'Global System', items: [
      { label: 'System Maintenance', value: 'Disabled', type: 'Toggle', status: 'Off' },
      { label: 'Public Registration', value: 'Invite Only', type: 'Select' },
      { label: 'Global API Limit', value: '1,000 req/sec', type: 'Input' },
      { label: 'Default Storage', value: '10 GB / tenant', type: 'Input' },
    ]},
    { group: 'Infrastructure', items: [
      { label: 'Auto-scaling', value: 'Enabled', type: 'Toggle', status: 'On' },
      { label: 'Region Redundancy', value: 'Multi-region', type: 'Badge' },
      { label: 'CDN Edge Cache', value: '4h TTL', type: 'Input' },
    ]},
  ];

  const envVariables = [
    { key: 'KRA_ETIMS_GATEWAY', value: 'https://etims.kra.go.ke/v2', visibility: 'Encrypted' },
    { key: 'MASTER_HSM_PORT', value: '8443', visibility: 'Internal' },
    { key: 'GLOBAL_AUDIT_DUR', value: '730 Days', visibility: 'Public' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-4 md:space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-2xl font-black text-blue-800 uppercase">System <span className="text-blue-900">Config</span></h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">Global environment variables and infrastructure orchestration</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-3 py-3 bg-linear-to-r from-slate-200 to-gray-200 border border-blue-100 text-blue-800 hover:text-gray-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95">
            Reset to Default
          </button>
          <button 
            onClick={() => setIsCommitModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-3 bg-linear-to-r from-blue-800 to-blue-950 border border-blue-100 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Commit Changes
          </button>
        </div>
      </div>

      <CommitChangesModal isOpen={isCommitModalOpen} onClose={() => setIsCommitModalOpen(false)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Settings Navigation & Main Area */}
        <div className="lg:col-span-2 space-y-3 md:space-y-3">
           {settings.map((group) => (
             <div key={group.group} className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-blue-50 pb-3">
                   <h3 className="text-sm font-black text-blue-800 uppercase">{group.group}</h3>
                   <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 uppercase">{group.items.length} Controls</span>
                </div>
                
                <div className="space-y-3">
                   {group.items.map((item) => (
                     <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="space-y-1">
                           <p className="text-[11px] font-black text-blue-900 uppercase group-hover:text-blue-900 transition-colors">{item.label}</p>
                           <p className="text-[9px] font-bold text-gray-700 uppercase">System-wide configuration parameter</p>
                        </div>
                        <div className="flex items-center justify-start sm:justify-end min-w-[200px]">
                           {item.type === 'Toggle' ? (
                             <button className={`w-14 h-7 rounded-full transition-all relative p-1 ${item.status === 'On' ? 'bg-blue-900' : 'bg-gray-200'}`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${item.status === 'On' ? 'translate-x-7' : 'translate-x-0'}`} />
                             </button>
                           ) : item.type === 'Select' ? (
                             <select className="bg-gray-50 border border-blue-100 rounded-sm px-4 py-2 text-[10px] font-black uppercase text-gray-700 outline-none focus:ring-1 focus:ring-blue-900">
                                <option>{item.value}</option>
                             </select>
                           ) : (
                             <input 
                               type="text" 
                               value={item.value}
                               readOnly
                               className="bg-blue-50 border border-blue-100 rounded-sm px-4 py-2 text-[10px] font-black uppercase text-gray-700 w-full sm:w-40 text-left sm:text-right focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none"
                             />
                           )}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>

        {/* Right Sidebar: Environment Variables */}
        <div className="space-y-3 md:space-y-3">
           <div className="bg-white p-3 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-blue-50">
                 <h3 className="text-sm font-black text-gray-800 uppercase">Global Env</h3>
                 <button className="text-[10px] font-black text-blue-900 uppercase hover:underline">+ New Key</button>
              </div>
              
              <div className="space-y-2 flex-1">
                {envVariables.map((env) => (
                  <div key={env.key} className="space-y-2 group">
                     <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-gray-800 uppercase truncate max-w-[150px]">{env.key}</span>
                        <span className={`px-2 py-1 rounded text-[8px] font-black uppercase ${
                          env.visibility === 'Encrypted' ? 'bg-blue-900 text-white shadow-lg shadow-blue-950/20' : 'bg-gray-100 text-gray-500'
                        }`}>{env.visibility}</span>
                     </div>
                     <div className="relative">
                        <input 
                          type={env.visibility === 'Encrypted' ? 'password' : 'text'}
                          value={env.value}
                          readOnly
                          className="w-full bg-gray-50 border border-blue-50 rounded-sm px-3 py-2 text-[10px] font-bold text-gray-600 outline-none"
                        />
                      </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-50">
                 <p className="text-[10px] font-bold text-gray-700 uppercase italic text-center">
                    All environment changes require a global system restart to take effect.
                 </p>
              </div>
           </div>

           <div className="bg-blue-900 p-3 md:p-4 rounded-sm md:rounded-sm shadow-sm text-white relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-sm font-black uppercase mb-2 text-blue-200">System Pulse</h3>
                 <p className="text-[10px] font-bold text-blue-300 uppercase mb-3">Infrastructure integrity is <span className="text-white font-black">Verified</span>. All global nodes are synchronized with the primary state machine.</p>
                 <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                    <span className="text-[9px] font-black uppercase">Protocol: Active</span>
                 </div>
              </div>
              <div className="absolute right-0 bottom-0 p-8 opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-1000">
                 <span className="text-8xl">⚙️</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
