'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

interface ProcurementNavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNewPO?: () => void;
}

const ProcurementNavbar: React.FC<ProcurementNavbarProps> = ({ activeTab, onTabChange, onNewPO }) => {
  const navItems = [
    { name: 'Purchase Orders', icon: '📋' },
    { name: 'Receive Delivery', icon: '🚚' },
    { name: 'Supplier Invoices', icon: '📄' },
    { name: 'Restock Overview', icon: '📦' },
  ];

  const procurementStats = (
    <div className="hidden lg:flex flex-col items-end border-r border-blue-700/50 pr-4">
      <span className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">Active Orders</span>
      <div className="flex items-center space-x-1">
        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
        <span className="text-xs font-black uppercase">12 Pending</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Procurement" 
      subtitle="Purchasing & Vendors" 
      icon="🛒"
      stats={procurementStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Supply Chain</p>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onTabChange?.(item.name)}
              className={`flex items-center justify-between space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight ${
                activeTab === item.name 
                  ? 'bg-blue-800 text-white shadow-inner border-l-2 border-blue-400' 
                  : 'hover:bg-blue-900/50 text-blue-200 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg leading-none w-6">{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Quick Actions</p>
          <button 
            onClick={onNewPO}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg"
          >
            <span>+ New Purchase Order</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default ProcurementNavbar;
