'use client';

import React, { useState } from 'react';
import BackupRecoveryNavbar from '@/app/components/backup-recovery/navbar';
import BackupScheduling from '@/app/components/backup-recovery/scheduling';
import StorageHealth from '@/app/components/backup-recovery/storage-health';

const BackupRecoveryPage = () => {
  const [activeTab, setActiveTab] = useState('Backup History');
  const [activeFilter, setActiveFilter] = useState('All');

  const stats = [
    { label: 'Last Backup', value: '3h 12m ago', sub: 'BK-0091 · Full', color: 'text-green-600', subColor: 'text-gray-400' },
    { label: 'Success (7d)', value: '100%', sub: '28 backups', color: 'text-gray-800', subColor: 'text-green-500' },
    { label: 'Total Stored', value: '14.2 GB', sub: 'Global S3', color: 'text-blue-900', subColor: 'text-gray-400' },
    { label: 'Next Sync', value: '21:00', sub: 'Incremental', color: 'text-orange-500', subColor: 'text-blue-400' },
  ];

  const backups = [
    { id: 'BK-0091', type: 'Full', trigger: 'Scheduled', timestamp: '2026-06-01 03:00', size: '2.41 GB', duration: '4m 12s', storage: 'Cloud (S3)', encrypted: true, status: 'Success' },
    { id: 'BK-0090', type: 'Incremental', trigger: 'Scheduled', timestamp: '2026-05-31 21:00', size: '184 MB', duration: '0m 38s', storage: 'Cloud (S3)', encrypted: true, status: 'Success' },
    { id: 'BK-0089', type: 'Incremental', trigger: 'Manual', timestamp: '2026-05-31 14:42', size: '97 MB', duration: '0m 22s', storage: 'Local + Cloud', encrypted: true, status: 'Success' },
    { id: 'BK-0088', type: 'Full', trigger: 'Scheduled', timestamp: '2026-05-31 03:00', size: '2.38 GB', duration: '4m 05s', storage: 'Cloud (S3)', encrypted: true, status: 'Success' },
    { id: 'BK-0087', type: 'Incremental', trigger: 'Scheduled', timestamp: '2026-05-30 21:00', size: '211 MB', duration: '0m 41s', storage: 'Cloud (S3)', encrypted: true, status: 'Failed' },
    { id: 'BK-0086', type: 'Differential', trigger: 'Scheduled', timestamp: '2026-05-30 12:00', size: '890 MB', duration: '1m 50s', storage: 'Cloud (S3)', encrypted: true, status: 'Success' },
  ];

  const getStatusStyle = (status: string) => {
    return status === 'Success' 
      ? 'text-green-700 bg-green-100 border-green-200' 
      : 'text-red-700 bg-red-100 border-red-200';
  };

  const renderBackupHistory = () => (
    <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
      {/* CONTROL BAR */}
      <div className="p-3 md:p-4 border-b border-blue-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex bg-slate-100 px-1.5 py-1 rounded-sm border border-blue-100 overflow-x-auto no-scrollbar">
          {['All', 'Full', 'Incremental', 'Differential'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-3 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                activeFilter === f 
                  ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-sm shadow-blue-900/20' 
                  : 'bg-transparent text-slate-600 hover:text-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="bg-linear-to-l from-blue-800 to-blue-950 text-white px-3 py-3 rounded-sm text-[10px] font-black uppercase hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95 flex items-center justify-center space-x-3">
          <span>▶</span>
          <span>Run Backup Now</span>
        </button>
      </div>

      {/* DATA TABLE */}
      <div className="overflow-x-auto custom-scrollbar no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase whitespace-nowrap">Backup ID</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase">Type</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase hidden sm:table-cell">Trigger</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase">Timestamp</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-right">Size</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-right hidden md:table-cell">Duration</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase">Storage</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Security</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Status</th>
              <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {backups
              .filter(b => activeFilter === 'All' || b.type === activeFilter)
              .map((bk) => (
              <tr key={bk.id} className="hover:bg-slate-50/30 transition-colors group cursor-default">
                <td className="px-3 md:px-3 py-3">
                  <span className="text-xs font-black text-blue-900 uppercase whitespace-nowrap">{bk.id}</span>
                </td>
                <td className="px-3 md:px-3 py-3">
                  <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-600 rounded-sm uppercase whitespace-nowrap">{bk.type}</span>
                </td>
                <td className="px-3 md:px-3 py-3 hidden sm:table-cell">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{bk.trigger}</span>
                </td>
                <td className="px-3 md:px-3 py-3">
                  <span className="text-[10px] font-black text-slate-800 tabular-nums whitespace-nowrap">{bk.timestamp}</span>
                </td>
                <td className="px-3 md:px-3 py-3 text-right">
                  <span className="text-xs font-black text-slate-800 whitespace-nowrap">{bk.size}</span>
                </td>
                <td className="px-3 md:px-3 py-3 text-right hidden md:table-cell">
                  <span className="text-[10px] font-bold text-slate-600 uppercase whitespace-nowrap">{bk.duration}</span>
                </td>
                <td className="px-3 md:px-3 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">☁️</span>
                    <span className="text-[10px] font-black text-slate-600 uppercase whitespace-nowrap">{bk.storage}</span>
                  </div>
                </td>
                <td className="px-3 md:px-3 py-3">
                  <div className="flex justify-center">
                    <span className={`text-sm ${bk.encrypted ? 'grayscale-0' : 'grayscale opacity-70'}`} title={bk.encrypted ? 'Encrypted' : 'Unencrypted'}>{bk.encrypted ? '🔒' : '🔓'}</span>
                  </div>
                </td>
                <td className="px-3 md:px-3 py-3">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase border ${getStatusStyle(bk.status)}`}>
                      {bk.status}
                    </span>
                  </div>
                </td>
                <td className="px-3 md:px-3 py-3 text-right">
                  {bk.status === 'Success' && (
                    <button className="text-[10px] font-black text-blue-900 uppercase hover:underline active:scale-95 transition-all">
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 md:p-5 bg-slate-50/50 border-t border-slate-50 text-center">
        <p className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase">
          Distributed Storage Fabric active · Multi-region failover enabled · Integrity checked daily
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Scheduling':
      case 'Retention Policy':
        return <BackupScheduling />;
      case 'Storage Health':
      case 'Integrity Check':
      case 'Cloud Sync':
        return <StorageHealth />;
      case 'Backup History':
      case 'Manual Backup':
      case 'Export Logs':
      case 'Destinations':
      default:
        return renderBackupHistory();
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <BackupRecoveryNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-3 md:p-4 lg:p-4 pt-0 md:pt-0 lg:pt-0 space-y-3 md:space-y-3">
        
        {/* SUMMARY STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 md:p-4 rounded-sm border border-gray-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-xl cursor-default group">
              <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase mb-1 group-hover:text-blue-900 transition-colors">{stat.label}</p>
              <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className={`text-[9px] font-bold ${stat.subColor} uppercase mt-1.5`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        {renderContent()}

      </div>
    </div>
  );
};

export default BackupRecoveryPage;
