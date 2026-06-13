'use client';

import React, { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import IncidentLogModal from './incident-log-modal';
import { api } from '@/lib/api';

const MonitoringManagement = () => {
  const [isIncidentLogOpen, setIsIncidentLogOpen] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [health, setHealth] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsData, healthData] = await Promise.all([
          api.get<any[]>('/superadmin/monitoring/metrics/'),
          api.get<any[]>('/superadmin/monitoring/health/')
        ]);
        setMetrics(metricsData);
        setHealth(healthData);
      } catch (error) {
        console.error('Failed to fetch monitoring data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'System Uptime', value: '99.99%', sub: 'Last 30 days', color: 'text-green-600', icon: '⏱️' },
    { label: 'Active Alerts', value: health.filter(h => h.status !== 'healthy').length.toString(), sub: 'Action required', color: 'text-orange-500', icon: '⚠️' },
    { label: 'Avg CPU', value: `${metrics.find(m => m.metric_type === 'CPU')?.value || 0}%`, sub: 'Current load', color: 'text-blue-900', icon: '⚡' },
    { label: 'Memory', value: `${metrics.find(m => m.metric_type === 'MEMORY')?.value || 0}%`, sub: 'Usage', color: 'text-gray-400', icon: '✕' },
  ];

  const nodes = health.map(h => ({
    id: h.service_name.toUpperCase(),
    region: 'Platform Core',
    status: h.status === 'healthy' ? 'Healthy' : 'Degraded',
    load: `${h.response_time || 0}ms`,
    color: h.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
  }));

  const alerts = [
    { id: 'ALT-4421', level: 'Warning', node: 'NODE-EU-01', event: 'High CPU Load', time: '12m ago', detail: 'Sustained load above 80% for 10 mins' },
    { id: 'ALT-4420', level: 'Critical', node: 'NODE-AF-02', event: 'Database Sync Lag', time: '48m ago', detail: 'Replica lag increased to 12.4s' },
    { id: 'ALT-4419', level: 'Resolved', node: 'GLOBAL', event: 'Security Update', time: '2h ago', detail: 'Patch v2.4.1 applied to all nodes' },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-blue-800 uppercase">System <span className="text-blue-900">Monitoring</span></h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase">Real-time infrastructure health and performance analytics</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-200 border border-blue-100 text-blue-800 hover:text-gray-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-sm active:scale-95">
            Mute Alerts
          </button>
          <button 
            onClick={() => setIsIncidentLogOpen(true)}
            className="flex-1 md:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
          >
            Incident Log
          </button>
        </div>
      </div>

      <IncidentLogModal isOpen={isIncidentLogOpen} onClose={() => setIsIncidentLogOpen(false)} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex items-center space-x-3 group hover:shadow-xl transition-all cursor-default">
            <div className="w-9 h-9 md:w-9 md:h-9 bg-slate-100 rounded-sm flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] md:text-[10px] font-black text-gray-700 uppercase">{stat.label}</p>
              <h4 className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</h4>
              <p className="text-[10px] font-bold text-gray-700 uppercase">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Node Status Grid */}
        <div className="lg:col-span-2 space-y-3 md:space-y-3">
          <div className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-blue-50">
               <h3 className="text-sm font-black text-blue-800 uppercase flex items-center">
                 <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-200" />
                 Active Infrastructure Nodes
               </h3>
               <span className="text-[10px] font-black text-green-400 uppercase">4 Online</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3">
              {nodes.map((node) => (
                <div key={node.id} className="p-3 rounded-sm bg-slate-100 border border-blue-100 group hover:bg-white hover:shadow-xl transition-all relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4 relative z-10">
                     <div className="space-y-1">
                        <h4 className="text-sm font-black text-gray-800 uppercase">{node.id}</h4>
                        <p className="text-[10px] font-bold text-gray-700 uppercase">{node.region}</p>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                       node.status === 'Healthy' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                     }`}>
                       {node.status}
                     </span>
                  </div>
                  <div className="space-y-3 relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                       <span className="text-gray-700">Node Load</span>
                       <span className={node.color.replace('bg-', 'text-')}>{node.load}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                       <div className={`h-full ${node.color} rounded-full transition-all duration-1000 shadow-lg`} style={{ width: node.load }} />
                    </div>
                  </div>
                  <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white p-3 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm relative overflow-hidden group">
            <h3 className="text-sm font-black text-blue-800 uppercase mb-6 border-b border-blue-50 pb-4">Global Response Metrics</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={latencyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e3a8a" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#9ca3af', fontWeight: 900 }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tick={{ fill: '#9ca3af', fontWeight: 900 }}
                    tickFormatter={(value) => `${value}ms`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                    contentStyle={{ 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      fontSize: '10px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: '#1e3a8a'
                    }}
                  />
                  <Bar
                    dataKey="latency"
                    fill="url(#latencyGradient)"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute right-0 top-0 p-8 opacity-5 grayscale group-hover:opacity-10 transition-opacity">
               <span className="text-8xl">📊</span>
            </div>
          </div>
        </div>

        {/* Right Column: Alerts */}
        <div className="space-y-3 md:space-y-3">
           <div className="bg-white p-3 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-50">
                 <h3 className="text-sm font-black text-gray-800 uppercase">Active Alerts</h3>
                 <span className="px-2.5 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-black">2 LIVE</span>
              </div>
              
              <div className="space-y-4 flex-1">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-sm border border-blue-50 hover:bg-slate-50 transition-all group">
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        alert.level === 'Critical' ? 'bg-red-100 text-red-700' :
                        alert.level === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {alert.level}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{alert.time}</span>
                    </div>
                    <h4 className="text-xs font-black text-gray-800 uppercase">{alert.event}</h4>
                    <p className="text-[10px] font-bold text-gray-600 uppercase mt-1">{alert.node} • {alert.detail}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-blue-50">
                 <button className="w-full py-5 bg-blue-50 text-blue-900 rounded-sm text-[10px] font-black uppercase hover:bg-blue-900 hover:text-white transition-all shadow-sm active:scale-95 border border-blue-100">
                    Full Event Log →
                 </button>
              </div>
           </div>

           <div className="bg-blue-500 p-4 md:p-4 rounded-sm md:rounded-sm shadow-xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-sm font-black uppercase mb-2">Capacity Alert</h3>
                 <p className="text-[10px] font-bold text-blue-100 uppercase mb-5">Node <span className="text-white font-black">NODE-EU-01</span> is approaching storage limits. Provisioning suggested in <span className="text-white font-black">48h</span>.</p>
                 <button className="w-full py-4 bg-linear-to-l from-blue-800 to-blue-950 hover:bg-black/20 border border-white/20 rounded-sm text-[9px] font-black uppercase tracking-[0.3em] transition-all">
                    Expand Storage
                 </button>
              </div>
              <div className="absolute right-0 bottom-0 p-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-1000">
                 <span className="text-8xl">📦</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringManagement;
