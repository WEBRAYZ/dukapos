'use client';

import React, { useState } from 'react';
import DeviceManagementNavbar from '@/app/components/devicemanagement/navbar';

const DeviceManagementPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const stats = [
    { label: 'Total Hardware', count: 6, color: 'text-gray-800' },
    { label: 'Online', count: 3, color: 'text-green-600' },
    { label: 'Idle', count: 1, color: 'text-orange-500' },
    { label: 'Attention', count: 1, color: 'text-red-600' },
    { label: 'Offline', count: 1, color: 'text-gray-400' },
  ];

  const devices = [
    {
      id: 'DEV-PRN-01',
      name: 'Receipt Printer',
      model: 'Epson TM-T88VI',
      status: 'Online',
      icon: '▤',
      port: 'USB · COM3',
      firmware: 'v4.12',
      uptime: '6h 22m',
      lastActive: 'Just now',
      jobs: 148,
      errors: 0,
      action: 'Reset'
    },
    {
      id: 'DEV-SCN-01',
      name: 'Barcode Scanner',
      model: 'Honeywell Voyager 1452g',
      status: 'Online',
      icon: '⌗',
      port: 'Bluetooth · CH7',
      firmware: 'v2.8.1',
      uptime: '6h 22m',
      lastActive: '3s ago',
      jobs: 2341,
      errors: 2,
      action: 'Reset'
    },
    {
      id: 'DEV-DRW-01',
      name: 'Cash Drawer',
      model: 'APG Vasario 1616',
      status: 'Online',
      icon: '▭',
      port: 'RJ11 · Printer relay',
      firmware: 'N/A',
      uptime: '6h 22m',
      lastActive: '2m ago',
      jobs: 94,
      errors: 0,
      action: 'Reset'
    },
    {
      id: 'DEV-SCL-01',
      name: 'Weighing Scale',
      model: 'Mettler Toledo IND231',
      status: 'Error',
      icon: '⊟',
      port: 'Serial · COM5',
      firmware: 'v1.5.0',
      uptime: '0m',
      lastActive: '14m ago',
      jobs: 0,
      errors: 3,
      action: 'Reconnect'
    },
    {
      id: 'DEV-DSP-01',
      name: 'Customer Display',
      model: 'Bixolon BCD-1100',
      status: 'Idle',
      icon: '▣',
      port: 'USB · COM6',
      firmware: 'v3.1',
      uptime: '6h 22m',
      lastActive: '8m ago',
      jobs: 148,
      errors: 0,
      action: 'Reset'
    },
    {
      id: 'DEV-LBL-01',
      name: 'Serial Label Printer',
      model: 'Zebra ZD421',
      status: 'Offline',
      icon: '▤',
      port: 'USB · COM8',
      firmware: 'v7.3.2',
      uptime: '0m',
      lastActive: '2h ago',
      jobs: 0,
      errors: 1,
      action: 'Reconnect'
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Online': return 'text-green-700 bg-green-100 border-blue-200';
      case 'Error': return 'text-red-700 bg-red-100 border-blue-200';
      case 'Idle': return 'text-orange-700 bg-orange-100 border-blue-200';
      case 'Offline': return 'text-gray-700 bg-gray-100 border-blue-200';
      default: return 'text-gray-700 bg-gray-100 border-blue-200';
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <DeviceManagementNavbar activeTab="Devices" onTabChange={() => {}} slim={true} />
      
      <div className="flex-1 p-4 md:p-4 lg:p-4 pt-0 md:pt-0 lg:pt-0 space-y-3 md:space-y-3">
        
        {/* TOP SUMMARY STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 md:p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-xl cursor-default group">
              <p className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase mb-1 group-hover:text-blue-900 transition-colors">{stat.label}</p>
              <p className={`text-2xl md:text-3xl font-black ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>

        {/* ALERTS & FILTERS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-gray-100 shadow-2xl">
          <div className="flex items-center space-x-4 bg-red-50 px-5 py-3 rounded-sm border border-red-100 shadow-sm">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-lg shadow-blue-200"></span>
            <span className="text-[10px] md:text-xs font-black text-red-700 uppercase">System Alert: 1 hardware failure detected</span>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-sm border border-blue-100 overflow-x-auto no-scrollbar">
            {['all', 'online', 'error', 'offline', 'idle'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-2.5 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                  activeFilter === f 
                    ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {f} ({f === 'all' ? 6 : devices.filter(d => d.status.toLowerCase() === f).length})
              </button>
            ))}
          </div>
        </div>

        {/* DEVICE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-3 pb-3">
          {devices
            .filter(d => activeFilter === 'all' || d.status.toLowerCase() === activeFilter)
            .map((device) => (
            <div key={device.id} className="bg-white rounded-lg border border-blue-100 shadow-sm flex flex-col overflow-hidden hover:shadow-sm transition-all group relative">
              {/* Header */}
              <div className="p-4 md:p-4 pb-3 flex items-start justify-between border-b border-blue-50">
                <div className="flex items-center space-x-5">
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-3xl md:text-4xl shadow-inner group-hover:scale-110 transition-transform">
                    {device.icon}
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black text-gray-800 uppercase mb-1">{device.name}</h3>
                    <p className="text-[10px] md:text-[11px] font-bold text-slate-600 uppercase">{device.model}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(device.status)}`}>
                  {device.status}
                </div>
              </div>

              {/* Technical Details */}
              <div className="p-4 md:p-4 grid grid-cols-2 gap-y-3 gap-x-4 border-b border-blue-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Interface Port</p>
                  <p className="text-[10px] font-black text-slate-600 uppercase">{device.port}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">System Build</p>
                  <p className="text-[10px] font-black text-slate-600 uppercase">{device.firmware}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Global Uptime</p>
                  <p className="text-[10px] font-black text-blue-900 uppercase">{device.uptime}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase">Heartbeat</p>
                  <p className="text-[10px] font-black text-slate-600 uppercase">{device.lastActive}</p>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="px-4 md:px-4 py-4 bg-slate-50/50 flex justify-between items-center border-b border-blue-50">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 tabular-nums">{device.jobs.toLocaleString()}</span>
                    <span className="text-[10px] font-black text-slate-600 uppercase">Jobs</span>
                  </div>
                  <div className="w-px h-6 bg-slate-200"></div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-black tabular-nums ${device.errors > 0 ? 'text-red-500' : 'text-slate-600'}`}>{device.errors}</span>
                    <span className="text-[10px] font-black text-slate-600 uppercase">Errors</span>
                  </div>
                </div>
                <button className="text-[10px] font-black text-blue-900 uppercase hover:underline active:scale-95 transition-all">
                  Diagnostics →
                </button>
              </div>

              {/* Footer Actions */}
              <div className="p-5 md:p-6 grid grid-cols-2 gap-4">
                <button className="py-3.5 bg-slate-200 border border-blue-100 rounded-sm text-[10px] font-black text-blue-800 uppercase hover:text-blue-900 transition-all shadow-sm active:scale-95">
                  View Log
                </button>
                <button className={`py-3.5 rounded-sm text-[10px] font-black text-white uppercase shadow-lg transition-all active:scale-95 ${
                  device.action === 'Reset' ? 'bg-linear-to-l from-blue-800 to-blue-950 shadow-blue-200 hover:bg-blue-950' : 'bg-linear-to-l from-blue-800 to-blue-950 shadow-blue-200 hover:bg-blue-900'
                }`}>
                  {device.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceManagementPage;
