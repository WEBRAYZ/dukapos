'use client';

import React, { useState } from 'react';
import BranchDetails from './branch-details';

const BranchManagement = () => {
  const [selectedBranch, setSelectedBranch] = useState<any>(null);

  const stats = [
    { label: 'Total Branches', value: '4', meta: 'All operational', icon: '🏢', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Total Staff', value: '14', meta: 'Across branches', icon: '👥', color: 'bg-green-50 text-green-600' },
    { label: 'Best Revenue', value: 'Main', meta: '$52,100 this month', icon: '🏆', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'New Branch', value: 'Q3', meta: 'Branch C — planned', icon: '✨', color: 'bg-brown/10 text-brown' },
  ];

  const branches = [
    {
      id: 'WLD-001',
      name: 'Main Branch',
      status: 'Open',
      address: '12 Commerce St, Downtown · HQ',
      revenue: 52100,
      staff: 6,
      transactions: 1402,
      manager: 'D. Osei',
      statusColor: 'text-green-500',
    },
    {
      id: 'WLD-002',
      name: 'Branch A',
      status: 'Open',
      address: '45 Westfield Mall, Level 2',
      revenue: 18640,
      staff: 4,
      transactions: 822,
      manager: 'M. Lin',
      statusColor: 'text-green-500',
    },
    {
      id: 'WLD-003',
      name: 'Branch B',
      status: 'Reduced Hrs',
      address: '88 North Ave, Uptown',
      revenue: 13580,
      staff: 4,
      transactions: 617,
      manager: 'J. Okafor',
      statusColor: 'text-orange-500',
    },
  ];

  if (selectedBranch) {
    return <BranchDetails branch={selectedBranch} onBack={() => setSelectedBranch(null)} />;
  }

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                <span>{stat.icon}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase ">{stat.label}</p>
              <h4 className="text-2xl font-black text-gray-800">{stat.value}</h4>
              <p className="text-[9px] font-bold text-gray-600 uppercase">{stat.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch) => (
          <div key={branch.name} className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col space-y-4 group hover:border-olive/30 transition-all">
            {/* Branch Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-gray-800 uppercase">{branch.name}</h3>
                <div className={`flex items-center space-x-1.5 text-[10px] font-black uppercase ${branch.statusColor}`}>
                  <span className="text-[10px]">●</span>
                  <span>{branch.status}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-50 rounded-sm flex items-center justify-center text-lg shadow-inner group-hover:bg-olive/10 group-hover:text-olive transition-colors">
                🏢
              </div>
            </div>

            <p className="text-xs font-bold text-gray-700 uppercase border-b border-blue-50 pb-3">
              {branch.address}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-600 uppercase">Revenue</p>
                <p className="text-sm font-black text-olive">${branch.revenue.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-600 uppercase">Staff</p>
                <p className="text-sm font-black text-gray-800">{branch.staff}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-600 uppercase">Transactions</p>
                <p className="text-sm font-black text-gray-800">{branch.transactions.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-600 uppercase">Manager</p>
                <p className="text-sm font-black text-gray-800 uppercase">{branch.manager}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center space-x-3">
              <button 
                onClick={() => setSelectedBranch(branch)}
                className="flex-1 py-3 bg-linear-to-l from-blue-800 to-blue-950 hover:bg-olive text-gray-100 hover:text-white rounded-sm text-[10px] font-black uppercase transition-all shadow-sm border border-transparent hover:border-olive"
              >
                View Details
              </button>
              <button className="px-5 py-3 border bg-slate-100 border-blue-100 text-gray-700 hover:text-blue-500 hover:bg-blue-50 rounded-sm text-[10px] font-black uppercase transition-all">
                Edit
              </button>
            </div>
          </div>
        ))}

        {/* Add New Branch Card */}
        <button className="bg-gray-50/50 p-4 rounded-sm border-2 border-dashed border-blue-200 flex flex-col items-center justify-center space-y-3 group hover:bg-white hover:border-olive transition-all cursor-pointer min-h-[350px]">
          <div className="w-16 h-16 rounded-sm bg-white text-gray-600 flex items-center justify-center text-4xl shadow-sm border border-gray-100 group-hover:scale-110 group-hover:text-olive group-hover:shadow-lg transition-all">
            +
          </div>
          <div className="text-center">
            <h3 className="text-sm font-black text-gray-700 uppercase group-hover:text-olive">Add New Branch</h3>
            <p className="text-[10px] font-bold text-gray-800 uppercase mt-1">Expand your presence</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BranchManagement;
