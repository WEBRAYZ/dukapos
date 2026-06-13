'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const StockHealthReportModal = () => {
  const router = useRouter();

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
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
      {/* Dimmed Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => router.back()}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-white border-b border-blue-50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-sm flex items-center justify-center text-xl font-black shadow-inner">
              🏥
            </div>
            <div>
              <h3 className="text-xl font-black text-blue-950 uppercase">Full Stock Health Report</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase">Detailed analysis of inventory efficiency</p>
            </div>
          </div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-4 space-y-4 overflow-y-auto custom-scrollbar max-h-[75vh]">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthStats.map((stat) => (
              <div key={stat.label} className="bg-gray-50/50 p-3 rounded-sm border border-blue-100 flex flex-col justify-between group hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-9 h-9 rounded-sm ${stat.color} flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className={`flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-600 uppercase">{stat.label}</p>
                  <h4 className="text-2xl font-black text-gray-800">{stat.value}</h4>
                  <p className="text-[9px] font-bold text-slate-600 uppercase">{stat.meta}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Health Composition */}
            <div className="lg:col-span-2 bg-white p-4 rounded-sm border border-blue-100 shadow-sm">
              <h3 className="text-sm font-black text-blue-950 uppercase mb-4 flex items-center">
                <span className="mr-3">📊</span> Stock Health Composition
              </h3>
              
              <div className="space-y-4">
                {healthMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-gray-800 uppercase">{metric.name}</span>
                        <p className="text-[10px] font-bold text-gray-600 uppercase">{metric.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-gray-800">{metric.value}</span>
                        <p className="text-[10px] font-black text-blue-500">{metric.percentage}%</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${metric.color} opacity-80`} 
                        style={{ width: `${metric.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-950 p-4 rounded-sm text-white shadow-sm flex flex-col">
              <h3 className="text-xs font-black uppercase mb-3 text-blue-200">System Insights</h3>
              <div className="space-y-3 flex-1">
                {[
                  'Dead stock decreased by 2% this month',
                  '12 items reached reorder point',
                  'Audit suggests 0.15% variance',
                  'Cost prices updated for 5 SKUs'
                ].map((task, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-white/5 rounded-sm border border-white/10">
                    <span className="text-blue-400 text-lg">✦</span>
                    <span className="text-[10px] font-black uppercase">{task}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-4 bg-blue-500 text-white rounded-sm text-[10px] font-black uppercase hover:bg-blue-600 transition-all active:scale-95">
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50/50 border-t border-blue-50 text-center">
          <p className="text-[10px] font-black text-gray-600 uppercase">Generated on June 7, 2026 · NDUKAPOS Analytics Engine</p>
        </div>
      </div>
    </div>
  );
};

export default StockHealthReportModal;
