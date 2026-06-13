'use client';

import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const PurchaseHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('All Time');

  const topSuppliers = [
    { name: 'Apex Wholesale', spend: 42100, color: 'bg-yellow-500' },
    { name: 'Delta Distributors', spend: 31500, color: 'bg-olive' },
    { name: 'GreenLeaf Farms', spend: 28000, color: 'bg-orange-500' },
    { name: 'StarBev Imports', spend: 22400, color: 'bg-brown/100' },
  ];

  const monthlyVolume = [
    { month: 'Jun', value: 45 }, { month: 'Jul', value: 30 }, { month: 'Aug', value: 55 },
    { month: 'Sep', value: 40 }, { month: 'Oct', value: 65 }, { month: 'Nov', value: 50 },
    { month: 'Dec', value: 85 }, { month: 'Jan', value: 60 }, { month: 'Feb', value: 45 },
    { month: 'Mar', value: 70 }, { month: 'Apr', value: 75 }, { month: 'May', value: 90 },
  ];

  const historyRecords = [
    { id: 'RCV-0028', po: 'PO-2026-0039', supplier: 'GreenLeaf Farms', by: 'Admin', date: 'May 30, 2026', items: 22, units: 1240, cost: 7880.00, status: 'Complete' },
    { id: 'RCV-0027', po: 'PO-2026-0036', supplier: 'Apex Wholesale Co.', by: 'Staff B', date: 'May 27, 2026', items: 11, units: 880, cost: 8200.00, status: 'Complete' },
    { id: 'RCV-0026', po: 'PO-2026-0040', supplier: 'StarBev Imports', by: 'Admin', date: 'May 25, 2026', items: 2, units: 96, cost: 1050.00, status: 'Partial' },
    { id: 'RCV-0025', po: 'PO-2026-0034', supplier: 'Delta Distributors', by: 'Staff A', date: 'May 20, 2026', items: 7, units: 340, cost: 4120.00, status: 'Complete' },
    { id: 'RCV-0024', po: 'PO-2026-0033', supplier: 'Apex Wholesale Co.', by: 'Admin', date: 'May 15, 2026', items: 18, units: 1580, cost: 13450.00, status: 'Complete' },
    { id: 'RCV-0023', po: 'PO-2026-0031', supplier: 'PrimePack Ltd.', by: 'Staff B', date: 'May 09, 2026', items: 4, units: 200, cost: 2800.00, status: 'Complete' },
    { id: 'RCV-0022', po: 'PO-2026-0030', supplier: 'GreenLeaf Farms', by: 'Admin', date: 'May 03, 2026', items: 14, units: 920, cost: 6240.00, status: 'Complete' },
  ];

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-lg font-black text-blue-800 uppercase">Purchase History</h2>
          <p className="text-[10px] font-bold text-gray-700 uppercase">Complete record of all received stock and transactions</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 border border-blue-100 text-blue-900 hover:text-blue-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-sm">
            <span className="mr-2 text-sm">📅</span> Date Range
          </button>
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-olive transition-all shadow-lg flex items-center justify-center">
            <span className="mr-2 text-sm">⬇</span> Export CSV
          </button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Monthly Volume Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-sm border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-blue-800 uppercase">Monthly Purchase Volume</h3>
              <p className="text-[10px] font-bold text-gray-600 uppercase">Last 12 months — Total spend</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-600 uppercase">Total Spend</p>
              <p className="text-xl font-black text-olive">$142.8K</p>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyVolume} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6', radius: 8 }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="url(#barGradient)" 
                  radius={[0, 0, 0, 0]}
                  barSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Suppliers */}
        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-xl">
          <h3 className="text-sm font-black text-blue-800 uppercase mb-3">Top Suppliers</h3>
          <div className="space-y-3">
            {topSuppliers.map((supplier) => (
              <div key={supplier.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-800 uppercase">{supplier.name}</span>
                  <span className="text-[10px] font-bold text-olive">${(supplier.spend / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${supplier.color} opacity-80`}
                    style={{ width: `${(supplier.spend / topSuppliers[0].spend) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 bg-gray-200 hover:bg-gray-100 text-blue-800 rounded-sm text-[9px] font-black uppercase transition-all border border-blue-100 mt-13">
            View All Suppliers →
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex gap-4 p-1.5 rounded-sm w-full lg:w-auto overflow-x-auto no-scrollbar">
          {['All Time', 'This Month', 'Last 30 Days', 'Custom Range'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeFilter(t)}
              className={`px-5 py-2 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                timeFilter === t ? 'bg-linear-to-l from-blue-800 to-blue-950 text-blue-100 shadow-sm' : 'text-blue-500 hover:text-gray-600 border border-blue-100 bg-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="flex bg-slate-100 p-1.5 rounded-sm border border-blue-100">
            <select className="bg-transparent border-none text-[10px] font-black uppercase text-blue-800 px-3 py-1 outline-none">
              <option>All Suppliers</option>
            </select>
          </div>
          <div className="relative flex-1 lg:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-800">
              ⌕
            </span>
            <input
              type="text"
              placeholder="Search history..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase tracking-widest text-gray-500 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-olive transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-blue-50 flex items-center justify-between">
          <span className="text-[10px] font-black text-blue-800 uppercase">28 records found</span>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-blue-800 uppercase">Sort by:</span>
            <select className="bg-slate-100 border border-blue-100 text-[10px] font-black uppercase text-blue-800 px-3 py-1.5 outline-none cursor-pointer">
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Receipt #</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">PO Reference</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Supplier</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Received By</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Date</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Items</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Units</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Total Cost</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Status</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historyRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-olive uppercase">{record.id}</span>
                      <span className="text-[10px] font-bold text-gray-600 uppercase">{record.date}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[10px] font-bold text-gray-600 uppercase">{record.po}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[10px] font-black text-gray-800 uppercase block max-w-[150px]">{record.supplier}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="px-2 py-1 bg-slate-100 rounded-full text-[10px] font-black text-gray-500 uppercase">{record.by}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-[10px] font-bold text-gray-700 uppercase">{record.date}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-[10px] font-black text-gray-800 uppercase">{record.items} SKUs</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{record.units.toLocaleString()}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[10px] font-black text-gray-800">${record.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      record.status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="w-8 h-8 rounded-sm bg-slate-100 text-gray-700 hover:text-blue-500 hover:bg-white border border-transparent hover:border-blue-100 transition-all flex items-center justify-center group/btn shadow-sm">
                        <span className="text-sm group-hover/btn:scale-110 transition-transform">👁</span>
                      </button>
                      <button className="w-8 h-8 rounded-sm bg-slate-100 text-gray-700 hover:text-blue-500 hover:bg-white border border-transparent hover:border-blue-100 transition-all flex items-center justify-center group/btn shadow-sm">
                        <span className="text-sm group-hover/btn:scale-110 transition-transform">🖨</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-gray-50/50 border-t border-blue-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-700 uppercase">Showing 7 of 28 records</p>
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-gray-700 hover:text-blue-500 transition-colors">‹</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-linear-to-l from-blue-800 to-blue-950 text-white font-black text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-gray-700 hover:bg-gray-50 font-black text-xs transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-gray-700 hover:bg-gray-50 font-black text-xs transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-gray-700 hover:text-olive transition-colors">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
