'use client';

import React from 'react';

/**
 * Synchronization Conflicts Component
 * 
 * Handles resolution of data discrepancies between local and server records.
 */
const SynchronizationConflicts = () => {
  const conflicts = [
    {
      id: 'CNF-201',
      time: '8m ago',
      entity: 'SKU-44821 — Maize Flour 2kg',
      field: 'Unit Price',
      local: 'KES 180.00',
      server: 'KES 175.00',
    },
    {
      id: 'CNF-200',
      time: '34m ago',
      entity: 'SKU-10293 — Sugar 1kg',
      field: 'Stock Qty',
      local: '142 units',
      server: '139 units',
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Warning Header */}
      <div className="bg-brown/10 border border-purple-100 p-4 rounded-2xl flex items-start space-x-4">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-brown shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-black text-purple-900 uppercase tracking-tight">
            2 data conflicts detected between local and server records.
          </p>
          <p className="text-[10px] font-bold text-purple-700/70 uppercase tracking-widest mt-1">
            Choose which version to keep to resume synchronization.
          </p>
        </div>
      </div>

      {/* Conflict Items */}
      <div className="space-y-4">
        {conflicts.map((conflict) => (
          <div key={conflict.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
            {/* Item Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-brown bg-brown/10 px-2 py-0.5 rounded-full uppercase">
                    {conflict.id}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    · {conflict.time}
                  </span>
                </div>
                <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight">
                  {conflict.entity}
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <span className="mr-1 opacity-50">Field:</span>
                  <span className="text-olive">{conflict.field}</span>
                </p>
              </div>
              <button className="text-gray-300 hover:text-gray-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Resolution Options */}
            <div className="grid grid-cols-2 gap-4">
              {/* Local Version */}
              <button className="group relative flex flex-col p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-olive transition-all text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Keep Local</span>
                  <span className="w-4 h-4 rounded-full border border-gray-200 group-hover:border-olive group-hover:bg-olive transition-all flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100"></span>
                  </span>
                </div>
                <p className="text-lg font-black text-gray-800 tracking-tight">{conflict.local}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1 italic">Last modified on this device</p>
              </button>

              {/* Server Version */}
              <button className="group relative flex flex-col p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-olive transition-all text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Keep Server</span>
                  <span className="w-4 h-4 rounded-full border border-gray-200 group-hover:border-olive group-hover:bg-olive transition-all flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100"></span>
                  </span>
                </div>
                <p className="text-lg font-black text-olive tracking-tight">{conflict.server}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1 italic">Last sync from cloud</p>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center p-4">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.2em]">
          All resolutions are logged and irreversible
        </p>
      </div>
    </div>
  );
};

export default SynchronizationConflicts;
