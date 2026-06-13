'use client';

import React from 'react';
import Link from 'next/link';
import BaseNavbar from '../shared/BaseNavbar';

interface ManagementNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  slim?: boolean;
}

const ManagementNavbar: React.FC<ManagementNavbarProps> = ({ activeTab, onTabChange, slim }) => {
  const navTabs = [
    { name: 'Users & Roles', icon: '👤' },
    { name: 'Branch Management', icon: '🏢' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Notifications', icon: '🔔', count: 5 },
    { name: 'Newsletter Manager', icon: '✉️' },
    { name: 'Audit Logs', icon: '📋' },
  ];

  const managementStats = (
    <div className="hidden lg:flex items-center space-x-6 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black">14</span>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter mt-1">Total Users</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black text-green-400">6</span>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter mt-1">Active Now</span>
        </div>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Management" 
      subtitle="System Administration" 
      icon="🛡️"
      stats={managementStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Administration</p>
          {navTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`flex items-center justify-between space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight ${
                activeTab === tab.name 
                  ? 'bg-blue-800 text-white shadow-inner border-l-2 border-blue-400' 
                  : 'hover:bg-blue-900/50 text-blue-200 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg leading-none w-6">{tab.icon}</span>
                <span>{tab.name}</span>
              </div>
              {tab.count !== undefined && (
                <span className="bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md min-w-[16px] flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Quick Actions</p>
          <Link href="/management/add-user" className="w-full">
            <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg">
              <span>+ Add New User</span>
            </button>
          </Link>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default ManagementNavbar;
