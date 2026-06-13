'use client';

import React, { useState } from 'react';

const UserActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const activities = [
    { id: 1, user: 'John Doe', action: 'LOGIN', resource: 'System', ip: '192.168.1.1', time: '2026-06-06 08:30:12', status: 'Success', icon: '🔑' },
    { id: 2, user: 'Sarah Smith', action: 'CREATE_PRODUCT', resource: 'PROD-492', ip: '192.168.1.45', time: '2026-06-06 09:15:44', status: 'Success', icon: '📦' },
    { id: 3, user: 'Mike Ross', action: 'DELETE_SALE', resource: 'INV-2026-001', ip: '10.0.0.12', time: '2026-06-06 10:05:22', status: 'Denied', icon: '❌' },
    { id: 4, user: 'John Doe', action: 'EXPORT_REPORT', resource: 'Finance_Q2', ip: '192.168.1.1', time: '2026-06-06 11:20:05', status: 'Success', icon: '📊' },
    { id: 5, user: 'System', action: 'BACKUP_SYNC', resource: 'AWS S3', ip: '127.0.0.1', time: '2026-06-06 12:00:00', status: 'Warning', icon: '🔄' },
    { id: 6, user: 'Sarah Smith', action: 'UPDATE_USER', resource: 'USR-882', ip: '192.168.1.45', time: '2026-06-06 14:10:33', status: 'Success', icon: '👤' },
    { id: 7, user: 'Admin', action: 'SECURITY_WIPE', resource: 'Audit Logs', ip: '192.168.1.100', time: '2026-06-06 15:45:12', status: 'Success', icon: '🛡️' },
  ];

  const stats = [
    { label: 'Total Events', value: '1,284', change: '+12% vs last week', color: 'text-blue-900' },
    { label: 'Failed Attempts', value: '23', change: '-5% vs last week', color: 'text-red-600' },
    { label: 'Active Users', value: '42', change: 'Current session', color: 'text-olive' },
    { label: 'Critical Alerts', value: '2', change: 'Requires review', color: 'text-orange-500' },
  ];

  return (
    <div className="flex flex-col space-y-3 h-full">
      
      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm transition-all hover:shadow-md group">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
              <span className="text-[9px] font-bold text-slate-600 uppercase italic mb-1 group-hover:text-slate-700 transition-colors">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN LOG PANEL */}
      <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
        
        {/* FILTERS BAR */}
        <div className="p-4 border-b border-blue-50 flex flex-wrap items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center space-x-3 flex-1 min-w-[300px]">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">🔍</span>
              <input 
                type="text"
                placeholder="Search by user, action, or resource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors placeholder:text-slate-300"
              />
            </div>
            <select className="px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[11px] font-black text-slate-600 uppercase focus:outline-hidden focus:border-blue-400 transition-colors cursor-pointer">
              <option>All Actions</option>
              <option>Security</option>
              <option>Inventory</option>
              <option>Financial</option>
            </select>
            <select className="px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[11px] font-black text-slate-600 uppercase focus:outline-hidden focus:border-blue-400 transition-colors cursor-pointer">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Custom Range</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button className="bg-slate-100 hover:bg-slate-200 text-blue-900 border border-blue-100 px-4 py-2 rounded-sm text-[11px] font-black uppercase transition-all shadow-xs active:scale-95 flex items-center space-x-2">
              <span>📄</span>
              <span>CSV</span>
            </button>
            <button className="bg-linear-to-l from-blue-700 to-blue-950 hover:bg-blue-950 text-white px-4 py-2 rounded-sm text-[11px] font-black uppercase transition-all shadow-sm active:scale-95 flex items-center space-x-2">
              <span>🖨️</span>
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* LOG TABLE */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <tr className="border-b border-blue-100 text-[10px] font-black text-blue-900 uppercase">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Resource Target</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Timestamp (UTC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activities.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/50 transition-colors group cursor-default">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-[10px]">
                        {activity.user.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-black text-slate-800">{activity.user}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">System Level</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm grayscale group-hover:grayscale-0 transition-all">{activity.icon}</span>
                      <span className="text-[10px] font-black text-blue-900 uppercase bg-blue-50 px-2 py-0.5 rounded-sm">
                        {activity.action.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-600 font-mono">{activity.resource}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">{activity.ip}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${
                      activity.status === 'Success' ? 'bg-green-50 text-green-600 border-green-100' :
                      activity.status === 'Denied' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[11px] font-bold text-slate-600 font-mono italic">{activity.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION / FOOTER */}
        <div className="p-3 border-t border-blue-50 bg-slate-50/30 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-600 uppercase italic">
            Showing 7 of 1,284 entries • Auto-refreshing every 30s
          </p>
          <div className="flex space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-slate-200 text-[10px] font-black hover:bg-white transition-colors text-slate-400 pointer-events-none">«</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-blue-200 text-[10px] font-black bg-blue-900 text-white shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-slate-200 text-[10px] font-black hover:bg-white transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-slate-200 text-[10px] font-black hover:bg-white transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-slate-200 text-[10px] font-black hover:bg-white transition-colors">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivities;
