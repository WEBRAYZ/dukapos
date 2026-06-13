'use client';

import React from 'react';

const InventoryReports = () => {
  const stats = [
    { label: 'Total SKUs', value: '1,284', change: '', meta: 'Across all branches', icon: '📦', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Stock Value', value: '$214k', change: '▲ 4.2%', meta: 'this month', icon: '💰', color: 'bg-green-50 text-green-600' },
    { label: 'Turnover Rate', value: '4.2x', change: '▲', meta: 'Healthy turnover', icon: '🔄', color: 'bg-orange-50 text-orange-600' },
    { label: 'Low Stock Items', value: '23', change: '▼', meta: 'Needs reorder', icon: '⚠️', color: 'bg-red-50 text-red-600' },
  ];

  const inventoryData = [
    { product: 'iPhone 15 Pro 256GB', opening: 220, received: 100, sold: 184, adj: 0, closing: 136, value: 136000, alert: 'OK' },
    { product: 'Samsung 4K QLED 55"', opening: 45, received: 20, sold: 38, adj: -1, closing: 26, value: 26000, alert: 'Low' },
    { product: 'Nike Air Max 270', opening: 310, received: 200, sold: 241, adj: 0, closing: 269, value: 32280, alert: 'OK' },
    { product: 'Organic Green Tea 100pk', opening: 980, received: 500, sold: 512, adj: -8, closing: 960, value: 11520, alert: 'OK' },
    { product: 'Sony WH-1000XM5', opening: 80, received: 30, sold: 63, adj: 0, closing: 47, value: 16450, alert: 'OK' },
    { product: 'Apple AirPods Pro 2', opening: 15, received: 10, sold: 18, adj: 0, closing: 7, value: 1750, alert: 'Critical' },
  ];

  const getAlertStyle = (alert: string) => {
    switch (alert) {
      case 'OK': return 'bg-green-100 text-green-700';
      case 'Low': return 'bg-orange-100 text-orange-700';
      case 'Critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              {stat.change && (
                <div className={`flex items-center space-x-1 text-[10px] font-black px-2.5 py-1.5 rounded-lg ${
                  stat.label === 'Low Stock Items' ? 'bg-green-50 text-green-600' : 'bg-green-50 text-green-600'
                }`}>
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase">{stat.label}</p>
              <h4 className="text-2xl font-black text-blue-800">{stat.value}</h4>
              <p className="text-[9px] font-bold text-gray-600 uppercase">{stat.meta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Inventory Summary Table */}
        <div className="bg-white rounded-sm border border-blue-100 shadow-xl overflow-hidden">
          <div className="p-5 border-b border-blue-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-blue-800 uppercase">Stock Movement Summary</h3>
              <p className="text-[10px] font-bold text-blue-400 uppercase">May 2026 Inventory Analysis</p>
            </div>
            <div className="flex items-center space-x-6">
               <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Stock In</p>
                  <p className="text-sm font-black text-green-600">1,840 units</p>
               </div>
               <div className="w-px h-8 bg-gray-100" />
               <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-600 uppercase">Stock Out</p>
                  <p className="text-sm font-black text-orange-600">2,841 units</p>
               </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">Product</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Opening</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Received</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Sold</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Adj.</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Closing</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">Value</th>
                  <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inventoryData.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                    <td className="px-3 py-3">
                      <span className="text-xs font-black text-gray-800 uppercase block max-w-[240px]">{item.product}</span>
                    </td>
                    <td className="px-3 py-3 text-center text-xs font-bold text-gray-600">{item.opening}</td>
                    <td className="px-3 py-3 text-center">
                      <span className="text-xs font-black text-green-600">+{item.received}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="text-xs font-black text-blue-600">-{item.sold}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`text-xs font-bold ${item.adj < 0 ? 'text-red-500' : 'text-gray-600'}`}>{item.adj === 0 ? '—' : item.adj}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-gray-800">{item.closing}</span>
                        <div className="w-12 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.alert === 'Critical' ? 'bg-red-500' : item.alert === 'Low' ? 'bg-orange-500' : 'bg-olive'}`}
                            style={{ width: `${Math.min((item.closing / item.opening) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm font-black text-olive">
                      ${item.value.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase flex items-center justify-center w-fit ml-auto ${getAlertStyle(item.alert)}`}>
                        {item.alert === 'Critical' && <span className="mr-1">⚠</span>}
                        {item.alert}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 bg-gray-50/50 border-t border-blue-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-800 uppercase">Detailed breakdown of stock velocity and adjustments</p>
            <button className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-sm text-[10px] font-black uppercase hover:bg-blue-50 transition-all shadow-sm">
              Full Inventory Audit →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReports;
