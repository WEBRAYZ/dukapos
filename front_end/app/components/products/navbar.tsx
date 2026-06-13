'use client';

import React from 'react';
import BaseNavbar from '../shared/BaseNavbar';

interface ProductsNavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  slim?: boolean;
}

const ProductsNavbar: React.FC<ProductsNavbarProps> = ({ currentView, onViewChange, slim }) => {
  const navItems = [
    { label: 'Products List', icon: '☰' },
    { label: 'Add / Edit', icon: '+' },
    { label: 'Categories', icon: '⊞' },
    { label: 'Barcode Manager', icon: '▌▌' },
  ];

  if (slim) {
    return (
      <div className="flex items-center space-x-1 py-2 bg-blue-900/50 px-4 rounded-sm border border-blue-800/50 shrink-0">
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

  const productsStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-gray-100 leading-none">12</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Products</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-blue-400 leading-none">1</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Out of Stock</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Products" 
      subtitle="Inventory Hub" 
      icon="Rx"
      stats={productsStats}
    >
      {/* Navigation Items - Rendered inside Actions dropdown */}
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
            <span className="text-lg leading-none w-6">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </BaseNavbar>
  );
};

export default ProductsNavbar;
