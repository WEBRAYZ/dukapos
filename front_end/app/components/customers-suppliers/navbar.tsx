'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

interface CustomersSuppliersNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  slim?: boolean;
}

const CustomersSuppliersNavbar: React.FC<CustomersSuppliersNavbarProps> = ({ activeTab, onTabChange, slim }) => {
  const navItems = [
    { name: 'Customers', icon: '👤', count: 248 },
    { name: 'Customer Details', icon: '📇', count: null },
    { name: 'Suppliers', icon: '🏭', count: 34 },
    { name: 'Supplier Details', icon: '📋', count: null },
  ];

  const customersStats = (
    <div className="hidden lg:flex items-center space-x-6 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black">248</span>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter mt-1">Customers</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black text-blue-400">34</span>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter mt-1">Suppliers</span>
        </div>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Relationships" 
      subtitle="Customers & Suppliers" 
      icon="🤝"
      stats={customersStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Directory</p>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onTabChange(item.name)}
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
              {item.count !== null && (
                <span className="bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md min-w-[16px] flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </BaseNavbar>
  );
};

export default CustomersSuppliersNavbar;
