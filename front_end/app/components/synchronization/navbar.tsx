'use client';

import React, { useState } from 'react';
import BaseNavbar from '../shared/BaseNavbar';

/**
 * SynchronizationNavbar Component
 * 
 * Features:
 * - Synchronization Title
 * - Sync Engine details
 * - Offline simulation
 * - Manual sync trigger
 */
const SynchronizationNavbar = () => {
  const [isOffline, setIsOffline] = useState(false);

  const syncStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className={`text-xs font-black leading-none ${isOffline ? 'text-red-400' : 'text-green-400'}`}>
          {isOffline ? 'OFFLINE' : 'SYNCHRONIZED'}
        </span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Status</span>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-blue-400 leading-none">2m ago</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Last Full Sync</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Sync Engine" 
      subtitle="Distributed Ledger Hub" 
      icon="S"
      stats={syncStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Sync Operations */}
        <div className="flex flex-col space-y-1 w-full text-left">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Data Pipeline</p>
          <button
            disabled={isOffline}
            className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight hover:bg-blue-900/50 text-blue-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-base leading-none w-6">↑</span>
            <span>Force Push Sync</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight hover:bg-blue-900/50 text-blue-200 hover:text-white">
            <span className="text-base leading-none w-6">📋</span>
            <span>View Sync Audit</span>
          </button>
        </div>

        {/* Maintenance Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1 text-left">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">System Controls</p>
          <button 
            onClick={() => setIsOffline(!isOffline)}
            className={`w-full px-4 py-2.5 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg ${
              isOffline ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <span>{isOffline ? '🔌 Restore Connection' : '📵 Simulate Offline'}</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>🗑️ Clear Sync Buffer</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default SynchronizationNavbar;
