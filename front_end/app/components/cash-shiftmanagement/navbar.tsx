'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

/**
 * CashShiftNavbar Component
 * 
 * Features:
 * - Cash & Shift Management Title
 * - User Role & Institution Details
 * - Session Actions
 */
const CashShiftNavbar = () => {
  const cashStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-gray-100 leading-none uppercase">Bursar</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Kwame Boateng Academy</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Cash & Shift" 
      subtitle="Financial Control Center" 
      icon="🏦"
      stats={cashStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation / Actions */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1 text-left">Shift Operations</p>
          <button className="w-full px-4 py-2.5 bg-blue-800 text-white rounded-sm flex items-center space-x-3 transition-all text-xs font-black uppercase tracking-tight shadow-inner border-l-2 border-blue-400 text-left">
            <span className="text-base leading-none w-6">📊</span>
            <span>Shift Overview</span>
          </button>
          <button className="w-full px-4 py-2.5 hover:bg-blue-900/50 text-blue-200 hover:text-white rounded-sm flex items-center space-x-3 transition-all text-xs font-black uppercase tracking-tight text-left">
            <span className="text-base leading-none w-6">🧾</span>
            <span>Reconcile Cash</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1 text-left">Quick Actions</p>
          <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg">
            <span>💾 End Shift & Sync</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>🖨️ Print Report</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default CashShiftNavbar;
