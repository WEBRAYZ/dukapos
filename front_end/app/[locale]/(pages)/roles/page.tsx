'use client';

import React from 'react';

const UsersRolesPage = () => {
  const users = [
    { name: 'Admin User', email: 'admin@pharmacy.co.ke', role: '👑 Admin', status: 'active', lastActive: 'Today 09:42', initial: 'A', bgColor: 'bg-green-100 text-green-700' },
    { name: 'Sarah Otieno', email: 'sarah@pharmacy.co.ke', role: '🖥 Cashier', status: 'active', lastActive: 'Today 09:15', initial: 'S', bgColor: 'bg-blue-100 text-blue-700' },
    { name: 'James Mwangi', email: 'james@pharmacy.co.ke', role: '🎯 Manager', status: 'active', lastActive: 'Yesterday', initial: 'J', bgColor: 'bg-orange-100 text-orange-700' },
    { name: 'Grace Achieng', email: 'grace@pharmacy.co.ke', role: '🖥 Cashier', status: 'inactive', lastActive: '3 days ago', initial: 'G', bgColor: 'bg-gray-100 text-gray-700' },
  ];

  const activityLog = [
    { user: 'Admin', action: 'Added product: Omeprazole', time: '09:42', initial: 'A', bgColor: 'bg-green-100 text-green-700' },
    { user: 'Sarah', action: 'Completed sale TXN-4821', time: '09:31', initial: 'S', bgColor: 'bg-blue-100 text-blue-700' },
    { user: 'James', action: 'Approved stock adjustment', time: '09:00', initial: 'J', bgColor: 'bg-orange-100 text-orange-700' },
    { user: 'Admin', action: 'Updated branch settings', time: '08:45', initial: 'A', bgColor: 'bg-green-100 text-green-700' },
    { user: 'Grace', action: 'Logged in', time: '08:30', initial: 'G', bgColor: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-end">
        <button className="flex items-center justify-center px-6 py-2.5 bg-olive text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-olive/90 transition-all shadow-md active:scale-95">
          <span className="mr-2 text-lg leading-none">+</span> Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Users Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-olive uppercase tracking-tight">Users</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Active</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${user.bgColor} flex items-center justify-center font-black text-xs uppercase`}>
                          {user.initial}
                        </div>
                        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-gray-500">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-black text-olive uppercase">
                      {user.role}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                        user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-400">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-olive hover:text-orange-500 font-black text-[10px] uppercase tracking-widest transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-olive uppercase tracking-tight mb-8">Activity Log</h3>
          <div className="space-y-6">
            {activityLog.map((log, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full ${log.bgColor} flex items-center justify-center font-black text-xs uppercase transition-transform group-hover:scale-110`}>
                    {log.initial}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-800 uppercase tracking-tight leading-none mb-1">{log.user}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{log.action}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersRolesPage;
