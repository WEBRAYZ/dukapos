'use client';

import React, { useState } from 'react';
import ManagementNavbar from '@/app/components/management/navbar';
import BranchManagement from '@/app/components/management/branchmanagement';
import Settings from '@/app/components/management/settings';
import Notifications from '@/app/components/management/notifications';
import AuditLogs from '@/app/components/management/auditlogs';
import NewsletterManager from '@/app/components/management/newslettermanager';

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState('Users & Roles');

  const stats = [
    { label: 'Total Users', value: '14', change: '', meta: 'Across all branches', icon: '👥', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Active Now', value: '6', change: '', meta: 'Logged in', icon: '●', iconColor: 'text-green-500', color: 'bg-green-50 text-green-600' },
    { label: 'Roles Defined', value: '5', change: '', meta: 'Access levels', icon: '🛡️', color: 'bg-orange-50 text-orange-600' },
    { label: 'Invites', value: '2', change: '', meta: 'Awaiting acceptance', icon: '⏳', color: 'bg-blue-50 text-blue-900' },
  ];

  const users = [
    { initials: 'SK', name: 'Sarah Kim', email: 'sarah.kim@pos.com', role: 'Admin', branch: 'Main Branch', lastLogin: 'Today 09:14', status: 'Active', color: 'bg-pink-100 text-pink-600' },
    { initials: 'DO', name: 'David Osei', email: 'd.osei@pos.com', role: 'Manager', branch: 'Main Branch', lastLogin: 'Today 08:52', status: 'Active', color: 'bg-blue-100 text-yellow-600' },
    { initials: 'ML', name: 'Mei Lin', email: 'mei.lin@pos.com', role: 'Cashier', branch: 'Branch A', lastLogin: 'Today 09:01', status: 'Active', color: 'bg-green-100 text-green-600' },
    { initials: 'JO', name: 'James Okafor', email: 'j.ora@pos.com', role: 'Cashier', branch: 'Branch B', lastLogin: 'Yesterday 18:40', status: 'Offline', color: 'bg-orange-100 text-orange-600' },
    { initials: 'RT', name: 'Rina Torres', email: 'r.torres@pos.com', role: 'Cashier', branch: 'Branch B', lastLogin: 'Yesterday 17:22', status: 'Offline', color: 'bg-purple-100 text-brown' },
    { initials: 'AM', name: 'Anna Müller', email: 'a.muller@pos.com', role: 'Inventory', branch: 'Main Branch', lastLogin: 'May 30 14:10', status: 'Disabled', color: 'bg-gray-100 text-gray-600' },
    { initials: 'IN', name: 'invite@pos.com', meta: 'Invited by Sarah Kim', role: '—', branch: 'Branch A', lastLogin: '—', status: 'Pending', color: 'bg-gray-50 text-gray-400' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-500';
      case 'Offline': return 'text-gray-400';
      case 'Disabled': return 'text-red-500';
      case 'Pending': return 'text-orange-500';
      default: return 'text-gray-400';
    }
  };

  const renderUsersAndRoles = () => (
    <div className="space-y-4 md:space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 md:p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-default">
            <div className="flex items-center justify-between mb-3 md:mb-3">
              <div className={`w-9 h-9 md:w-9 md:h-9 rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-gray-600 uppercase mb-2">{stat.label}</p>
              <h4 className="text-xl md:text-2xl font-black text-gray-800">{stat.value}</h4>
              <p className="text-[9px] font-bold text-gray-600 uppercase">{stat.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* List Container */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-2xl overflow-hidden flex flex-col">
        {/* Header & Filters */}
        <div className="p-4 md:p-4 border-b border-blue-100 space-y-3 md:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg md:text-lg font-black text-blue-800 uppercase">Organizational Directory</h3>
              <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase">Manage personnel and access privileges</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all cursor-pointer">
                <option>All Branches</option>
              </select>
              <select className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all cursor-pointer">
                <option>All Roles</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase whitespace-nowrap">User Identity</th>
                <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase whitespace-nowrap">Role</th>
                <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase hidden lg:table-cell">Branch</th>
                <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center hidden md:table-cell">Last Login</th>
                <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Status</th>
                <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase  text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 md:w-9 md:h-9 rounded-sm flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform ${user.color}`}>
                        {user.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-800 uppercase line-clamp-1">{user.name}</span>
                        <span className="text-[10px] font-bold text-gray-600 lowercase line-clamp-1">{user.email}</span>
                        {user.meta && <span className="text-[10px] font-bold text-orange-500 uppercase whitespace-nowrap">{user.meta}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                      user.role === 'Admin' ? 'bg-blue-100 text-blue-900 border-blue-100' :
                      user.role === 'Manager' ? 'bg-orange-100 text-orange-700 border-orange-100' :
                      'bg-gray-50 text-gray-700 border-gray-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3 hidden lg:table-cell text-[10px] font-bold text-gray-700 uppercase whitespace-nowrap">{user.branch}</td>
                  <td className="px-3 md:px-3 py-3 md:py-3 text-center text-[10px] font-bold text-gray-600 uppercase hidden md:table-cell whitespace-nowrap">{user.lastLogin}</td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex items-center justify-center space-x-2">
                      <span className={`text-[10px] ${getStatusColor(user.status)} animate-pulse`}>●</span>
                      <span className="text-[10px] font-black text-gray-800 uppercase whitespace-nowrap">
                        {user.status === 'Pending' ? '⏳ Invited' : user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex items-center justify-center space-x-2 md:space-x-3">
                      {user.status === 'Pending' ? (
                        <>
                          <button className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full text-[10px] font-black uppercase transition-all">
                            Resend
                          </button>
                          <button className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-full text-[10px] font-black uppercase transition-all">
                            Revoke
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="w-8 h-8 md:w-10 md:h-10 rounded-ull bg-gray-50 text-gray-800 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-blue-100">
                            <span className="text-base">✏</span>
                          </button>
                          <button className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all shadow-sm active:scale-95 ${
                            user.status === 'Disabled' 
                              ? 'bg-green-50 text-green-700 hover:bg-green-600 hover:text-white' 
                              : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'
                          }`}>
                            {user.status === 'Disabled' ? 'Enable' : 'Block'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 md:p-4 bg-gray-50/50 border-t border-blue-50">
          <p className="text-[10px] font-black text-gray-700 uppercase ">System-wide operational controls · Access policies enforced by global security provider.</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Users & Roles':
        return renderUsersAndRoles();
      case 'Branch Management':
        return <BranchManagement />;
      case 'Settings':
        return <Settings />;
      case 'Notifications':
        return <Notifications />;
      case 'Newsletter Manager':
        return <NewsletterManager />;
      case 'Audit Logs':
        return <AuditLogs />;
      default:
        return (
          <div className="h-full flex items-center justify-center py-20 px-4">
            <div className="text-center space-y-6 bg-white p-12 md:p-20 rounded-[3rem] shadow-xl border border-gray-100 max-w-md w-full">
              <div className="text-7xl grayscale opacity-20 mb-6">⚙️</div>
              <h3 className="text-base font-black text-gray-800 uppercase tracking-[0.2em]">{activeTab} Pending</h3>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">The configurations for this module are currently being validated by our system architects.</p>
              <button onClick={() => setActiveTab('Users & Roles')} className="w-full py-4 bg-blue-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 active:scale-95 transition-all">Back to Directory</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <ManagementNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManagementPage;
