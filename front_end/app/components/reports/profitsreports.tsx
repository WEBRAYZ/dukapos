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
  Legend,
  Cell
} from 'recharts';

// #region Sample data
const profitTrendData = [
  { month: 'Jan', revenue: 60000, profit: 20000 },
  { month: 'Feb', revenue: 45000, profit: 15000 },
  { month: 'Mar', revenue: 75000, profit: 25000 },
  { month: 'Apr', revenue: 85000, profit: 30000 },
  { month: 'May', revenue: 100000, profit: 35000 },
];

const costBreakdown = [
  { name: 'Cost of Goods', value: 53080, color: '#1E3A8A', bgColor: 'bg-blue-900' },
  { name: 'Staff / Payroll', value: 7200, color: '#F59E0B', bgColor: 'bg-amber-500' },
  { name: 'Rent & Utilities', value: 3100, color: '#F97316', bgColor: 'bg-orange-500' },
  { name: 'Marketing', value: 1400, color: '#EC4899', bgColor: 'bg-pink-500' },
  { name: 'Miscellaneous', value: 890, color: '#9CA3AF', bgColor: 'bg-gray-400' },
];
// #endregion

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-blue-50 shadow-xl rounded-xl">
        <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{label} 2026</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase">{entry.name}</span>
              <span className="text-sm font-black" style={{ color: entry.color }}>
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

const ProfitsReports = () => {
  const stats = [
    { label: 'Gross Profit', value: 'KSh 3.1M', change: '▲ 37.1%', meta: 'margin', icon: '📈', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { label: 'Net Profit', value: 'KSh 1.8M', change: '▲ 22.1%', meta: 'margin', icon: '💎', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { label: 'COGS', value: 'KSh 5.3M', change: '▼ 5.2%', meta: 'Cost of goods', icon: '📦', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { label: 'Op. Costs', value: 'KSh 1.2M', change: '▼ 14.9%', meta: 'of revenue', icon: '🏢', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
  ];

  const totalCost = costBreakdown.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-white p-2 rounded-sm border ${stat.borderColor} shadow-sm hover:shadow-md transition-all group cursor-default relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                stat.label === 'COGS' || stat.label === 'Op. Costs' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-700 uppercase">{stat.label}</p>
              <h4 className="text-xl font-black text-blue-900 mt-1">{stat.value}</h4>
              <p className="text-[10px] font-bold text-gray-600 uppercase mt-1 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                {stat.meta}
              </p>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Profit Trend Chart */}
        <div className="lg:col-span-2 bg-white p-3 rounded-sm border border-blue-100 shadow-xl overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase">Profitability Trends</h3>
              <p className="text-[10px] font-black text-gray-600 uppercase">Jan – May 2026 · Financial Analytics</p>
            </div>
            <div className="flex bg-gray-50 p-1 rounded-sm border border-blue-100">
              <button className="px-6 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white text-[10px] font-black uppercase rounded-sm shadow-lg shadow-blue-900/20 transition-all">Monthly</button>
              <button className="px-6 py-2 text-gray-600 text-[10px] font-black uppercase rounded-sm hover:text-blue-900 transition-colors">Quarterly</button>
            </div>
          </div>

          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 900 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
                <Legend 
                   verticalAlign="top" 
                   align="right" 
                   iconType="circle"
                   content={({ payload }) => (
                     <div className="flex space-x-3 mb-3 justify-end">
                       {payload?.map((entry: any, index: number) => (
                         <div key={index} className="flex items-center space-x-2">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                           <span className="text-[10px] font-black text-gray-600 uppercase">{entry.value}</span>
                         </div>
                       ))}
                     </div>
                   )}
                />
                <Bar 
                  dataKey="revenue" 
                  name="Revenue" 
                  fill="#1e293b" 
                  radius={[0, 0, 0, 0]} 
                  barSize={48}
                />
                <Bar 
                  dataKey="profit" 
                  name="Profit" 
                  fill="#1e40af" 
                  radius={[0, 0, 0, 0]} 
                  barSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white p-3 rounded-sm border border-blue-50 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-blue-900 uppercase">Cost Breakdown</h3>
          <p className="text-[10px] font-black text-gray-600 uppercase mb-4">May 2026 Distribution</p>
          
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden flex shadow-inner">
                {costBreakdown.map((item) => (
                  <div 
                    key={item.name}
                    className={`h-full ${item.bgColor} transition-all duration-1000`}
                    style={{ width: `${(item.value / totalCost) * 100}%` }}
                  />
                ))}
              </div>

              <div className="space-y-4">
                {costBreakdown.map((item) => (
                  <div key={item.name} className="group cursor-default">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-md ${item.bgColor} shadow-sm group-hover:scale-125 transition-transform`} />
                        <span className="text-[10px] font-black text-gray-700 uppercase">{item.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-900">KSh {item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.bgColor} opacity-20`}
                        style={{ width: `${(item.value / totalCost) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-5 bg-blue-50/50 rounded-lg border border-dashed border-blue-200">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black text-blue-900/40 uppercase">Total Expenses</span>
                  <p className="text-xs font-black text-blue-900 uppercase">May 2026</p>
                </div>
                <span className="text-2xl font-black text-blue-900">KSh {totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitsReports;
