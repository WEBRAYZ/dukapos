'use client';

import React, { useState } from 'react';

const ApiAccess = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const apiStats = [
    { label: 'Total Requests', value: '842.1k', sub: 'Last 24 hours', color: 'text-blue-900', icon: '⚡' },
    { label: 'Avg Latency', value: '142ms', sub: '99th percentile: 310ms', color: 'text-olive', icon: '⏱️' },
    { label: 'Error Rate', value: '0.04%', sub: '32 failed requests', color: 'text-green-600', icon: '📊' },
    { label: 'Active Keys', value: '12', sub: '4 systems connected', color: 'text-slate-600', icon: '🔑' },
  ];

  const apiLogs = [
    { id: 'REQ-4001', timestamp: '2026-06-06 15:42:11', method: 'GET', endpoint: '/api/v1/inventory/stocks', client: 'Web Frontend', status: 200, latency: '88ms', icon: '🟢' },
    { id: 'REQ-4000', timestamp: '2026-06-06 15:41:05', method: 'POST', endpoint: '/api/v1/sales/create', client: 'POS Terminal 01', status: 201, latency: '245ms', icon: '🟢' },
    { id: 'REQ-3999', timestamp: '2026-06-06 15:40:22', method: 'GET', endpoint: '/api/v1/customers/lookup', client: 'Mobile App', status: 404, latency: '42ms', icon: '🟡' },
    { id: 'REQ-3998', timestamp: '2026-06-06 15:38:44', method: 'PUT', endpoint: '/api/v1/products/PRD-99', client: 'Admin Panel', status: 403, latency: '12ms', icon: '🔴' },
    { id: 'REQ-3997', timestamp: '2026-06-06 15:35:12', method: 'DELETE', endpoint: '/api/v1/backups/BK-22', client: 'Automation Bot', status: 204, latency: '1.2s', icon: '🟢' },
    { id: 'REQ-3996', timestamp: '2026-06-06 15:32:00', method: 'GET', endpoint: '/api/v1/reports/finance', client: 'PowerBI Sync', status: 200, latency: '840ms', icon: '🟢' },
  ];

  return (
    <div className="flex flex-col space-y-3 h-full animate-in slide-in-from-bottom-2 duration-500">
      
      {/* API PERFORMANCE STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {apiStats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm transition-all hover:shadow-md group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-slate-600 uppercase">{stat.label}</span>
              <span className="text-lg group-hover:rotate-12 transition-transform">{stat.icon}</span>
            </div>
            <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 italic">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* API TRAFFIC MONITOR */}
      <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
        
        {/* INTERFACE BAR */}
        <div className="p-4 border-b border-blue-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative max-w-sm flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs">🔍</span>
              <input 
                type="text"
                placeholder="Search endpoint or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[11px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
              />
            </div>
            <div className="flex space-x-2">
              {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
                <button key={m} className="px-3 py-1.5 bg-slate-100 border border-blue-200 rounded-sm text-[10px] font-black text-slate-500 hover:border-blue-400 hover:text-blue-900 transition-all uppercase">
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
             <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-sm border border-green-100 flex items-center space-x-1.5">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span>GATEWAY NOMINAL</span>
             </span>
             <button className="bg-linear-to-l from-blue-700 to-blue-950 text-white px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-blue-950 transition-all shadow-sm active:scale-95">
               API Analytics
             </button>
          </div>
        </div>

        {/* LOGS TABLE */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <tr className="border-b border-blue-100 text-[10px] font-black text-blue-900 uppercase">
                <th className="px-4 py-3">Request ID</th>
                <th className="px-4 py-3">Method/ Endpoint</th>
                <th className="px-4 py-3">Origin Application</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Latency</th>
                <th className="px-4 py-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {apiLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group cursor-default">
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-bold text-slate-600 font-mono">{log.id}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-sm border ${
                        log.method === 'GET' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        log.method === 'POST' ? 'bg-green-50 text-green-700 border-green-100' :
                        log.method === 'DELETE' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {log.method}
                      </span>
                      <span className="text-[12px] font-bold text-slate-700 font-mono group-hover:text-blue-900 transition-colors">{log.endpoint}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-black text-slate-500 uppercase">{log.client}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[11px] font-black px-2.5 py-1 rounded-sm border ${
                      log.status < 300 ? 'bg-green-50 text-green-600 border-green-100' :
                      log.status < 500 ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[11px] font-bold font-mono ${
                      log.latency.includes('s') ? 'text-red-500' : 'text-slate-700'
                    }`}>
                      {log.latency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-[11px] font-bold text-slate-600 font-mono italic">{log.timestamp.split(' ')[1]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MONITORING FOOTER */}
        <div className="p-4 bg-blue-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="text-[9px] font-black text-slate-300 uppercase">Rate Limit: 5,000 req/min</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-olive rounded-full" />
              <span className="text-[9px] font-black text-slate-300 uppercase">Cache Hit Ratio: 88.4%</span>
            </div>
          </div>
          <p className="text-[9px] font-black text-slate-300 uppercase">
            REST API v1.4.2 · Documentation · Endpoint Health
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiAccess;
