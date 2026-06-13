'use client';

import React, { useState } from 'react';

/**
 * RestockOverview Component
 * 
 * Monitors inventory levels and provides automated restocking recommendations.
 */
const RestockOverview = () => {
  const [activeLevelFilter, setActiveLevelFilter] = useState('All Levels');

  const stockLevels = [
    { name: 'Samsung A55 5G', sku: 'SAM-A55', current: 8, max: 100, status: 'critical' },
    { name: 'Anker 65W Charger', sku: 'ANK-65W', current: 44, max: 200, status: 'low' },
    { name: 'Tecno Spark 20', sku: 'TEC-SP20', current: 42, max: 150, status: 'low' },
    { name: 'USB-C Cable 2m', sku: 'CAB-C2M', current: 370, max: 500, status: 'ok' },
    { name: 'Phone Case Univ.', sku: 'CAS-UNI', current: 183, max: 300, status: 'ok' },
  ];

  const alerts = [
    { type: 'critical', label: 'Critical — 4 products', sub: 'Stock below 10%. Immediate reorder recommended.', color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
    { type: 'low', label: 'Low — 11 products', sub: 'Stock below 30%. Plan reorder within 2 weeks.', color: 'bg-yellow-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
    { type: 'ok', label: 'OK — 32 products', sub: 'Adequate stock levels.', color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-700' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
      
      {/* STOCK LEVELS LIST */}
      <div className="flex-1 flex flex-col bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Stock Levels</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">47 products total</p>
          </div>
          <select 
            value={activeLevelFilter}
            onChange={(e) => setActiveLevelFilter(e.target.value)}
            className="bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none text-olive"
          >
            <option>All Levels</option>
            <option>Critical</option>
            <option>Low</option>
            <option>OK</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {stockLevels.map((item) => (
            <div key={item.sku} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-100 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight leading-none mb-1">{item.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-800">{item.current} <span className="text-[10px] text-gray-300 font-bold">/ {item.max}</span></p>
                  <p className={`text-[9px] font-black uppercase tracking-tighter ${
                    item.status === 'critical' ? 'text-red-500' : item.status === 'low' ? 'text-orange-500' : 'text-olive'
                  }`}>
                    {Math.round((item.current / item.max) * 100)}% Capacity
                  </p>
                </div>
              </div>
              <div className="h-1.5 bg-white rounded-full overflow-hidden flex shadow-inner">
                <div 
                  className={`h-full transition-all duration-500 ${
                    item.status === 'critical' ? 'bg-red-500' : item.status === 'low' ? 'bg-orange-400' : 'bg-olive'
                  }`}
                  style={{ width: `${(item.current / item.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESTOCK ALERTS SIDEBAR */}
      <div className="w-full md:w-80 flex flex-col space-y-6 shrink-0">
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-8 space-y-8">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em]">Restock Alerts</h3>
          
          <div className="space-y-6">
            {alerts.map((alert) => (
              <div key={alert.type} className={`p-4 rounded-2xl border-l-4 ${alert.bgColor} border-transparent`} style={{ borderLeftColor: alert.color.replace('bg-', '') }}>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${alert.color}`}></span>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${alert.textColor}`}>{alert.label}</p>
                </div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-relaxed">
                  {alert.sub}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-olive hover:bg-olive text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-md shadow-green-100 transition-all active:scale-95 flex items-center justify-center space-x-2">
            <span>⚡</span>
            <span>Auto-Generate Restock POs</span>
          </button>
        </div>

        <div className="p-6 bg-orange-500 rounded-[32px] text-white shadow-lg relative overflow-hidden group cursor-pointer">
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform"></div>
           <p className="text-[10px] font-black uppercase tracking-widest mb-2">Inventory Insight</p>
           <p className="text-[11px] font-bold leading-relaxed">
             Samsung A55 sales have spiked 40% this week. Consider increasing Max Stock to 150.
           </p>
        </div>
      </div>

    </div>
  );
};

export default RestockOverview;
