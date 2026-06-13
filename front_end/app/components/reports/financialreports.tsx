'use client';

import React, { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell
} from 'recharts';

// #region Sample data
const weeklyCashFlowData = [
  { name: 'Week 1', inflow: 15000, outflow: 12000 },
  { name: 'Week 2', inflow: 22000, outflow: 18000 },
  { name: 'Week 3', inflow: 18000, outflow: 14000 },
  { name: 'Week 4', inflow: 29320, outflow: 21670 },
];
// #endregion

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-blue-50 shadow-xl rounded-xl">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{label} · May 2026</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-8">
              <span className="text-[10px] font-bold text-gray-600 uppercase">{entry.name}</span>
              <span className="text-sm font-black" style={{ color: entry.fill === 'url(#barGradient)' ? '#1E3A8A' : '#94A3B8' }}>
                KSh {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const FinancialReports = () => {
  const stats = [
    { label: 'Total Revenue', value: 'KSh 84,320', change: '▲ 12.4%', meta: 'MoM', icon: '💰', color: 'bg-green-50 text-green-600', borderColor: 'border-green-100' },
    { label: 'Total Expenses', value: 'KSh 65,670', change: '▼ 7.9%', meta: 'of revenue', icon: '💸', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { label: 'Net Income', value: 'KSh 18,650', change: '▲ 22.1%', meta: 'margin', icon: '💎', color: 'bg-green-50 text-green-600', borderColor: 'border-green-100' },
    { label: 'Tax Liability', value: 'KSh 4,662', change: '25%', meta: 'effective rate', icon: '🏛️', color: 'bg-red-50 text-red-600', borderColor: 'border-red-100' },
  ];

  const incomeStatement = [
    { item: 'Gross Revenue', amount: 84320, percent: 100, isMain: true },
    { item: 'Returns & Refunds', amount: -1204, percent: 1.4, isMain: false },
    { item: 'Discounts', amount: -2140, percent: 2.5, isMain: false },
    { item: 'Net Revenue', amount: 80976, percent: 96.1, isMain: true },
    { item: 'Cost of Goods Sold', amount: -53080, percent: 63, isMain: false },
    { item: 'Gross Profit', amount: 27896, percent: 33.1, isMain: true },
    { item: 'Operating Expenses', amount: -12590, percent: 14.9, isMain: false },
    { item: 'Operating Income', amount: 15306, percent: 18.2, isMain: true },
    { item: 'Tax (25%)', amount: -4662, percent: 5.5, isMain: false },
    { item: 'Net Income', amount: 18650, percent: 22.1, isMain: true },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-white p-3 rounded-sm border ${stat.borderColor} shadow-sm hover:shadow-md transition-all group cursor-default relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-7 h-7 rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                stat.label === 'Total Expenses' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-bold text-gray-700 uppercase">{stat.label}</p>
              <h4 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h4>
              <p className="text-[11px] font-bold text-gray-600 uppercase mt-1 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                {stat.meta}
              </p>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Statement Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase tracking-tighter">Income Statement</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase">May 2026 · Performance Overview</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-sm text-[10px] font-black uppercase transition-all border border-gray-100 flex items-center space-x-2">
              <span className="text-xs">🖨️</span>
              <span>Print Statement</span>
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest border-b border-gray-50">Line Item</th>
                  <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right border-b border-gray-50">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right border-b border-gray-50">% Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {incomeStatement.map((row, i) => (
                  <tr key={i} className={`hover:bg-blue-50/30 transition-colors ${row.isMain ? 'bg-blue-50/10' : ''}`}>
                    <td className="px-6 py-4">
                      <span className={`text-[11px] uppercase tracking-wide ${row.isMain ? 'font-black text-blue-950' : 'font-bold text-gray-600 ml-4'}`}>
                        {row.item}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-black ${
                      row.amount < 0 ? 'text-red-500' : row.isMain ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {row.amount < 0 ? `-KSh ${Math.abs(row.amount).toLocaleString()}` : `KSh ${row.amount.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${row.isMain ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-500'}`}>
                        {row.percent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cash Flow Analysis */}
        <div className="bg-white p-4 rounded-sm border border-blue-50 shadow-sm flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-black text-blue-900 uppercase">Cash Flow</h3>
            <p className="text-[10px] font-black text-gray-500 uppercase">May 2026 · Weekly Summary</p>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyCashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e3a8a" stopOpacity={1}/> {/* blue-900 (close to 950) */}
                      <stop offset="100%" stopColor="#1e40af" stopOpacity={1}/> {/* blue-800 */}
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 900 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
                  <Bar 
                    dataKey="inflow" 
                    name="Cash Inflow" 
                    fill="url(#barGradient)" 
                    radius={[0, 0, 0, 0]} 
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-4 pt-4 border-t border-blue-100">
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-md bg-blue-900 shadow-sm" />
                  <span className="text-[10px] font-black text-gray-600 uppercase">Total Inflow</span>
                </div>
                <span className="text-[11px] font-black text-gray-900">KSh 84,320</span>
              </div>
              <div className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-md bg-gray-200 shadow-sm" />
                  <span className="text-[10px] font-black text-gray-600 uppercase">Total Outflow</span>
                </div>
                <span className="text-[11px] font-black text-gray-900">KSh 65,670</span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-sm border border-green-100 flex justify-between items-center shadow-sm">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-green-700/60 uppercase">Net Position</span>
                  <p className="text-xs font-black text-green-700 uppercase">Healthy</p>
                </div>
                <span className="text-xl font-black text-green-700">+KSh 18,650</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
