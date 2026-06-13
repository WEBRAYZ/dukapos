'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

/**
 * AuditLogsNavbar Component
 * 
 * Features:
 * - Audit Logs Title
 * - Live Stream Status
 * - Events Today Counter
 * - Grouped Navigation & Actions
 */
interface AuditLogsNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AuditLogsNavbar: React.FC<AuditLogsNavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { name: 'System Logs', icon: '🖥️' },
    { name: 'User Activities', icon: '👤' },
    { name: 'Security Events', icon: '🛡️' },
    { name: 'API Access', icon: '🔑' }
  ];

  const auditStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-gray-100 leading-none">20</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Events Today</span>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-blue-400 leading-none">2m ago</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Last Activity</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Audit Logs" 
      subtitle="Live System Stream" 
      icon="📜"
      stats={auditStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1 text-left">Log Categories</p>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight ${
                activeTab === tab.name 
                  ? 'bg-blue-800 text-white shadow-inner border-l-2 border-blue-400 text-left' 
                  : 'hover:bg-blue-900/50 text-blue-200 hover:text-white text-left'
              }`}
            >
              <span className="text-base leading-none w-6">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1 text-left">Export & Maintenance</p>
          <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg">
            <span>📊 Export Logs (JSON)</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>📁 Export Logs (CSV)</span>
          </button>
          <button className="w-full px-4 py-2.5 hover:bg-red-900/20 text-red-400 hover:text-red-300 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase mt-1">
            <span>🗑️ Clear Stream</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default AuditLogsNavbar;
