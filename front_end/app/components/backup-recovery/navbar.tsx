'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

/**
 * BackupRecoveryNavbar Component
 * 
 * Features:
 * - Backup & Recovery Title
 * - Grouped Navigation Dropdowns (Operations, Configuration, Monitoring)
 * - System Health Status (SYSTEMS NOMINAL)
 * - Quick Action Buttons
 */
interface BackupRecoveryNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BackupRecoveryNavbar: React.FC<BackupRecoveryNavbarProps> = ({ activeTab, onTabChange }) => {
  const navGroups = [
    {
      label: 'Operations',
      icon: '⚙️',
      items: [
        { label: 'Backup History', value: 'Backup History' },
        { label: 'Manual Backup', value: 'Manual Backup' },
        { label: 'Export Logs', value: 'Export Logs' },
      ]
    },
    {
      label: 'Configuration',
      icon: '🛠️',
      items: [
        { label: 'Scheduling', value: 'Scheduling' },
        { label: 'Retention Policy', value: 'Retention Policy' },
        { label: 'Destinations', value: 'Destinations' },
      ]
    },
    {
      label: 'Storage',
      icon: '💾',
      items: [
        { label: 'Storage Health', value: 'Storage Health' },
        { label: 'Integrity Check', value: 'Integrity Check' },
        { label: 'Cloud Sync', value: 'Cloud Sync' },
      ]
    }
  ];

  const backupStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className="text-[10px] font-black uppercase text-white/90 leading-none">SYSTEMS NOMINAL</span>
        <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter mt-1">Last check: 4m ago</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Backup & Recovery" 
      subtitle="Data Protection Hub" 
      icon="💾"
      stats={backupStats}
    >
      <div className="flex flex-col space-y-4 w-full">
        {navGroups.map((group) => (
          <div key={group.label} className="flex flex-col space-y-1 w-full">
            <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1 text-left flex items-center space-x-2">
              <span>{group.icon}</span>
              <span>{group.label}</span>
            </p>
            {group.items.map((item) => (
              <button
                key={item.label}
                onClick={() => onTabChange(item.value)}
                className={`flex items-center justify-between space-x-3 w-full px-4 py-2 rounded-sm transition-all text-[11px] font-black uppercase tracking-tight ${
                  activeTab === item.value 
                    ? 'bg-blue-800 text-white shadow-inner border-l-2 border-blue-400' 
                    : 'hover:bg-blue-900/50 text-blue-200 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1 text-left">Quick Actions</p>
          <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg">
            <span>🚀 Back Up Now</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>🔄 Restore System</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default BackupRecoveryNavbar;
