'use client';

import React from 'react';
import Link from 'next/link';
import InventoryNavbar from '@/app/components/inventory/navbar';

const StockHealthReportPage = () => {
  const healthStats = [
    { label: 'Overall Health', value: '94%', change: '+2.4%', meta: 'System stability', icon: '🏥', color: 'bg-blue-50 text-blue-600' },
    { label: 'Turnover Rate', value: '4.2x', change: '+0.5', meta: 'Annualized', icon: '🔄', color: 'bg-green-50 text-green-600' },
    { label: 'Stock Accuracy', value: '98.5%', change: '-0.2%', meta: 'Last audit', icon: '🎯', color: 'bg-purple-50 text-purple-600' },
    { label: 'Fill Rate', value: '92.8%', change: '+1.8%', meta: 'Order fulfillment', icon: '📈', color: 'bg-orange-50 text-orange-600' },
  ];

  const healthMetrics = [
    { name: 'Dead Stock', value: 'KSh 124,000', percentage: 5, color: 'bg-red-500', description: 'Items with no sales in 90+ days' },
    { name: 'Slow Moving', value: 'KSh 450,000', percentage: 18, color: 'bg-orange-500', description: 'Items with low velocity' },
    { name: 'Healthy Stock', value: 'KSh 1,826,000', percentage: 77, color: 'bg-green-500', description: 'Optimal stock levels' },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <InventoryNavbar activeTab="Overview" onTabChange={() => {}} slim={true} />

      <div className="flex-1 p-4 md:p-4 lg:p-10 pt-0 md:pt-0 lg:pt-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Link href="/inventory" className="text-[10px] font-black text-blue-400 uppercase hover:text-blue-600 transition-colors flex items-center mb-2">
              ← Back to Inventory
            </Link>
            <h1 className="text-2xl md:text-3xl font-black text-blue-950 uppercase">Full Stock Health Report</h1>
            <p className="text-xs font-bold text-gray-400 uppercase">Detailed analysis of inventory efficiency and performance</p>
          </div>
          <button className="px-6 py-3 bg-blue-950 text-white rounded-sm text-[10px] font-black uppercase hover:bg-blue-900 transition-all shadow-lg active:scale-95">
            Export Report (PDF)
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthStats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                  stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-3xl font-black text-gray-800 tracking-tight mt-1">{stat.value}</h4>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{stat.meta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Composition */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl">
            <h3 className="text-sm font-black text-blue-950 uppercase tracking-widest mb-8 flex items-center">
              <span className="mr-3">📊</span> Stock Health Composition
            </h3>
            
            <div className="space-y-8">
              {healthMetrics.map((metric) => (
                <div key={metric.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-gray-800 uppercase tracking-tight">{metric.name}</span>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{metric.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-gray-800">{metric.value}</span>
                      <p className="text-[10px] font-black text-blue-500">{metric.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${metric.color} opacity-80`} 
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
              <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2">Health Insight</h4>
              <p className="text-xs font-bold text-blue-800 leading-relaxed">
                Your dead stock has decreased by 2% this month. Consider running a clearance sale for the "Slow Moving" items to improve turnover rate and free up capital.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-900 to-blue-950 p-8 rounded-[3rem] text-white shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-blue-200">System Recommendations</h3>
              <div className="space-y-4">
                {[
                  'Reorder 12 low stock items',
                  'Audit Electronics category',
                  'Check 5 expired batches',
                  'Update cost prices'
                ].map((task, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <span className="w-6 h-6 rounded-lg bg-blue-400/20 flex items-center justify-center text-[10px] font-black group-hover:bg-blue-400 transition-colors">
                      {i + 1}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest">{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest mb-6">Last Audit Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</span>
                  <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">May 24, 2026</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Auditor</span>
                  <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">John Doe</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Discrepancy</span>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">-0.15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockHealthReportPage;
