'use client';

import React, { useState } from 'react';

const NewsletterManager = () => {
  const [view, setView] = useState<'list' | 'compose'>('list');
  const [campaigns, setCampaigns] = useState([
    { id: 1, title: 'June Monthly Sale', status: 'Sent', sent_at: '2026-06-01', recipients: 1240, open_rate: '24%' },
    { id: 2, title: 'New Stock Arrival: Supplements', status: 'Draft', sent_at: '-', recipients: 0, open_rate: '0%' },
  ]);

  const stats = [
    { label: 'Total Subscribers', value: '2,482', icon: '👥', color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Avg Open Rate', value: '28.4%', icon: '📈', color: 'bg-green-50 text-green-600' },
    { label: 'Campaigns Sent', value: '12', icon: '✉️', color: 'bg-brown/10 text-brown' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-xl flex flex-col md:flex-row md:items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-gray-800 uppercase">Newsletter Manager</h2>
          <p className="text-[10px] font-bold text-gray-800 uppercase">Connect with your customers directly</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setView(view === 'list' ? 'compose' : 'list')}
            className="px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-bold uppercase
            hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg shadow-blue-900/20"
          >
            {view === 'list' ? '+ New Campaign' : 'Back to List'}
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-3 rounded-sm border border-gray-100 shadow-sm flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase mb-1">{stat.label}</p>
                  <h4 className="text-xl font-black text-gray-800">{stat.value}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Campaigns Table */}
          <div className="bg-white rounded-sm border border-blue-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">Campaign Title</th>
                    <th className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">Status</th>
                    <th className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">Sent Date</th>
                    <th className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">Recipients</th>
                    <th className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">Open Rate</th>
                    <th className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-4 py-5 text-[11px] font-black text-gray-900 uppercase">{c.title}</td>
                      <td className="px-4 py-5 text-[11px] font-black text-gray-900 uppercase">
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                          c.status === 'Sent' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">{c.sent_at}</td>
                      <td className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">{c.recipients.toLocaleString()}</td>
                      <td className="px-4 py-5 text-[11px] font-black text-blue-900 uppercase">
                        <span className="text-xs font-black text-olive">{c.open_rate}</span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center justify-center space-x-3">
                          <button className="text-[10px] font-black uppercase text-gray-700 hover:text-olive">View</button>
                          {c.status === 'Draft' && (
                            <button className="text-[10px] font-black uppercase text-olive hover:underline">Edit</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Compose View */
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 ml-1">Campaign Title</label>
              <input 
                type="text" 
                placeholder="e.g. Weekend Flash Sale"
                className="w-full h-14 px-6 bg-gray-50 border border-transparent rounded-2xl text-[15px] font-bold text-green-950 focus:bg-white focus:border-olive transition-all outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 ml-1">Email Content</label>
              <textarea 
                rows={10}
                placeholder="Write your message here..."
                className="w-full p-6 bg-gray-50 border border-transparent rounded-3xl text-[15px] font-medium text-gray-800 focus:bg-white focus:border-olive transition-all outline-none resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 h-14 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                Save Draft
              </button>
              <button className="flex-1 h-14 bg-olive text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-olive transition-all shadow-xl shadow-green-900/20">
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterManager;
