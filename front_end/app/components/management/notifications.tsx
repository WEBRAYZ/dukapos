'use client';

import React from 'react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      icon: '⚠️',
      title: 'Low Stock Alert — Apple AirPods Pro 2',
      description: 'Stock level has dropped to 7 units (below threshold of 10). Reorder recommended to avoid stockout.',
      time: '2 minutes ago',
      source: 'Inventory System',
      unread: true,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      id: 2,
      type: 'alert',
      icon: '🚨',
      title: 'Unusual Discount Activity — Rina Torres',
      description: 'Cashier Rina Torres applied $1,240 in discounts this month, significantly above the average of $490. Review recommended.',
      time: '1 hour ago',
      source: 'Sales Monitoring',
      unread: true,
      color: 'bg-red-50 text-red-600',
    },
    {
      id: 3,
      type: 'success',
      icon: '📦',
      title: 'Purchase Order #PO-2248 Approved',
      description: 'Your purchase order for 200 units of Nike Air Max 270 has been approved and dispatched by Supplier #SUP-041.',
      time: '3 hours ago',
      source: 'Purchasing',
      unread: true,
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 4,
      type: 'info',
      icon: '📊',
      title: 'Monthly Report Ready — May 2026',
      description: 'Your automated monthly P&L and sales summary report has been generated and is ready to download.',
      time: 'Today 09:00',
      source: 'Report Scheduler',
      unread: true,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      id: 5,
      type: 'user',
      icon: '👤',
      title: 'New User Invite Sent',
      description: 'Sarah Kim sent an invitation to invite-pending@pos.com for the Cashier role at Branch A. Awaiting acceptance.',
      time: 'Yesterday 16:45',
      source: 'User Management',
      unread: true,
      color: 'bg-brown/10 text-brown',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-800 uppercase">Notifications</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase">5 unread · 24 total</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-100 text-gray-700 rounded-sm text-[10px] font-black uppercase transition-all">
            Mark All Read
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-100 text-gray-700 rounded-sm text-[10px] font-black uppercase transition-all">
            Clear All
          </button>
          <button className="px-2 py-1 bg-olive text-white rounded-sm hover:bg-olive transition-all">
            <span className="">⚙️</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`group bg-white p-4 rounded-sm border transition-all cursor-pointer hover:shadow-xl flex items-start space-x-6 ${
              n.unread ? 'border-olive/20' : 'border-gray-100'
            }`}
          >
            <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-2xl shrink-0 shadow-inner group-hover:scale-110 transition-transform ${n.color}`}>
              {n.icon}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-800 uppercase">{n.title}</h3>
                {n.unread && (
                  <span className="w-2 h-2 bg-orange-800 rounded-full" />
                )}
              </div>
              <p className="text-xs font-medium text-gray-700">
                {n.description}
              </p>
              <div className="flex items-center space-x-3 pt-1">
                <span className="text-[10px] font-bold text-gray-700 uppercase">{n.time}</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="text-[10px] font-bold text-olive uppercase">{n.source}</span>
              </div>
            </div>

            <div className="opacity-60 group-hover:opacity-100 transition-opacity">
               <button className="p-2 text-gray-700 hover:text-red-500 transition-colors">
                 ✕
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Older Notifications Placeholder */}
      <div className="text-center">
        <button className="text-[10px] font-black text-gray-600 uppercase hover:text-olive transition-colors">
          Load Older Notifications ↓
        </button>
      </div>
    </div>
  );
};

export default Notifications;
