'use client';

import React from 'react';
import Image from 'next/image';
import BaseNavbar from '../shared/BaseNavbar';

interface POSNavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  slim?: boolean;
}

const POSNavbar: React.FC<POSNavbarProps> = ({ currentView, onViewChange, slim }) => {
  const navItems = [
    { label: 'POS Screen', icon: '⊕' },
    { label: 'Checkout', icon: '💳' },
    { label: 'Sales History', icon: '📋' },
    { label: 'Return Sales', icon: '↩' },
    { label: 'Receipts', icon: '🧾' },
  ];

  if (slim) {
    return (
      <div className="flex items-center space-x-1 py-2 bg-blue-900/50 px-4 rounded-sm border border-blue-800/50">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onViewChange(item.label)}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-xs transition-all text-[10px] font-black uppercase tracking-tight ${
              currentView === item.label 
                ? 'bg-blue-100 text-blue-900 shadow-sm' 
                : 'hover:bg-white/10 text-white/70'
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <BaseNavbar 
      title="Sales & POS" 
      subtitle="Terminal Hub" 
      icon="S"
    >
      <div className="flex flex-col space-y-1 w-full">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onViewChange(item.label)}
            className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight ${
              currentView === item.label 
                ? 'bg-blue-800 text-white shadow-inner border-l-2 border-blue-400' 
                : 'hover:bg-blue-900/50 text-blue-200 hover:text-white'
            }`}
          >
            <span className="text-xl leading-none w-6">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </BaseNavbar>
  );
};

export default POSNavbar;
