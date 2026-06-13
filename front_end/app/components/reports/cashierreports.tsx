'use client';

import React from 'react';

const CashierReports = () => {
  const stats = [
    { label: 'Active Cashiers', value: '8', change: '', meta: 'This period', icon: '👤', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Avg. per Cashier', value: '$10,540', change: '▲ vs $9,800 prev.', meta: '', icon: '💰', color: 'bg-green-50 text-green-600' },
    { label: 'Top Performer', value: 'Sarah K.', change: '', meta: '$18,240 revenue', icon: '🏆', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Discrepancies', value: '2', change: '▼', meta: 'Requires review', icon: '⚠', color: 'bg-red-50 text-red-600' },
  ];

  const cashierData = [
    { name: 'Sarah Kim', branch: 'Main', transactions: 412, revenue: 18240, avgTicket: 44.27, discounts: 820, target: 96, rating: 5, alert: false },
    { name: 'David Osei', branch: 'Main', transactions: 380, revenue: 16720, avgTicket: 44.00, discounts: 610, target: 88, rating: 4, alert: false },
    { name: 'Mei Lin', branch: 'Branch A', transactions: 295, revenue: 12100, avgTicket: 41.02, discounts: 440, target: 72, rating: 4, alert: false },
    { name: 'James Okafor', branch: 'Branch B', transactions: 218, revenue: 8950, avgTicket: 41.06, discounts: 280, target: 59, rating: 3, alert: false },
    { name: 'Rina Torres', branch: 'Branch B', transactions: 187, revenue: 7120, avgTicket: 38.07, discounts: 1240, target: 42, rating: 2, alert: true },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className={`text-sm ${s <= rating ? 'text-blue-400' : 'text-gray-200'}`}>⭐</span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-2 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-lg shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              {stat.change && (
                <div className="flex items-center space-x-1 text-[9px] font-black px-2 py-1 rounded-lg bg-green-50 text-green-600">
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase">{stat.label}</p>
              <h4 className="text-2xl font-black text-blue-800">{stat.value}</h4>
              <p className="text-[9px] font-bold text-gray-800 uppercase">{stat.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cashier Performance Table */}
      <div className="bg-white rounded-sm border border-blue-100 shadow-xl overflow-hidden">
        <div className="p-2 border-b border-blue-100">
          <h3 className="text-lg font-bold text-blue-800 uppercase">Cashier Performance · May 2026</h3>
          <p className="text-[10px] font-bold text-gray-600 uppercase">Transaction and Revenue breakdown by staff</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase ">Cashier</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">Branch</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Transactions</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">Revenue</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">Avg. Ticket</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">Discounts</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase">vs Target</th>
                <th className="px-3 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cashierData.map((cashier, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500">
                        {cashier.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-800 uppercase">{cashier.name}</span>
                        {cashier.alert && <span className="text-red-500 animate-pulse">⚠</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs font-bold text-gray-500 uppercase">{cashier.branch}</span>
                  </td>
                  <td className="px-3 py-3 text-center text-sm font-black text-gray-800">{cashier.transactions}</td>
                  <td className="px-3 py-3 text-sm font-black text-olive">
                    ${cashier.revenue.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-400">${cashier.avgTicket.toFixed(2)}</td>
                  <td className="px-8 py-5 text-sm font-bold text-red-400">${cashier.discounts.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col space-y-1.5 w-24">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-800">{cashier.target}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            cashier.target >= 90 ? 'bg-green-500' : 
                            cashier.target >= 70 ? 'bg-olive' : 
                            cashier.target >= 50 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${cashier.target}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {renderStars(cashier.rating)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashierReports;
