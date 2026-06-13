'use client';

import React from 'react';
import Link from 'next/link';

const DashboardOverview = () => {
  const stats = [
    { label: 'Today\'s Sales', value: 'KSh 124,500', change: '+12.5%', icon: '💰', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Orders', value: '18', change: '+2', icon: '🧾', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Low Stock Items', value: '14', change: '+3', icon: '⚠️', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'New Customers', value: '24', change: '+5', icon: '👥', color: 'text-brown', bg: 'bg-brown/10' },
  ];

  const quickActions = [
    { name: 'New Sale', icon: '🛒', href: '/pos', color: 'bg-orange-500' },
    { name: 'Add Product', icon: '📦', href: '/products', color: 'bg-olive' },
    { name: 'Reports', icon: '📊', href: '/reports', color: 'bg-yellow-500' },
    { name: 'Inventory', icon: '▦', href: '/inventory', color: 'bg-brown' },
  ];

  const recentActivity = [
    { id: 1, action: 'Sale Completed', detail: 'ORD-8812 - KSh 4,500', time: '2m ago', icon: '✅' },
    { id: 2, action: 'Stock Alert', detail: 'Samsung A54 is low (5 left)', time: '15m ago', icon: '⚠️' },
    { id: 3, action: 'New Supplier', detail: 'Added "Tech World Ltd"', time: '1h ago', icon: '🚚' },
    { id: 4, action: 'Shift Started', detail: 'Cashier: lucia.v - Terminal 1', time: '3h ago', icon: '🕒' },
  ];

  return (
    <div className="flex flex-col p-4 space-y-3">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-black text-slate-800 uppercase">Dashboard <span className="text-olive">Overview</span></h1>
              <p className="text-xs font-bold text-slate-600 uppercase">Welcome back, Admin · Monday, June 1, 2026</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-6 py-3 bg-white border border-gray-100 rounded-sm text-[10px] font-black uppercase text-blue-800 hover:text-gray-800 transition-all shadow-sm">
                Download Report
              </button>
              <button className="px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase  shadow-lg shadow-olive/20 active:scale-95 transition-all">
                + Custom Widget
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-default">
                <div className="flex items-center justify-between mb-1">
                  <div className={`w-8 h-8 rounded-sm ${stat.bg} flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-1 rounded-full">
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-600 uppercase">{stat.label}</p>
                  <h4 className={`text-xl font-black ${stat.color} mt-1`}>{stat.value}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-2">
              <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm">
                <h3 className="text-sm font-black text-gray-800 uppercase mb-3 flex items-center">
                  <span className="mr-3">⚡</span> Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action) => (
                    <Link key={action.name} href={action.href} className="flex flex-col items-center space-y-3 group">
                      <div className={`w-10 h-10 ${action.color} rounded-sm flex items-center justify-center text-2xl text-white shadow-lg group-hover:rotate-12 transition-all group-active:scale-90`}>
                        {action.icon}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase group-hover:text-slate-800 transition-colors">
                        {action.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black text-blue-800 uppercase flex items-center">
                    <span className="mr-3">🕒</span> Recent Activity
                  </h3>
                  <button className="text-[10px] font-black text-olive uppercase hover:underline">View All Logs</button>
                </div>
                <div className="space-y-3">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 group">
                      <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-lg border border-blue-100 group-hover:bg-yellow-50 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-black text-slate-800 uppercase">{item.action}</p>
                          <p className="text-[10px] font-bold text-slate-600 uppercase">{item.detail}</p>
                        </div>
                        <span className="text-[9px] font-black text-slate-500 uppercase">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Health / Status */}
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-sm shadow-sm border border-blue-100 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-olive rounded-full opacity-5 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                
                <h3 className="text-sm font-black text-slate-800 uppercase mb-5 relative z-10 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" />
                  System Status
                </h3>
                
                <div className="space-y-3 relative z-10">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-700 uppercase">Database Sync</span>
                      <span className="text-[10px] font-black text-green-500 uppercase">Stable</span>
                    </div>
                    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-green-500 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-700 uppercase">Storage (12.5 TB)</span>
                      <span className="text-[10px] font-black text-blue-400 uppercase">26.8% Used</span>
                    </div>
                    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                      <div className="w-[26.8%] h-full bg-blue-400 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase">eTIMS Link</span>
                      <span className="text-[10px] font-black text-green-500 uppercase">Connected</span>
                    </div>
                    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-green-500 rounded-full" />
                    </div>
                  </div>

                  <Link href="/management" className="block w-full py-3 bg-olive hover:bg-olive/90 text-white text-center rounded-sm text-[10px] font-black uppercase transition-all shadow-lg shadow-olive/20">
                    System Management →
                  </Link>
                </div>
              </div>

              <div className="bg-linear-to-l from-blue-800 to-blue-950 p-4 rounded-sm shadow-sm shadow-blue-500/20 text-white group">
                <h3 className="text-sm font-black uppercase mb-1">Need Help?</h3>
                <p className="text-[10px] font-bold text-blue-100 uppercase mb-4">Our support team is available 24/7 for our retail partners.</p>
                <button className="w-full py-3 bg-white text-blue-500 rounded-sm text-[10px] font-black uppercase shadow-lg group-hover:scale-105 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
    </div>
  );
};

export default DashboardOverview;
