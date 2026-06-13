'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

interface ReportsNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewReport?: () => void;
  slim?: boolean;
}

const ReportsNavbar: React.FC<ReportsNavbarProps> = ({ activeTab, onTabChange, onNewReport }) => {
  const navTabs = [
    { name: 'Sales Reports', icon: '📈' },
    { name: 'Profit Reports', icon: '💰' },
    { name: 'Inventory Reports', icon: '📦' },
    { name: 'Cashier Reports', icon: '👤' },
    { name: 'Financial Reports', icon: '📉' },
    { name: 'Export Reports', icon: '📊' },
  ];

  const reportStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-gray-100 leading-none">12</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Generated Today</span>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-blue-400 leading-none">4</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Scheduled</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Reports" 
      subtitle={`Analytics › ${activeTab}`} 
      icon="📊"
      stats={reportStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full text-left">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Report Categories</p>
          {navTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight ${
                activeTab === tab.name 
                  ? 'bg-blue-800 text-white shadow-inner border-l-2 border-blue-400' 
                  : 'hover:bg-blue-900/50 text-blue-200 hover:text-white'
              }`}
            >
              <span className="text-base leading-none w-6">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1 text-left">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Quick Actions</p>
          <button 
            onClick={onNewReport}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg"
          >
            <span>+ Generate New Report</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>📅 May 1 – May 31, 2026</span>
          </button>
          <button className="w-full px-4 py-2.5 hover:bg-white/10 text-white/70 hover:text-white rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase mt-1">
            <span>⬇ Export current view</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default ReportsNavbar;
