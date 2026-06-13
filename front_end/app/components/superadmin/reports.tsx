'use client';

import { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// #region Realistic revenue data
const revenueData = [
  { month: 'Jan', revenue: 2400000 },
  { month: 'Feb', revenue: 3000000 },
  { month: 'Mar', revenue: 2000000 },
  { month: 'Apr', revenue: 2780000 },
  { month: 'May', revenue: 1890000 },
  { month: 'Jun', revenue: 2390000 },
  { month: 'Jul', revenue: 3490000 },
  { month: 'Aug', revenue: 4000000 },
  { month: 'Sep', revenue: 3200000 },
  { month: 'Oct', revenue: 4500000 },
  { month: 'Nov', revenue: 3800000 },
  { month: 'Dec', revenue: 5200000 },
];
// #endregion

const GlobalReports = () => {
  const [timeframe, setTimeTimeframe] = useState('Month');

  const stats = [
    { label: 'Global Revenue', value: 'KSh 42.8M', change: '↑ 14%', meta: 'Year to Date', color: 'text-blue-900', bg: 'bg-blue-50' },
    { label: 'Avg Tenant Spend', value: 'KSh 18,400', change: '↑ 5%', meta: 'Per Month', color: 'text-gray-800', bg: 'bg-gray-50' },
    { label: 'System ROI', value: '342%', change: '↑ 12%', meta: 'Infrastructure', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Billing Health', value: '98.4%', change: 'Normal', meta: 'Success Rate', color: 'text-olive', bg: 'bg-yellow-50' },
  ];

  const regionalPerformance = [
    { region: 'East Africa', revenue: 'KSh 18.2M', growth: '↑ 22%', tenants: 58, color: 'text-blue-600' },
    { region: 'West Africa', revenue: 'KSh 12.4M', growth: '↑ 18%', tenants: 34, color: 'text-blue-500' },
    { region: 'Europe', revenue: 'KSh 8.6M', growth: '↑ 8%', tenants: 12, color: 'text-blue-400' },
    { region: 'Others', revenue: 'KSh 3.6M', growth: '↑ 12%', tenants: 20, color: 'text-gray-400' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-black text-blue-800 uppercase">Global <span className="text-blue-900">Analytics</span></h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">Consolidated infrastructure revenue and tenant performance reports</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex bg-white p-1 rounded-sm border border-blue-100 shadow-sm">
             {['Day', 'Week', 'Month', 'Year'].map(t => (
               <button
                 key={t}
                 onClick={() => setTimeTimeframe(t)}
                 className={`flex-1 md:flex-none px-4 py-2 rounded-sm text-[9px] font-bold transition-all ${
                   timeframe === t ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-lg' : 'text-gray-400 hover:text-gray-800'
                 }`}
               >
                 {t}
               </button>
             ))}
          </div>
          <button className="hidden md:flex px-3.5 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-2xl shadow-lg hover:bg-blue-800 transition-all active:scale-95">
             <span className="text-xl leading-none">↓</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
            <p className="text-[10px] md:text-[10px] font-bold text-gray-600 uppercase group-hover:text-blue-900 transition-colors relative z-10">{stat.label}</p>
            <p className={`text-xl md:text-2xl font-black ${stat.color} relative z-10`}>{stat.value}</p>
            <p className="text-[10px] font-bold text-gray-700 uppercase relative z-10">{stat.change} · {stat.meta}</p>
            <div className={`absolute -right-2 -bottom-2 w-16 h-16 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white p-3 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm relative overflow-hidden group">
           <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-100 relative z-10">
              <h3 className="text-sm font-black text-blue-800 uppercase">Global Revenue Trend</h3>
              <div className="flex items-center space-x-3">
                 <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">MTD: KSh 1.2M</span>
              </div>
           </div>
           
           <div className="h-56 md:h-80 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e3a8a" stopOpacity={1} /> {/* blue-900 */}
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1} /> {/* blue-700 */}
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 900 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 900 }}
                    tickFormatter={(value) => `KSh ${value / 1000000}M`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                    contentStyle={{ 
                      borderRadius: '1rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      fontSize: '10px',
                      fontWeight: 900,
                      textTransform: 'uppercase'
                    }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#barGradient)" 
                    radius={[0, 0, 0, 0]}
                    barSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />
        </div>

        {/* Regional Breakdown */}
        <div className="bg-white p-2 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-2xl flex flex-col group">
           <h3 className="text-sm font-black text-blue-800 uppercase mb-2">Market Share</h3>
           <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 pb-2 border-b border-blue-100">By Revenue Contribution</p>
           
           <div className="space-y-1 flex-1">
              {regionalPerformance.map((reg) => (
                <div key={reg.region} className="space-y-1 group/reg">
                   <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                         <span className="text-[11px] font-black text-gray-800 uppercase">{reg.region}</span>
                         <span className="text-[11px] font-bold text-gray-600 uppercase">{reg.tenants} Businesses</span>
                      </div>
                      <div className="text-right">
                         <span className="text-[11px] font-black text-blue-900">{reg.revenue}</span>
                         <p className="text-[11px] font-black text-green-600 uppercase">{reg.growth}</p>
                      </div>
                   </div>
                   <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden border border-blue-100 shadow-inner">
                      <div className={`h-full bg-blue-900 rounded-full transition-all duration-1000 group-hover/reg:scale-x-105 origin-left`} 
                           style={{ width: `${(parseInt(reg.revenue.split(' ')[1]) / 40) * 100}%` }} />
                   </div>
                </div>
              ))}
           </div>

           <button className="mt-3 w-full py-4 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-sm text-[11px] font-black uppercase transition-all border border-blue-100 active:scale-95">
              Full Market Report →
           </button>
        </div>
      </div>

      {/* Audit & Compliance Card */}
      <div className="bg-linear-to-r from-blue-900 to-blue-950 p-4 md:p-4 rounded-sm md:rounded-sm shadow-sm text-white relative overflow-hidden group">
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-4 max-w-2xl">
               <h3 className="text-md md:text-lg font-black uppercase text-blue-200">Regulatory Compliance Registry</h3>
               <p className="text-[10px] md:text-xs font-medium text-blue-50 uppercase">All global system operations are audited under the SHA-256 integrity protocol. Multi-region redundancy is active with 100% data isolation for all tenants.</p>
               <div className="flex flex-wrap items-center gap-2 pt-2">
                  <div className="flex items-center space-x-2">
                     <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                     <span className="text-[9px] font-black uppercase">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                     <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                     <span className="text-[9px] font-black uppercase">KRA eTIMS Validated</span>
                  </div>
                  <div className="flex items-center space-x-3">
                     <span className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                     <span className="text-[9px] font-black uppercase">SOC Type II Ready</span>
                  </div>
               </div>
            </div>
            <button className="shrink-0 px-4 py-3 md:px-8 md:py-5 bg-blue-200 text-blue-950 rounded-sm text-[10px] font-black uppercase hover:bg-blue-50 transition-all shadow-xl shadow-black/20 active:scale-95">
               Download Audit Trail
            </button>
         </div>
         <div className="absolute right-0 bottom-0 p-8 md:p-12 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-1000">
            <span className="text-[6rem] md:text-[12rem] leading-none">🛡️</span>
         </div>
      </div>
    </div>
  );
};

export default GlobalReports;
