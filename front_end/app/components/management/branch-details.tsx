'use client';

import React, { useState } from 'react';

interface BranchDetailsProps {
  branch: any;
  onBack: () => void;
}

const BranchDetails: React.FC<BranchDetailsProps> = ({ branch, onBack }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isManagingShifts, setIsManagingShifts] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);

  const tabs = ['Overview', 'Sales', 'Inventory', 'Suppliers', 'Staff', 'Customers', 'Branch Info'];

  // Use data from the passed branch prop where available, otherwise fallback to detailed mock data
  const detailedBranch = {
    code: branch.id || 'WLD-001',
    name: branch.name || 'Westlands Main Branch',
    status: branch.status || 'Open',
    type: branch.type || 'Retail / Wholesale / Supermarket',
    address: branch.address || 'Sarit Centre, Ground Floor, Westlands, Nairobi',
    phone: branch.phone || '+254 20 374 5100',
    terminals: branch.terminals || 8,
    manager: branch.manager || 'Grace Akinyi Ouma',
    region: branch.region || 'Nairobi West',
    established: branch.established || '2017',
    posVersion: branch.posVersion || 'NexusPOS v4.2.1',
    todaySales: branch.revenue ? `KES ${branch.revenue.toLocaleString()}` : 'KES 284,500',
    salesGrowth: branch.salesGrowth || '+12.4%',
    ordersToday: branch.transactions ? branch.transactions.toLocaleString() : '1,043',
    ordersGrowth: branch.ordersGrowth || '+8.1%',
    stockItems: branch.stockItems || '4,872',
    lowStock: branch.lowStock || '23 low',
    activeStaff: branch.staff ? `${branch.staff} / 41` : '34 / 41',
    email: branch.email || 'westlands@nexuspos.co.ke',
    salesTarget: branch.salesTarget || 'KES 300K',
    inventoryHealth: branch.inventoryHealth || 'Good',
    fulfillmentRate: branch.fulfillmentRate || '98.6%'
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500">
          <button onClick={onBack} className="hover:text-olive transition-colors">NEXUSPOS SYSTEM</button>
          <span>›</span>
          <button onClick={onBack} className="hover:text-olive transition-colors">BRANCHES</button>
          <span>›</span>
          <span className="text-olive">{detailedBranch.code}</span>
        </div>
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-sm text-[10px] font-black uppercase transition-all"
        >
          ← Back to List
        </button>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-blue-100 shadow-sm p-6 rounded-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-50 rounded-sm flex items-center justify-center text-3xl shadow-inner border border-blue-50">
              🏪
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-black text-gray-800 uppercase leading-none">{detailedBranch.name}</h1>
                <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-sm border border-green-100 uppercase">
                  {detailedBranch.status}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs font-bold text-gray-600 uppercase">
                <span>{detailedBranch.code}</span>
                <span>•</span>
                <span>{detailedBranch.type}</span>
              </div>
              <div className="flex flex-col space-y-1 mt-2">
                <p className="text-xs font-medium text-gray-700 flex items-center">
                  <span className="mr-2">📍</span> {detailedBranch.address}
                </p>
                <div className="flex flex-wrap gap-4 mt-1">
                  <p className="text-xs font-medium text-gray-700 flex items-center">
                    <span className="mr-2">📞</span> {detailedBranch.phone}
                  </p>
                  <p className="text-xs font-medium text-gray-700 flex items-center">
                    <span className="mr-2">🖥</span> {detailedBranch.terminals} POS Terminals
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-blue-50 lg:pl-6">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-gray-500 uppercase">Manager</p>
              <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.manager}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-gray-500 uppercase">Region</p>
              <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.region}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-gray-500 uppercase">Since</p>
              <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.established}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black text-gray-500 uppercase">POS Version</p>
              <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.posVersion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-sm bg-yellow-50 flex items-center justify-center text-lg">💰</div>
            <span className="text-[10px] font-black text-green-500 bg-green-50 px-1.5 py-0.5 rounded-sm">{detailedBranch.salesGrowth}</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Today's Sales</p>
            <h4 className="text-xl font-black text-gray-800">{detailedBranch.todaySales}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center text-lg">🧾</div>
            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-sm">{detailedBranch.ordersGrowth}</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Orders Today</p>
            <h4 className="text-xl font-black text-gray-800">{detailedBranch.ordersToday}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-sm bg-olive/10 flex items-center justify-center text-lg">📦</div>
            <span className="text-[10px] font-black text-red-500 bg-red-50 px-1.5 py-0.5 rounded-sm">{detailedBranch.lowStock}</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Stock Items</p>
            <h4 className="text-xl font-black text-gray-800">{detailedBranch.stockItems}</h4>
          </div>
        </div>

        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-sm bg-green-50 flex items-center justify-center text-lg">👥</div>
            <span className="text-[10px] font-black text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-sm">on shift</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Active Staff</p>
            <h4 className="text-xl font-black text-gray-800">{detailedBranch.activeStaff}</h4>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-blue-100 flex items-center space-x-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-[10px] font-black uppercase transition-all border-b-2 ${
              activeTab === tab 
                ? 'border-olive text-olive bg-olive/5' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content - Overview */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-4 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Quick Performance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 border border-blue-50 rounded-sm">
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Sales Target (Today)</p>
                  <p className="text-lg font-black text-gray-800">{detailedBranch.salesTarget}</p>
                  <div className="w-full bg-gray-200 h-1.5 mt-2 rounded-full overflow-hidden">
                    <div className="bg-olive h-full" style={{ width: '94.8%' }}></div>
                  </div>
                  <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase text-right">94.8% OF TARGET</p>
                </div>
                <div className="p-4 bg-gray-50 border border-blue-50 rounded-sm">
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Inventory Health</p>
                  <p className="text-lg font-black text-green-600 uppercase">{detailedBranch.inventoryHealth}</p>
                  <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase">23 ITEMS BELOW THRESHOLD</p>
                </div>
                <div className="p-4 bg-gray-50 border border-blue-50 rounded-sm">
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Staff Present</p>
                  <p className="text-lg font-black text-gray-800">{detailedBranch.activeStaff}</p>
                  <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase">7 STAFF OFF-DUTY</p>
                </div>
                <div className="p-4 bg-gray-50 border border-blue-50 rounded-sm">
                  <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Orders Fulfilled</p>
                  <p className="text-lg font-black text-blue-600">{detailedBranch.fulfillmentRate}</p>
                  <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase">LAST 24 HOURS</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm h-64 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                📊
              </div>
              <h4 className="text-sm font-black text-gray-800 uppercase">Branch Activity Feed</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase mt-1 max-w-xs">Recent branch updates, sync logs and manager notes will appear here.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-4 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Contact & Location
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Address</p>
                  <p className="text-xs font-bold text-gray-800">{detailedBranch.address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Phone</p>
                  <p className="text-xs font-bold text-gray-800">{detailedBranch.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Email</p>
                  <p className="text-xs font-bold text-gray-800">{detailedBranch.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Region</p>
                  <p className="text-xs font-bold text-gray-800 uppercase">{detailedBranch.region}</p>
                </div>
                <div className="pt-2">
                  <button className="w-full py-2 bg-slate-800 text-white text-[10px] font-black uppercase rounded-sm hover:bg-black transition-all">
                    Open in Maps
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-olive/5 border border-olive/20 p-6 rounded-sm">
              <h3 className="text-[10px] font-black text-olive uppercase mb-4 flex items-center">
                🛡 SYSTEM INFO
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Established</span>
                  <span className="text-[10px] font-black text-gray-800">{detailedBranch.established}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-600 uppercase">POS Version</span>
                  <span className="text-[10px] font-black text-gray-800">{detailedBranch.posVersion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Last Sync</span>
                  <span className="text-[10px] font-black text-green-600">JUST NOW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Sales */}
      {activeTab === 'Sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {/* Weekly Sales Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-gray-800 uppercase flex items-center">
                  <span className="w-1 h-4 bg-olive mr-2"></span>
                  Weekly Sales — This Week
                </h3>
                <div className="text-[10px] font-black text-gray-400 uppercase">June 1 - June 7</div>
              </div>

              <div className="flex items-end justify-between h-48 gap-2 pt-4">
                {[
                  { day: 'Mon', value: '182K', height: '45%', change: '▲' },
                  { day: 'Tue', value: '210K', height: '55%', change: '▲' },
                  { day: 'Wed', value: '195K', height: '50%', change: '▲' },
                  { day: 'Thu', value: '243K', height: '65%', change: '▲' },
                  { day: 'Fri', value: '318K', height: '80%', change: '▲' },
                  { day: 'Sat', value: '412K', height: '100%', change: '▲' },
                  { day: 'Sun', value: '285K', height: '70%', change: '▲' },
                ].map((item) => (
                  <div key={item.day} className="flex-1 flex flex-col items-center group">
                    <div className="mb-2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-black text-green-600">{item.change}</span>
                      <span className="text-[10px] font-black text-gray-800">{item.value}</span>
                    </div>
                    <div 
                      className="w-full bg-blue-100 group-hover:bg-olive transition-colors rounded-t-sm" 
                      style={{ height: item.height }}
                    ></div>
                    <div className="mt-3 text-[10px] font-black text-gray-500 uppercase">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Categories */}
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-6 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Top Selling Categories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Beverages', units: '412', revenue: '82,100', color: 'bg-blue-50 text-blue-600' },
                  { name: 'Fresh Produce', units: '631', revenue: '54,300', color: 'bg-green-50 text-green-600' },
                  { name: 'Household', units: '289', revenue: '47,200', color: 'bg-purple-50 text-purple-600' },
                  { name: 'Snacks & Confection', units: '548', revenue: '31,800', color: 'bg-yellow-50 text-yellow-600' },
                ].map((cat) => (
                  <div key={cat.name} className="flex items-center p-4 border border-blue-50 rounded-sm hover:border-olive/30 transition-all">
                    <div className={`w-10 h-10 rounded-sm ${cat.color} flex items-center justify-center font-black text-xs mr-4`}>
                      {cat.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-gray-800 uppercase">{cat.name}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">{cat.units} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-olive uppercase">KES {cat.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-6 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Today by Payment Method
              </h3>
              <div className="space-y-5">
                {[
                  { name: 'M-Pesa', amount: '148,200', percentage: 52, color: 'bg-green-500' },
                  { name: 'Cash', amount: '79,800', percentage: 28, color: 'bg-yellow-500' },
                  { name: 'Card (Visa/MC)', amount: '42,700', percentage: 15, color: 'bg-blue-500' },
                  { name: 'Credit / Account', amount: '13,800', percentage: 5, color: 'bg-gray-400' },
                ].map((pm) => (
                  <div key={pm.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-700 uppercase">{pm.name}</span>
                      <span className="text-[10px] font-black text-gray-800">KES {pm.amount}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`${pm.color} h-full`} style={{ width: `${pm.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-sm text-white">
              <h3 className="text-[10px] font-black text-gray-400 uppercase mb-4">Quick Sales Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-green-400 text-xs">▲</span>
                  <p className="text-[10px] font-bold leading-relaxed text-gray-300 uppercase">
                    M-Pesa transactions are up <span className="text-white font-black">18.4%</span> compared to last Monday.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-400 text-xs">ℹ</span>
                  <p className="text-[10px] font-bold leading-relaxed text-gray-300 uppercase">
                    Peak sales hour today was <span className="text-white font-black">12:30 PM - 1:45 PM</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Inventory */}
      {activeTab === 'Inventory' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Inventory Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Total SKUs</p>
              <h4 className="text-2xl font-black text-gray-800">4,872</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Unique products in stock</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1 text-red-500">Low Stock Alerts</p>
              <h4 className="text-2xl font-black text-red-600">33</h4>
              <p className="text-[9px] font-bold text-red-400 uppercase mt-1">Requiring immediate restock</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Total Stock Value</p>
              <h4 className="text-2xl font-black text-olive">KES 12.8M</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Current asset value</p>
            </div>
          </div>

          {/* Stock by Category Table */}
          <div className="bg-white border border-blue-100 rounded-sm shadow-sm overflow-hidden">
            <div className="p-6 border-b border-blue-50">
              <h3 className="text-sm font-black text-gray-800 uppercase flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Stock by Category
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-blue-100">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase">Category</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase text-center">Items</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase text-center">Low Stock</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase text-center">Stock Value</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase text-right">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {[
                    { name: 'Fresh Produce', items: '312', low: '⚠ 8', value: '1.2M', level: 82, color: 'bg-green-500' },
                    { name: 'Beverages', items: '204', low: '⚠ 3', value: '890K', level: 67, color: 'bg-blue-500' },
                    { name: 'Household', items: '518', low: '⚠ 14', value: '2.1M', level: 91, color: 'bg-purple-500' },
                    { name: 'Electronics', items: '87', low: '⚠ 2', value: '4.8M', level: 55, color: 'bg-yellow-500' },
                    { name: 'Apparel', items: '643', low: '✓ OK', value: '3.3M', level: 78, color: 'bg-olive' },
                    { name: 'Pharmaceuticals', items: '229', low: '⚠ 6', value: '560K', level: 60, color: 'bg-red-500' },
                  ].map((cat) => (
                    <tr key={cat.name} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-xs font-black text-gray-800 uppercase group-hover:text-olive">{cat.name}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-bold text-gray-700">{cat.items}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-sm border ${
                          cat.low.includes('⚠') 
                            ? 'bg-red-50 text-red-600 border-red-100' 
                            : 'bg-green-50 text-green-600 border-green-100'
                        }`}>
                          {cat.low}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-black text-gray-800 uppercase">KES {cat.value}</span>
                      </td>
                      <td className="px-6 py-4 text-right min-w-[140px]">
                        <div className="flex items-center justify-end space-x-3">
                          <span className="text-[10px] font-black text-gray-700">{cat.level}%</span>
                          <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`${cat.color} h-full transition-all duration-1000`} style={{ width: `${cat.level}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-blue-50 text-center">
              <button className="text-[10px] font-black text-olive uppercase hover:underline">
                View Full Inventory Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Suppliers */}
      {activeTab === 'Suppliers' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Supplier Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Active Suppliers</p>
              <h4 className="text-2xl font-black text-gray-800">28</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Verified Partners</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Pending Orders</p>
              <h4 className="text-2xl font-black text-blue-600">6</h4>
              <p className="text-[9px] font-bold text-blue-400 uppercase mt-1">Awaiting delivery</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">This Month Spend</p>
              <h4 className="text-2xl font-black text-olive">KES 4.2M</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Procurement volume</p>
            </div>
          </div>

          {/* Recent Supplier Orders */}
          <div className="bg-white border border-blue-100 rounded-sm shadow-sm">
            <div className="p-6 border-b border-blue-50 flex justify-between items-center">
              <h3 className="text-sm font-black text-gray-800 uppercase flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Recent Supplier Orders
              </h3>
              <button 
                onClick={() => setIsNewOrderModalOpen(true)}
                className="text-[10px] font-black text-olive uppercase hover:underline"
              >
                New Order +
              </button>
            </div>
            <div className="divide-y divide-blue-50">
              {[
                { initials: 'BA', name: 'Bidco Africa Ltd.', info: 'FMCG · Today, 07:30', amount: '142,000', status: 'Delivered', color: 'bg-green-50 text-green-600 border-green-100' },
                { initials: 'UK', name: 'Unilever Kenya', info: 'Consumer Goods · Yesterday', amount: '88,400', status: 'In Transit', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                { initials: 'DS', name: 'Davis & Shirtliff', info: 'Equipment · Jun 05', amount: '320,000', status: 'Pending', color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
                { initials: 'KL', name: 'Kenchic Limited', info: 'Poultry & Meat · Today, 05:00', amount: '67,200', status: 'Delivered', color: 'bg-green-50 text-green-600 border-green-100' },
                { initials: 'EA', name: 'EABL Distributors', info: 'Beverages · Jun 06', amount: '215,000', status: 'Confirmed', color: 'bg-purple-50 text-purple-600 border-purple-100' },
              ].map((order, i) => (
                <div key={i} className="p-4 hover:bg-blue-50/30 transition-all flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-50 border border-blue-50 rounded-sm flex items-center justify-center text-xs font-black text-gray-600 group-hover:bg-olive/10 group-hover:text-olive transition-colors">
                      {order.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-800 uppercase">{order.name}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">{order.info}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-xs font-black text-gray-800 uppercase">KES {order.amount}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">ORDER TOTAL</p>
                    </div>
                    <span className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase border ${order.color}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-blue-50 text-center">
              <button className="text-[10px] font-black text-gray-500 uppercase hover:text-olive transition-colors">
                View All Supplier Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Staff */}
      {activeTab === 'Staff' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Staff Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">On Shift Now</p>
              <h4 className="text-2xl font-black text-gray-800">34</h4>
              <p className="text-[9px] font-bold text-green-600 uppercase mt-1">Operational capacity</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Total Employees</p>
              <h4 className="text-2xl font-black text-gray-800">41</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Full branch roster</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Upcoming Shift</p>
              <h4 className="text-2xl font-black text-blue-600">14:00</h4>
              <p className="text-[9px] font-bold text-blue-400 uppercase mt-1">Next rotation</p>
            </div>
          </div>

          {/* Shift Roster Table */}
          <div className="bg-white border border-blue-100 rounded-sm shadow-sm overflow-hidden">
            <div className="p-6 border-b border-blue-50 flex justify-between items-center">
              <h3 className="text-sm font-black text-gray-800 uppercase flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Shift Roster
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 bg-gray-50 border border-blue-50 text-[9px] font-black uppercase text-gray-600 hover:bg-blue-50 rounded-sm transition-all">Export Roster</button>
                <button 
                  onClick={() => setIsManagingShifts(true)}
                  className="px-3 py-1.5 bg-olive text-white text-[9px] font-black uppercase rounded-sm hover:bg-black transition-all"
                >
                  Manage Shifts
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-blue-100">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase">Role</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase">Shift</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase text-center">Terminal</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-600 uppercase text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {[
                    { name: 'Brian Otieno', role: 'Cashier', shift: 'Morning 06:00–14:00', terminal: 'POS-3', status: 'On Shift', color: 'text-green-600 bg-green-50 border-green-100' },
                    { name: 'Winnie Chebet', role: 'Supervisor', shift: 'Morning 06:00–14:00', terminal: '—', status: 'On Shift', color: 'text-green-600 bg-green-50 border-green-100' },
                    { name: 'Moses Kamau', role: 'Cashier', shift: 'Afternoon 14:00–22:00', terminal: 'POS-1', status: 'Upcoming', color: 'text-blue-600 bg-blue-50 border-blue-100' },
                    { name: 'Faith Muthoni', role: 'Stock Clerk', shift: 'Morning 06:00–14:00', terminal: '—', status: 'On Shift', color: 'text-green-600 bg-green-50 border-green-100' },
                    { name: 'James Njoroge', role: 'Cashier', shift: 'Night 22:00–06:00', terminal: 'POS-5', status: 'Off', color: 'text-gray-400 bg-gray-50 border-gray-100' },
                    { name: 'Aisha Hassan', role: 'Customer Service', shift: 'Morning 06:00–14:00', terminal: '—', status: 'On Shift', color: 'text-green-600 bg-green-50 border-green-100' },
                  ].map((staff, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black border border-blue-100 group-hover:bg-olive/10 group-hover:text-olive group-hover:border-olive/20 transition-all">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs font-black text-gray-800 uppercase">{staff.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{staff.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-gray-700 uppercase">{staff.shift}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-black text-gray-800 uppercase">{staff.terminal}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase border ${staff.color}`}>
                          {staff.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-gray-50 border-t border-blue-50 text-center">
              <button className="text-[10px] font-black text-gray-500 uppercase hover:text-olive transition-colors">
                View Full Branch Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Customers */}
      {activeTab === 'Customers' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Customer Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Total Accounts</p>
              <h4 className="text-2xl font-black text-gray-800">3,847</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Registered customers</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1 text-orange-500">Accounts w/ Balance</p>
              <h4 className="text-2xl font-black text-orange-600">142</h4>
              <p className="text-[9px] font-bold text-orange-400 uppercase mt-1">Pending credit payments</p>
            </div>
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Avg. Spend / Visit</p>
              <h4 className="text-2xl font-black text-olive">KES 2,840</h4>
              <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Customer loyalty value</p>
            </div>
          </div>

          {/* Top Customer Accounts */}
          <div className="bg-white border border-blue-100 rounded-sm shadow-sm overflow-hidden">
            <div className="p-6 border-b border-blue-50 flex justify-between items-center">
              <h3 className="text-sm font-black text-gray-800 uppercase flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Top Customer Accounts
              </h3>
              <button 
                onClick={() => setIsAddingCustomer(true)}
                className="text-[10px] font-black text-olive uppercase hover:underline"
              >
                Add Customer +
              </button>
            </div>
            <div className="divide-y divide-blue-50">
              {[
                { initials: 'N', name: 'Naivas Holdings', type: 'Wholesale', visits: 142, spent: '1.84M', tier: 'Platinum', tierColor: 'text-blue-600 bg-blue-50 border-blue-100' },
                { initials: 'J', name: 'John Mwangi', type: 'Retail', visits: 88, spent: '312,000', bal: '-4,200', tier: 'Gold', tierColor: 'text-yellow-600 bg-yellow-50 border-yellow-100' },
                { initials: 'Z', name: 'Zara Boutique Ltd.', type: 'Wholesale', visits: 54, spent: '780,000', tier: 'Gold', tierColor: 'text-yellow-600 bg-yellow-50 border-yellow-100' },
                { initials: 'G', name: 'Grace Wanjiku', type: 'Retail', visits: 210, spent: '98,400', tier: 'Silver', tierColor: 'text-gray-500 bg-gray-50 border-gray-100' },
                { initials: 'E', name: 'Eastmatt Superstore', type: 'Wholesale', visits: 67, spent: '2.1M', bal: '-18,000', tier: 'Platinum', tierColor: 'text-blue-600 bg-blue-50 border-blue-100' },
              ].map((customer, i) => (
                <div key={i} className="p-4 hover:bg-blue-50/30 transition-all flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-50 border border-blue-50 rounded-sm flex items-center justify-center text-xs font-black text-gray-600 group-hover:bg-olive/10 group-hover:text-olive transition-colors">
                      {customer.initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs font-black text-gray-800 uppercase">{customer.name}</h4>
                        <span className={`px-1.5 py-0.5 rounded-sm text-[8px] font-black uppercase border ${customer.tierColor}`}>
                          {customer.tier}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">{customer.type} · {customer.visits} visits</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-xs font-black text-olive uppercase text-right">KES {customer.spent}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">TOTAL SPENT</p>
                    </div>
                    {customer.bal && (
                      <div className="text-right min-w-[100px]">
                        <p className="text-xs font-black text-red-500 uppercase">KES {customer.bal}</p>
                        <p className="text-[9px] font-bold text-red-300 uppercase">OUTSTANDING</p>
                      </div>
                    )}
                    <button className="p-2 hover:bg-white rounded-sm border border-transparent hover:border-blue-100 transition-all">
                      <span className="text-xs">⋮</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-50 border-t border-blue-50 text-center">
              <button className="text-[10px] font-black text-gray-500 uppercase hover:text-olive transition-colors">
                View All Customer Accounts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content - Branch Info */}
      {activeTab === 'Branch Info' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="space-y-6">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-6 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                General Information
              </h3>
              <div className="grid grid-cols-2 gap-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Branch Name</p>
                  <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Branch Code</p>
                  <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Business Type</p>
                  <p className="text-xs font-black text-gray-800 uppercase">{detailedBranch.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Establishment Date</p>
                  <p className="text-xs font-black text-gray-800 uppercase">Jan 12, {detailedBranch.established}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Registration ID</p>
                  <p className="text-xs font-black text-gray-800 uppercase">BN-KE-20170042</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase">Trading License</p>
                  <p className="text-xs font-black text-green-600 uppercase">VALID UNTIL DEC 2026</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-6 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Operational Hours
              </h3>
              <div className="space-y-3">
                {[
                  { days: 'Monday - Friday', hours: '08:00 AM - 09:00 PM', status: 'Open' },
                  { days: 'Saturday', hours: '09:00 AM - 08:00 PM', status: 'Open' },
                  { days: 'Sunday', hours: '10:00 AM - 06:00 PM', status: 'Open' },
                  { days: 'Public Holidays', hours: '10:00 AM - 04:00 PM', status: 'Reduced Hrs' },
                ].map((sched, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-blue-50 last:border-0">
                    <span className="text-[10px] font-black text-gray-600 uppercase">{sched.days}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-bold text-gray-800">{sched.hours}</span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase ${sched.status === 'Open' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
                        {sched.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-6 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                Management & Leadership
              </h3>
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-blue-600">GA</div>
                  <div>
                    <h4 className="text-xs font-black text-gray-800 uppercase">{detailedBranch.manager}</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Branch Manager · Level 4</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-gray-600">SM</div>
                  <div>
                    <h4 className="text-xs font-black text-gray-800 uppercase">Samuel Mwangi</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Assistant Manager</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-sm bg-olive/10 border border-olive/20 flex items-center justify-center text-xs font-black text-olive">NW</div>
                  <div>
                    <h4 className="text-xs font-black text-gray-800 uppercase">{detailedBranch.region} Lead</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Regional Operations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-blue-100 p-6 rounded-sm shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-6 flex items-center">
                <span className="w-1 h-4 bg-olive mr-2"></span>
                System & Hardware
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-600">
                  <span>POS Software</span>
                  <span className="font-black text-gray-800">{detailedBranch.posVersion}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-600">
                  <span>Active Terminals</span>
                  <span className="font-black text-gray-800">{detailedBranch.terminals} units</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-600">
                  <span>Receipt Printers</span>
                  <span className="font-black text-gray-800">12 (Epson T88)</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-600">
                  <span>Server Status</span>
                  <span className="font-black text-green-600">PRIMARY · ONLINE</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-600">
                  <span>Last Update</span>
                  <span className="font-black text-gray-800">May 24, 2026</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full py-4 border-2 border-dashed border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-400 hover:border-olive hover:text-olive transition-all"
            >
              Edit Branch Configuration
            </button>
          </div>
        </div>
      )}

      {/* Manage Shifts Modal */}
      {isManagingShifts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsManagingShifts(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-blue-50 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase">Manage Staff Shifts</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">Assign and rotate shifts for {detailedBranch.name}</p>
              </div>
              <button onClick={() => setIsManagingShifts(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors">✕</button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Employee</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>Select Employee...</option>
                    <option>Brian Otieno</option>
                    <option>Winnie Chebet</option>
                    <option>Moses Kamau</option>
                    <option>Faith Muthoni</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Shift Type</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>Morning (06:00 - 14:00)</option>
                    <option>Afternoon (14:00 - 22:00)</option>
                    <option>Night (22:00 - 06:00)</option>
                    <option>Custom Shift</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Assign Terminal</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>None (Off-Terminal)</option>
                    <option>POS-1 (Main Entrance)</option>
                    <option>POS-2 (West Wing)</option>
                    <option>POS-3 (Express Lane)</option>
                    <option>POS-5 (Customer Service)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Start Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">End Date (Optional)</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
              </div>

              <div className="pt-4 border-t border-blue-50">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-olive rounded-sm" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-700 uppercase">Notify Employee</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Send shift details via SMS/Email</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-blue-50 flex justify-end space-x-3">
              <button 
                onClick={() => setIsManagingShifts(false)}
                className="px-6 py-2.5 border border-blue-100 text-gray-600 text-[10px] font-black uppercase rounded-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsManagingShifts(false)}
                className="px-6 py-2.5 bg-olive text-white text-[10px] font-black uppercase rounded-sm hover:bg-black transition-all shadow-lg"
              >
                Assign Shift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsAddingCustomer(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-blue-50 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase">Register New Customer</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">Add a new account to {detailedBranch.name}</p>
              </div>
              <button onClick={() => setIsAddingCustomer(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors">✕</button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Customer / Company Name</label>
                  <input type="text" placeholder="e.g. Tuskys Ltd or Jane Doe" className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Account Type</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>Retail</option>
                    <option>Wholesale</option>
                    <option>Corporate</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Loyalty Tier</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Phone Number</label>
                  <input type="text" placeholder="+254 ..." className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Email Address</label>
                  <input type="email" placeholder="customer@email.com" className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
              </div>

              <div className="pt-4 border-t border-blue-50">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-olive rounded-sm" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-700 uppercase">Enable Credit Account</span>
                    <span className="text-[9px] font-bold text-gray-500 uppercase">Allow customer to purchase on credit</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-blue-50 flex justify-end space-x-3">
              <button 
                onClick={() => setIsAddingCustomer(false)}
                className="px-6 py-2.5 border border-blue-100 text-gray-600 text-[10px] font-black uppercase rounded-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsAddingCustomer(false)}
                className="px-6 py-2.5 bg-olive text-white text-[10px] font-black uppercase rounded-sm hover:bg-black transition-all shadow-lg"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Configuration Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsEditing(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-blue-50 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase">Edit Branch Configuration</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">Modify operational settings for {detailedBranch.code}</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors">✕</button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Branch Name</label>
                  <input type="text" defaultValue={detailedBranch.name} className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Branch Code</label>
                  <input type="text" defaultValue={detailedBranch.code} className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Business Type</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>{detailedBranch.type}</option>
                    <option>Retail Only</option>
                    <option>Wholesale Only</option>
                    <option>Supermarket Chain</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Branch Manager</label>
                  <input type="text" defaultValue={detailedBranch.manager} className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Physical Address</label>
                  <input type="text" defaultValue={detailedBranch.address} className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Contact Phone</label>
                  <input type="text" defaultValue={detailedBranch.phone} className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Contact Email</label>
                  <input type="email" defaultValue={detailedBranch.email} className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>
              </div>

              <div className="pt-4 border-t border-blue-50">
                <h4 className="text-[10px] font-black text-gray-800 uppercase mb-4">Operational Status</h4>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input type="radio" name="status" defaultChecked={detailedBranch.status === 'Open'} className="accent-olive" />
                    <span className="text-xs font-bold text-gray-700 uppercase group-hover:text-olive">Active / Open</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input type="radio" name="status" defaultChecked={detailedBranch.status === 'Reduced Hrs'} className="accent-olive" />
                    <span className="text-xs font-bold text-gray-700 uppercase group-hover:text-olive">Reduced Hours</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input type="radio" name="status" className="accent-olive" />
                    <span className="text-xs font-bold text-gray-700 uppercase group-hover:text-olive">Temporarily Closed</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-blue-50 flex justify-end space-x-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 border border-blue-100 text-gray-600 text-[10px] font-black uppercase rounded-sm hover:bg-gray-100 transition-all"
              >
                Discard
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 bg-slate-800 text-white text-[10px] font-black uppercase rounded-sm hover:bg-black transition-all shadow-lg"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsNewOrderModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-6 border-b border-blue-50 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-sm font-black text-gray-800 uppercase">Create New Supplier Order</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">Place a new procurement request for {detailedBranch.name}</p>
              </div>
              <button onClick={() => setIsNewOrderModalOpen(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-colors">✕</button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Supplier</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors">
                    <option>Select Supplier...</option>
                    <option>Bidco Africa Ltd.</option>
                    <option>Unilever Kenya</option>
                    <option>Davis & Shirtliff</option>
                    <option>Kenchic Limited</option>
                    <option>EABL Distributors</option>
                  </select>
                </div>
                
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Order Type</label>
                  <div className="flex space-x-4">
                    <label className="flex-1 flex items-center p-3 border border-blue-100 rounded-sm cursor-pointer hover:bg-blue-50 transition-all group">
                      <input type="radio" name="orderType" className="w-4 h-4 accent-olive" defaultChecked />
                      <span className="ml-3 text-[10px] font-black text-gray-700 uppercase">Standard Stock</span>
                    </label>
                    <label className="flex-1 flex items-center p-3 border border-blue-100 rounded-sm cursor-pointer hover:bg-blue-50 transition-all group">
                      <input type="radio" name="orderType" className="w-4 h-4 accent-olive" />
                      <span className="ml-3 text-[10px] font-black text-gray-700 uppercase">Urgent / Express</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Expected Delivery</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Budget Allocation</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-400">KES</span>
                    <input type="number" placeholder="0.00" className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors" />
                  </div>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-600 uppercase">Order Notes</label>
                  <textarea rows={3} placeholder="Provide specific instructions for the supplier..." className="w-full px-4 py-2.5 bg-gray-50 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:border-olive transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-blue-50 flex justify-end space-x-3">
              <button 
                onClick={() => setIsNewOrderModalOpen(false)}
                className="px-6 py-2.5 border border-blue-100 text-gray-600 text-[10px] font-black uppercase rounded-sm hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsNewOrderModalOpen(false)}
                className="px-6 py-2.5 bg-olive text-white text-[10px] font-black uppercase rounded-sm hover:bg-black transition-all shadow-lg"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="pt-8 border-t border-blue-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase">
          <span>NEXUSPOS</span>
          <span>·</span>
          <span>{detailedBranch.code}</span>
          <span>·</span>
          <span>{detailedBranch.posVersion}</span>
        </div>
        <div className="text-[10px] font-black text-gray-400 uppercase">
          {new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default BranchDetails;
