'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

interface ReturnsRefundsNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewReturn?: () => void;
  slim?: boolean;
}

const ReturnsRefundsNavbar: React.FC<ReturnsRefundsNavbarProps> = ({ 
  activeTab, 
  onTabChange, 
  onNewReturn,
  slim 
}) => {
  const navItems = [
    { name: 'Returns Queue', icon: '📋' },
    { name: 'Exchange Workflow', icon: '🔄' },
    { name: 'Refunds & Credit Notes', icon: '💳' },
    { name: 'Inventory Restock', icon: '📦' }
  ];

  const returnsStats = (
    <div className="hidden lg:flex items-center space-x-6 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black">8</span>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter mt-1">Open Returns</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black text-orange-400">3</span>
          <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter mt-1">Pending</span>
        </div>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Returns & Refunds" 
      subtitle="Resolution Hub" 
      icon="↩"
      stats={returnsStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Resolution</p>
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
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Quick Actions</p>
          <button 
            onClick={onNewReturn}
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg"
          >
            <span>+ New Return</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default ReturnsRefundsNavbar;
