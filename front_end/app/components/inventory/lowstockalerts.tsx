'use client';

import React, { useState } from 'react';

const LowStockAlerts = () => {
  const [urgencyFilter, setUrgencyFilter] = useState('All Urgency');

  const stats = [
    { label: 'Out of Stock', value: 6, subtitle: 'Immediate action needed', color: 'text-red-600', bgColor: 'bg-red-50' },
    { label: 'Low Stock', value: 14, subtitle: 'Below reorder point', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'POs Pending', value: 4, subtitle: 'Awaiting supplier delivery', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { label: 'Resolved Today', value: 3, subtitle: 'Restocked this morning', color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const alerts = [
    {
      id: 1,
      name: 'Casio G-Shock Classic',
      status: 'Out of Stock',
      sku: 'EL-0099',
      category: 'Electronics',
      lastSold: '30 May',
      reorder: '10 units',
      urgency: 'Critical',
      action: 'Order Now'
    },
    {
      id: 2,
      name: 'Instax Mini Film Pack',
      status: 'Out of Stock',
      sku: 'EL-0112',
      category: 'Electronics',
      reorder: '20 units',
      urgency: 'Critical',
      action: 'Order Now'
    },
    {
      id: 3,
      name: 'Nike Air Max 270',
      status: 'Low Stock',
      sku: 'FA-0188',
      category: 'Fashion',
      current: 9,
      reorderAt: 15,
      urgency: 'Warning',
      action: 'Restock'
    },
    {
      id: 4,
      name: 'L\'Oréal Revitalift Serum',
      status: 'Low Stock',
      sku: 'BE-0054',
      category: 'Beauty',
      current: 6,
      reorderAt: 12,
      urgency: 'Warning',
      action: 'Restock'
    },
    {
      id: 5,
      name: 'Tupperware 5L Set',
      status: 'Low Stock',
      sku: 'HL-0031',
      category: 'Home & Living',
      current: 4,
      reorderAt: 8,
      urgency: 'Warning',
      action: 'Restock'
    },
    {
      id: 6,
      name: 'Nivea Men Moisturiser',
      status: 'Low Stock',
      sku: 'BE-0071',
      category: 'Beauty',
      current: 7,
      reorderAt: 10,
      urgency: 'Warning',
      action: 'Restock'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Stats and Alerts List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-black text-gray-800 uppercase tracking-tight mt-1">{stat.label}</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Alerts List */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Active Alerts</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">20 items need attention · sorted by urgency</p>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                className="bg-gray-50 border-none text-[10px] font-black uppercase tracking-widest text-gray-500 px-4 py-2 rounded-xl outline-none"
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
              >
                <option>All Urgency</option>
                <option>Critical Only</option>
                <option>Warning Only</option>
              </select>
              <button className="px-4 py-2 bg-olive text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-olive transition-all">
                Create PO for All
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                      alert.status === 'Out of Stock' ? 'bg-red-50' : 'bg-orange-50'
                    }`}>
                      {alert.status === 'Out of Stock' ? '🚫' : '⚠️'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight">{alert.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          alert.status === 'Out of Stock' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        SKU: {alert.sku} · {alert.category} 
                        {alert.lastSold && ` · Last sold: ${alert.lastSold}`}
                        {alert.current !== undefined && ` · ${alert.current} units left`}
                        {alert.reorder && ` · Reorder: ${alert.reorder}`}
                        {alert.reorderAt && ` · Reorder at: ${alert.reorderAt}`}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-olive hover:text-olive transition-colors group-hover:translate-x-1 duration-300">
                    <span>{alert.action} Now</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50/50 text-center">
            <button className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-olive transition-colors">
              View All 20 Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Settings */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
              ⚙️
            </div>
            <h3 className="text-sm font-black text-olive uppercase tracking-tight">Alert Settings</h3>
          </div>
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Configure when alerts trigger and how notifications are sent.</p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Default Reorder Point</label>
              <input 
                type="number" 
                defaultValue={10}
                className="w-full bg-gray-50 border border-transparent rounded-2xl px-4 py-3 text-sm font-black focus:outline-none focus:bg-white focus:ring-2 focus:ring-olive transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Notify Via</label>
              <select className="w-full bg-gray-50 border border-transparent rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-olive focus:outline-none focus:bg-white focus:ring-2 focus:ring-olive transition-all">
                <option>Email + SMS (M-Pesa)</option>
                <option>Email Only</option>
                <option>SMS Only</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Notify Frequency</label>
              <select className="w-full bg-gray-50 border border-transparent rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-olive focus:outline-none focus:bg-white focus:ring-2 focus:ring-olive transition-all">
                <option>Immediately</option>
                <option>Daily Digest</option>
                <option>Weekly Summary</option>
              </select>
            </div>

            <button className="w-full py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-900/10 hover:bg-orange-600 transition-all mt-4">
              Save Preferences
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-olive p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-2 relative z-10">Pro Tip 💡</h4>
          <p className="text-[10px] font-bold text-white/80 leading-relaxed relative z-10">
            Automate your reordering by connecting to your preferred suppliers.
          </p>
          <button className="mt-4 text-[9px] font-black uppercase tracking-widest text-orange-300 hover:text-white transition-colors relative z-10">
            Set up automation →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowStockAlerts;
