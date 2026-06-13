'use client';

import React, { useState } from 'react';

const SecurityEvents = () => {
  const [filterLevel, setFilterLevel] = useState('All Levels');

  const securityStats = [
    { label: 'Security Score', value: '94/100', sub: 'Excellent', color: 'text-green-600', icon: '🛡️' },
    { label: 'Blocked Threats', value: '142', sub: 'Last 30 days', color: 'text-blue-900', icon: '🚫' },
    { label: 'Active Alerts', value: '3', sub: 'Require action', color: 'text-red-600', icon: '⚠️' },
    { label: 'Last Scan', value: '14m ago', sub: 'No malware found', color: 'text-slate-600', icon: '🔍' },
  ];

  const events = [
    { id: 'SEC-102', timestamp: '2026-06-06 14:22:01', threat: 'Brute Force Attempt', source: 'IP 185.22.44.11', level: 'Critical', action: 'IP Blocked', status: 'Resolved', icon: '🔐' },
    { id: 'SEC-101', timestamp: '2026-06-06 13:05:44', threat: 'Unauthorized Module Access', source: 'User: user_441', level: 'High', action: 'Session Terminated', status: 'Investigating', icon: '🚫' },
    { id: 'SEC-100', timestamp: '2026-06-06 11:40:12', threat: 'Mass Data Export', source: 'User: admin_maya', level: 'Medium', action: 'Flagged for Review', status: 'Pending', icon: '📊' },
    { id: 'SEC-099', timestamp: '2026-06-06 09:12:33', threat: 'Suspicious Login Location', source: 'Moscow, RU', level: 'High', action: 'MFA Triggered', status: 'Resolved', icon: '🌍' },
    { id: 'SEC-098', timestamp: '2026-06-05 22:30:00', threat: 'SQL Injection Pattern', source: 'WAF Filter', level: 'Critical', action: 'Request Dropped', status: 'Resolved', icon: '💉' },
    { id: 'SEC-097', timestamp: '2026-06-05 18:45:11', threat: 'API Key Rotation Overdue', source: 'System Monitor', level: 'Low', action: 'Admin Notified', status: 'Open', icon: '🔑' },
  ];

  return (
    <div className="flex flex-col space-y-3 h-full animate-in fade-in duration-500">
      
      {/* SECURITY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {securityStats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm transition-all hover:shadow-md group flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
              <p className="text-[9px] font-bold text-slate-600 uppercase mt-1 italic">{stat.sub}</p>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* SECURITY FEED */}
      <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
        
        {/* HEADER & FILTERS */}
        <div className="p-4 border-b border-blue-50 flex items-center justify-between bg-linear-to-l from-blue-700 to-blue-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-[11px] font-black uppercase">Security Incident Ledger</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-sm border border-white/10">
              <span className="text-[10px] font-black text-slate-400 uppercase">Filter Level:</span>
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer"
              >
                <option className="text-slate-900">All Levels</option>
                <option className="text-slate-900">Critical</option>
                <option className="text-slate-900">High</option>
                <option className="text-slate-900">Medium</option>
              </select>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-sm text-[10px] font-black uppercase transition-all active:scale-95 shadow-lg shadow-red-900/40">
              Security Lockdown
            </button>
          </div>
        </div>

        {/* INCIDENT TABLE */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <tr className="border-b border-blue-100 text-[10px] font-black text-blue-900 uppercase">
                <th className="px-4 py-3">Incident ID</th>
                <th className="px-4 py-3">Threat Description</th>
                <th className="px-4 py-3">Source / Origin</th>
                <th className="px-4 py-3 text-center">Threat Level</th>
                <th className="px-4 py-3">Action Taken</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group cursor-default">
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-600 font-mono">{event.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{event.icon}</span>
                      <span className="text-[12px] font-black text-slate-800 uppercase">{event.threat}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-600 font-mono bg-slate-50 px-2 py-0.5 rounded-sm border border-slate-100">
                      {event.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-sm uppercase border shadow-xs ${
                      event.level === 'Critical' ? 'bg-red-600 text-white border-red-700' :
                      event.level === 'High' ? 'bg-blue-500 text-white border-blue-600' :
                      'bg-blue-50 text-blue-900 border-blue-200'
                    }`}>
                      {event.level}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase italic">{event.action}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-[10px] font-black uppercase ${
                      event.status === 'Resolved' ? 'text-green-500' :
                      event.status === 'Investigating' ? 'text-blue-600 animate-pulse' :
                      'text-orange-500'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER ADVISORY */}
        <div className="p-4 bg-red-50/30 border-t border-red-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-red-600 text-sm">⚠️</span>
            <p className="text-[10px] font-bold text-red-800 uppercase">
              3 unresolved incidents require immediate administrative attention. 
              <button className="ml-2 underline hover:text-red-950 transition-colors">Review Security Policy →</button>
            </p>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase italic">Encryption: AES-256-GCM Active</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityEvents;
