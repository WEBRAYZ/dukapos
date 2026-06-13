'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

const SuperAdminDashboard = () => {
  const t = useTranslations('SuperAdminDashboard');
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await api.get<any>('/superadmin/dashboard/summary/');
        setSummaryData(data);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { label: t('totalTenants'), value: summaryData?.totalTenants || '...', change: '↑ 0', meta: t('thisMonth'), icon: '⬢', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: t('activeUsers'), value: summaryData?.activeUsers || '...', change: '↑ 0', meta: t('currentlyOnline'), icon: '👤', color: 'text-green-600', bg: 'bg-green-50' },
    { label: t('systemLoad'), value: summaryData?.systemLoad || '...', change: t('normal'), meta: t('acrossClusters'), icon: '📊', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: t('revenueMtd'), value: summaryData?.revenueMtd || '...', change: '↑ 0%', meta: t('vsLastMonth'), icon: '💰', color: 'text-olive', bg: 'bg-blue-50' },
  ];

  const systems = summaryData?.clusterHealth || [
    { name: t('identityProvider'), status: t('healthy'), uptime: '99.99%', load: '12%', color: 'bg-green-500' },
    { name: t('transactionEngine'), status: t('healthy'), uptime: '99.98%', load: '42%', color: 'bg-green-500' },
    { name: t('storageFabric'), status: t('degraded'), uptime: '99.90%', load: '84%', color: 'bg-yellow-500' },
    { name: t('etimsGateway'), status: t('healthy'), uptime: '100%', load: '5%', color: 'bg-green-500' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-3">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-black text-blue-800 uppercase">{t('title').split(' ')[0]} <span className="text-blue-900">{t('title').split(' ')[1]}</span></h1>
          <p className="text-[10px] md:text-xs font-black text-gray-700 uppercase">{t('subtitle')} · Tuesday, June 2, 2026</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex-1 md:flex-none px-3 py-3 bg-slate-300 border border-blue-100 rounded-sm text-[9px] md:text-[10px] font-black uppercase  text-blue-800 hover:text-gray-800 transition-all shadow-sm active:scale-95">
            {t('systemLog')}
          </button>
          <button className="flex-1 md:flex-none px-3 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[9px] md:text-[10px] font-black uppercase shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
            {t('maintenanceMode')}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-default relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-9 h-9 md:w-9 md:h-9 rounded-sm ${stat.bg} flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="bg-blue-50 text-blue-900 text-[10px] font-black px-2 py-1 rounded-full border border-blue-100">
                {stat.change}
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-700 uppercase">{stat.label}</p>
              <h4 className={`text-xl md:text-2xl font-black ${stat.color} `}>{stat.value}</h4>
              <p className="text-[10px] font-bold text-gray-700 uppercase">{stat.meta}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cluster Health */}
        <div className="lg:col-span-2 space-y-4 md:space-y-4">
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-blue-50">
              <h3 className="text-sm font-black text-blue-800 uppercase flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-200" />
                {t('clusterHealth')}
              </h3>
              <button className="text-[10px] font-black text-blue-900 uppercase hover:underline">{t('fullDiagnostics')}</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3">
              {systems.map((sys) => (
                <div key={sys.name} className="space-y-3 group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] md:text-xs font-black text-gray-800 uppercase ">{sys.name}</span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase${
                      sys.status === t('healthy') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {sys.status}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden flex border border-blue-100">
                    <div 
                      className={`h-full ${sys.color} rounded-full shadow-lg transition-all duration-1000 group-hover:scale-x-105`} 
                      style={{ width: sys.load }} 
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-700 uppercase">
                    <span>{t('uptime')}: {sys.uptime}</span>
                    <span>{t('load')}: {sys.load}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-linear-to-l from-blue-800 to-blue-950 p-3 rounded-sm md:rounded-sm shadow-sm text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                  <span className="text-6xl">🔒</span>
               </div>
               <h3 className="text-[10px] font-black uppercase mb-3 text-blue-200">{t('securityLayer')}</h3>
               <p className="text-3xl font-black mb-2">Zero</p>
               <p className="text-[10px] font-bold text-blue-300 uppercase">{t('securityThreats')} · {t('securityEncryption')}</p>
               <button className="mt-10 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-sm text-[9px] font-black uppercase transition-all active:scale-95">
                 {t('securityAudit')} →
               </button>
            </div>
            <div className="bg-linear-to-l from-blue-600 to-blue-800 p-3 rounded-sm md:rounded-sm shadow-2xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                  <span className="text-6xl">▦</span>
               </div>
               <h3 className="text-[10px] font-black uppercase mb-3 text-blue-100">{t('resourcePool')}</h3>
               <p className="text-3xl font-black mb-2">62%</p>
               <p className="text-[10px] font-bold text-blue-100 uppercase">{t('globalCpu')} · {t('cpuPeak')}</p>
               <button className="mt-10 w-full py-4 bg-black/10 hover:bg-black/20 border border-white/10 rounded-sm text-[9px] font-black uppercase transition-all active:scale-95">
                 {t('scaleResources')} →
               </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-3 md:space-y-3">
           <div className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm space-y-3">
              <h3 className="text-sm font-black text-gray-800 uppercase border-b border-blue-50 pb-2">{t('regionalDistribution')}</h3>
              
              <div className="space-y-3">
                {[
                  { region: t('regionalNairobi'), tenants: 48, percentage: 40, color: 'bg-blue-600' },
                  { region: t('regionalMombasa'), tenants: 24, percentage: 20, color: 'bg-blue-400' },
                  { region: t('regionalKisumu'), tenants: 18, percentage: 15, color: 'bg-blue-300' },
                  { region: t('regionalOthers'), tenants: 34, percentage: 25, color: 'bg-gray-200' },
                ].map((reg) => (
                  <div key={reg.region} className="space-y-2 group">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black text-gray-800 uppercase">{reg.region}</span>
                       <span className="text-[10px] font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-lg">{reg.tenants} {t('tenants')}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div className={`h-full ${reg.color} rounded-full transition-all duration-1000 shadow-sm`} style={{ width: `${reg.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-blue-50">
                 <button className="w-full py-5 bg-slate-200 hover:bg-gray-300 border border-blue-100 text-blue-600 hover:text-blue-800 rounded-sm text-[10px] font-black uppercase transition-all active:scale-95">
                    {t('viewTenantMap')} →
                 </button>
              </div>
           </div>

           <div className="bg-blue-50 p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-sm font-black text-blue-900 uppercase mb-3">{t('coreBackup')}</h3>
                 <p className="text-[10px] font-bold text-blue-600 uppercase mb-3">{t('backupNextSync')}</p>
                 <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[9px] font-black text-green-600 uppercase">{t('integrityCheck')}</span>
                 </div>
              </div>
              <div className="absolute right-0 bottom-0 p-8 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000">
                 <span className="text-8xl">💾</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
