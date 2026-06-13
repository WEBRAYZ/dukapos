'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../shared/SidebarContext';
import BaseNavbar from '../shared/BaseNavbar';

const Navbar = () => {
  const pathname = usePathname();
  const { isDataEntryMode } = useSidebar();
  
  const getPageTitle = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1] || 'Dashboard';
    return lastSegment === 'pos' ? 'POS / Sales' : lastSegment;
  };

  const pageTitle = getPageTitle(pathname);

  const staffStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-green-400 leading-none">LIVE</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">Status</span>
      </div>
    </div>
  );

  return (
    <BaseNavbar 
      title="Staff Dashboard" 
      subtitle={`Performance Terminal › ${pageTitle}`} 
      icon="👤"
      stats={staffStats}
    >
      <div className="flex flex-col space-y-3 w-full">
        {/* Dashboard Navigation */}
        <div className="flex flex-col space-y-1 w-full text-left">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Primary Views</p>
          <button className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight hover:bg-blue-900/50 text-blue-200 hover:text-white">
            <span className="text-base leading-none w-6">🏠</span>
            <span>Home Overview</span>
          </button>
          <button className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight hover:bg-blue-900/50 text-blue-200 hover:text-white">
            <span className="text-base leading-none w-6">📈</span>
            <span>My Performance</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1 text-left">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Quick Actions</p>
          <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg">
            <span>➕ New Sale (POS)</span>
          </button>
          <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
            <span>📅 Request Leave</span>
          </button>
        </div>
      </div>
    </BaseNavbar>
  );
};

export default Navbar;
