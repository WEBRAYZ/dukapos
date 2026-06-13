'use client';

import React, { useState, useEffect } from 'react';
import BaseNavbar from '../shared/BaseNavbar';
import AddDevice from './adddevice';

/**
 * DeviceManagementNavbar Component
 * 
 * Features:
 * - Device Management Title
 * - POS Terminal status
 * - Add Device action
 * - Scan All action
 */
const DeviceManagementNavbar = () => {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);

  useEffect(() => {
    if (isAddDeviceOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAddDeviceOpen]);

  const deviceStats = (
    <div className="hidden lg:flex items-center space-x-4 border-r border-blue-700/50 pr-4">
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-gray-100 leading-none">3 / 6</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">POS Terminals Online</span>
      </div>
      <div className="flex flex-col items-end text-right">
        <span className="text-xs font-black text-blue-400 leading-none">OPERATIONAL</span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter mt-1">System Status</span>
      </div>
    </div>
  );

  return (
    <>
      <BaseNavbar 
        title="Devices" 
        subtitle="Hardware Management" 
        icon="⌨️"
        stats={deviceStats}
      >
        <div className="flex flex-col space-y-3 w-full">
          {/* Device Actions */}
          <div className="flex flex-col space-y-1 w-full text-left">
            <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-4 pb-1">Hardware Controls</p>
            <button
              onClick={() => setIsAddDeviceOpen(true)}
              className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight hover:bg-blue-900/50 text-blue-200 hover:text-white"
            >
              <span className="text-base leading-none w-6">⊕</span>
              <span>Register New Device</span>
            </button>
            <button className="flex items-center space-x-3 w-full px-4 py-2.5 rounded-sm transition-all text-xs font-black uppercase tracking-tight hover:bg-blue-900/50 text-blue-200 hover:text-white">
              <span className="text-base leading-none w-6">↺</span>
              <span>Scan Network Terminals</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col space-y-1 w-full border-t border-blue-900/50 pt-2 px-1 text-left">
            <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest px-3 pb-1">Maintenance</p>
            <button className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase shadow-lg">
              <span>📊 Download Usage Logs</span>
            </button>
            <button className="w-full px-4 py-2.5 bg-blue-900/40 hover:bg-blue-800 rounded-sm flex items-center justify-center space-x-2 transition-all text-[10px] font-black uppercase border border-blue-800">
              <span>🔒 Remote Lock All</span>
            </button>
          </div>
        </div>
      </BaseNavbar>
      <AddDevice isOpen={isAddDeviceOpen} onClose={() => setIsAddDeviceOpen(false)} />
    </>
  );
};

export default DeviceManagementNavbar;
