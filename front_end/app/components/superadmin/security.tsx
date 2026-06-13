'use client';

import React, { useState, useEffect } from 'react';
import LockdownSystemModal from './lockdown-system-modal';
import { api } from '@/lib/api';

const SecurityManagement = () => {
  const [isLockdownModalOpen, setIsLockdownModalOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [blockedIps, setBlockedIps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [auditData, ipsData] = await Promise.all([
          api.get<any[]>('/superadmin/security/audit/'),
          api.get<any[]>('/superadmin/security/blocked-ips/')
        ]);
        setAuditLogs(auditData);
        setBlockedIps(ipsData);
      } catch (error) {
        console.error('Failed to fetch security data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Threat Level', value: 'Zero', sub: 'Last 24h', color: 'text-green-600', icon: '🛡️' },
    { label: 'Blocked IPs', value: blockedIps.length.toString(), sub: 'Global firewall', color: 'text-gray-800', icon: '🚫' },
    { label: 'Encryption', value: 'Active', sub: 'SHA-256 enabled', color: 'text-blue-900', icon: '🔒' },
    { label: 'Audit Events', value: auditLogs.length.toString(), sub: 'System tracking', color: 'text-olive', icon: '✓' },
  ];

  const recentIncidents = [
    { id: 'SEC-8841', type: 'Brute Force', target: 'Gateway AF-01', status: 'Blocked', time: '14m ago', origin: '103.21.244.11', severity: 'High' },
    { id: 'SEC-8840', type: 'API Key Leak', target: 'Tenant TNT-42', status: 'Invalidated', time: '1h ago', origin: 'System Scan', severity: 'Critical' },
    { id: 'SEC-8839', type: 'New Admin', target: 'Root Access', status: 'Verified', time: '3h ago', origin: 'Auth Layer', severity: 'Low' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-4 space-y-2 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-black text-blue-800 uppercase">Security <span className="text-blue-900">Governance</span></h2>
          <p className="text-[9px] md:text-xs font-bold text-gray-700 uppercase">Global infrastructure protection and integrity monitoring</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-200 border border-blue-100 text-blue-800 hover:text-gray-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95">
            Firewall Rules
          </button>
          <button 
            onClick={() => setIsLockdownModalOpen(true)}
            className="flex-1 md:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
          >
            Lockdown System
          </button>
        </div>
      </div>

      <LockdownSystemModal isOpen={isLockdownModalOpen} onClose={() => setIsLockdownModalOpen(false)} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex items-center space-x-3 group hover:shadow-xl transition-all cursor-default">
            <div className="w-9 h-9 md:w-9 md:h-9 bg-gray-100 rounded-sm flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] md:text-[10px] font-bold text-gray-700 uppercase">{stat.label}</p>
              <h4 className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</h4>
              <p className="text-[10px] font-bold text-gray-700 uppercase">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Incident Timeline */}
        <div className="lg:col-span-2 bg-white p-3 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-5 pb-3 border-b border-blue-50">
              <h3 className="text-sm font-black text-blue-800 uppercase flex items-center">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" />
                 Global Security Journal
              </h3>
              <button className="text-[10px] font-black text-blue-900 uppercase hover:underline">Export Logs</button>
           </div>
           
           <div className="space-y-3 flex-1">
              {recentIncidents.map((inc) => (
                <div key={inc.id} className="flex items-start space-x-3 group">
                   <div className="w-9 h-9 md:w-9 md:h-9 bg-gray-50 rounded-sm shrink-0 flex items-center justify-center text-lg md:text-xl group-hover:scale-110 transition-transform shadow-inner">
                      {inc.severity === 'Critical' ? '🚨' : inc.severity === 'High' ? '⚠️' : '🛡️'}
                   </div>
                   <div className="flex-1 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                         <div className="flex items-center space-x-3">
                            <h4 className="text-xs font-black text-gray-800 uppercase">{inc.type}</h4>
                            <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase ${
                              inc.severity === 'Critical' ? 'bg-red-900 text-white' : 'bg-slate-100 text-gray-900'
                            }`}>{inc.severity}</span>
                         </div>
                         <span className="text-[9px] font-bold text-gray-700 uppercase">{inc.time}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                         <span className="text-blue-900">{inc.target}</span>
                         <span>•</span>
                         <span>{inc.origin}</span>
                         <span>•</span>
                         <span className="text-green-600">{inc.status}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-4 pt-4 border-t border-blue-50">
              <button className="w-full py-4 bg-linear-to-l from-blue-800 to-blue-950 hover:bg-gray-100 text-gray-100 hover:text-gray-800 rounded-sm text-[10px] font-bold uppercase transition-all active:scale-95 border border-blue-100">
                 View Historical Incidents →
              </button>
           </div>
        </div>

        {/* Access Policies */}
        <div className="space-y-3 md:space-y-4">
           <div className="bg-blue-900 p-4 md:p-4 rounded-sm md:rounded-md shadow-sm text-white relative overflow-hidden group">
              <h3 className="text-sm font-black uppercase mb-4 border-b border-blue-200 pb-3">Access Protocols</h3>
              <div className="space-y-2">
                 {[
                   { label: '2FA Enforcement', status: 'Global', color: 'text-green-400' },
                   { label: 'Session Timeout', status: '15 Mins', color: 'text-blue-300' },
                   { label: 'Geofencing', status: 'Enabled', color: 'text-green-400' },
                   { label: 'IP Whitelist', status: 'Restricted', color: 'text-yellow-400' },
                 ].map((policy) => (
                   <div key={policy.label} className="flex justify-between items-center group/pol">
                      <span className="text-[10px] font-black uppercase text-blue-300 group-hover/pol:text-white transition-colors">{policy.label}</span>
                      <span className={`text-[10px] font-black uppercase ${policy.color}`}>{policy.status}</span>
                   </div>
                 ))}
              </div>
              <button className="mt-4 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-sm text-[10px] font-black uppercase transition-all">
                 Update Policies
              </button>
              <div className="absolute -right-4 -bottom-4 p-8 opacity-5 grayscale group-hover:opacity-10 transition-opacity">
                 <span className="text-9xl">🛡️</span>
              </div>
           </div>

           <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-800 uppercase mb-2">Identity Check</h3>
              <p className="text-[10px] font-bold text-gray-700 uppercase mb-3">All administrative actions require <span className="text-blue-900 font-black">Level 3</span> cryptographic verification.</p>
              <div className="flex items-center space-x-4 bg-gray-50 p-1 rounded-sm border border-blue-300 group hover:border-blue-900 transition-all cursor-pointer">
                 <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">🔑</div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-gray-800 uppercase">Master HSM</p>
                    <p className="text-[9px] font-bold text-green-600 uppercase">Status: Synchronized</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityManagement;
