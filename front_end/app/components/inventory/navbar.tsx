'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BaseNavbar from '../shared/BaseNavbar';

interface InventoryNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  slim?: boolean;
}

const InventoryNavbar: React.FC<InventoryNavbarProps> = ({ activeTab, onTabChange, slim }) => {
  const router = useRouter();

  const navTabs = [
    { name: 'Overview', count: '248' },
    { name: 'Stock Adjustments', count: null },
    { name: 'Movement History', count: '1.2k' },
    { name: 'Low Stock Alerts', count: '6' },
  ];

  const inventoryStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-gray-100 leading-none">248</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">SKUs</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-orange-400 leading-none">6</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Low Stock</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Inventory" 
      subtitle="Stock Management" 
      icon="📦"
      stats={inventoryStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Navigation</p>
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
              <span>{tab.name}</span>
              {tab.count && (
                <span className="bg-black/20 px-1.5 py-0.5 rounded-full text-[8px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Quick Actions</p>
          <button 
            onClick={() => router.push('/pos')}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg"
          >
            <span>← POS Terminal</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>📊 Export Data</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default InventoryNavbar;
