'use client';

import React, { useState } from 'react';

const AuditLogs = () => {
  const logs = [
    {
      id: 1,
      time: 'Today 09:32:14',
      title: 'Unusual discount flagged',
      description: 'Sale #TXN-8821 · Discount: $120 (38%) applied to Order',
      user: 'Rina Torres',
      branch: 'Branch B',
      location: 'POS Terminal 3',
      level: 'High',
      icon: '🚨',
      levelColor: 'bg-red-50 text-red-600',
    },
    {
      id: 2,
      time: 'Today 09:14:02',
      title: 'User login successful',
      description: 'Session started · IP: 192.168.1.10 · Browser: Chrome 124',
      user: 'Sarah Kim',
      branch: 'Main Branch',
      location: 'Admin',
      level: 'Info',
      icon: '✅',
      levelColor: 'bg-yellow-50 text-yellow-600',
    },
    {
      id: 3,
      time: 'Today 08:55:47',
      title: 'Stock adjustment made',
      description: 'SKU-4421 (Apple AirPods Pro 2) · Qty changed: 10 → 7 · Reason: damaged',
      user: 'David Osei',
      branch: 'Main Branch',
      location: 'Manager',
      level: 'Medium',
      icon: '📦',
      levelColor: 'bg-orange-50 text-orange-600',
    },
    {
      id: 4,
      time: 'Today 08:52:10',
      title: 'User login successful',
      description: 'Session started · IP: 192.168.1.12 · Browser: Firefox 126',
      user: 'David Osei',
      branch: 'Main Branch',
      location: 'Manager',
      level: 'Info',
      icon: '✅',
      levelColor: 'bg-yellow-50 text-yellow-600',
    },
    {
      id: 5,
      time: 'Yesterday 18:10:33',
      title: 'Settings updated',
      description: 'Low stock threshold changed: 5 → 10 · Tax rate unchanged',
      user: 'Sarah Kim',
      branch: 'Main Branch',
      location: 'Admin',
      level: 'Config',
      icon: '⚙️',
      levelColor: 'bg-brown/10 text-brown',
    },
    {
      id: 6,
      time: 'Yesterday 17:44:00',
      title: 'New user invited',
      description: 'Invitation sent to invite-pending@pos.com · Role: Cashier · Branch A',
      user: 'Sarah Kim',
      branch: 'Main Branch',
      location: 'Admin',
      level: 'Medium',
      icon: '👤',
      levelColor: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="space-y-3 pb-4 lg:pb-8">
      {/* Header & Controls */}
      <div className="bg-white p-4 lg:p-4 rounded-sm border border-blue-100 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-gray-800 uppercase">Audit Logs</h2>
          <p className="text-[10px] font-bold text-gray-700 uppercase">All system actions · Tamper-proof</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select className="px-4 py-3 bg-gray-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-olive transition-all min-w-[150px]">
            <option>All Categories</option>
            <option>Security</option>
            <option>Inventory</option>
            <option>Sales</option>
            <option>Config</option>
          </select>
          
          <select className="px-4 py-3 bg-gray-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-olive transition-all min-w-[150px]">
            <option>All Users</option>
            <option>Sarah Kim</option>
            <option>David Osei</option>
          </select>

          <button className="px-5 py-2.5 bg-white border border-blue-100 text-gray-600 rounded-sm font-black text-[10px] uppercase hover:bg-gray-50 transition-all shadow-sm flex items-center">
            <span className="mr-2 text-sm text-olive-400">⬇</span> Export Logs
          </button>
        </div>
      </div>

      {/* Logs Timeline */}
      <div className="space-y-3"> 
        {logs.map((log) => (
          <div key={log.id} className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-xl transition-all group flex items-start space-x-4 relative overflow-hidden">
            {/* Left accent border based on level */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              log.level === 'High' ? 'bg-red-500' :
              log.level === 'Medium' ? 'bg-orange-500' :
              log.level === 'Config' ? 'bg-brown/100' : 'bg-blue-500'
            }`} />

            <div className={`w-9 h-9 rounded-sm flex items-center justify-center text-2xl shrink-0 shadow-inner group-hover:scale-110 transition-transform ${log.levelColor}`}>
              {log.icon}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-gray-700 uppercase">{log.time}</p>
                  <h3 className="text-sm font-black text-gray-800 uppercase">{log.title}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase${log.levelColor}`}>
                  {log.level}
                </span>
              </div>
              
              <p className="text-xs font-medium text-gray-500">
                {log.description}
              </p>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center font-black text-[9px] text-gray-600 uppercase">
                    {log.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 uppercase">{log.user}</span>
                </div>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="text-[10px] font-bold text-gray-700 uppercase">{log.branch}</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="text-[10px] font-bold text-olive uppercase">{log.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button className="px-8 py-3 bg-gray-50 hover:bg-gray-100 text-blue-600 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-500">
          Load Full History
        </button>
      </div>
    </div>
  );
};

export default AuditLogs;
