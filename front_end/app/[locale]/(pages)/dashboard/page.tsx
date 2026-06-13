'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import BaseNavbar from '@/app/components/shared/BaseNavbar';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  Sector
} from 'recharts';

interface DashboardData {
  stats: {
    todayRevenue: string;
    salesCount: string;
    productCount: string;
    lowStockCount: string;
    customersToday: string;
  };
  revenueData: { month: string; sales: number }[];
  paymentData: { name: string; value: number; fill: string }[];
  recentTransactions: {
    id: string;
    customer: string;
    amount: string;
    method: string;
    status: string;
  }[];
  lowStockAlerts: {
    name: string;
    meta: string;
    status: string;
    color: string;
  }[];
  branchPerformance: {
    name: string;
    location: string;
    sales: string;
    status: string;
  }[];
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    name: string;
  };
  percent: number;
  value: number;
}

const renderActiveShape = (props: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 8) * cos;
  const sy = cy + (outerRadius + 8) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-[10px] font-bold uppercase tracking-tighter">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 8}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={1.5} />
      <circle cx={ex} cy={ey} r={2.5} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 8} y={ey} textAnchor={textAnchor} fill="#1e293b" className="text-[10px] font-black">{`${value}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 8} y={ey} dy={12} textAnchor={textAnchor} fill="#64748b" className="text-[8px] font-bold uppercase">
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await api.get<DashboardData>('/reports/dashboard-summary/');
        setData(response);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-blue-50">
        <BaseNavbar title={t('title')} subtitle={t('subtitle')} icon="📊" />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-black text-blue-900 uppercase tracking-widest animate-pulse">Loading Analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col h-screen bg-blue-50">
        <BaseNavbar title={t('title')} subtitle={t('subtitle')} icon="📊" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-sm border border-red-100 shadow-xl max-w-md w-full text-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <h2 className="text-xl font-black text-red-700 uppercase">Connection Error</h2>
            <p className="text-sm text-slate-600 font-bold uppercase tracking-tight">{error || "Failed to establish a connection with the server."}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-red-600 text-white font-black uppercase text-xs rounded-sm hover:bg-red-700 transition-colors shadow-lg"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: t('todayRevenue'),
      value: data.stats.todayRevenue,
      change: '+12.4%',
      isUp: true,
      icon: '💰',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: t('salesCount'),
      value: data.stats.salesCount,
      change: '+8',
      isUp: true,
      icon: '🧾',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: t('products'),
      value: data.stats.productCount,
      change: '5 low',
      isUp: false,
      icon: '📦',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      name: t('customersToday'),
      value: data.stats.customersToday,
      change: '+4',
      isUp: true,
      icon: '👤',
      color: 'text-olive',
      bgColor: 'bg-olive/10'
    },
  ];

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <BaseNavbar
        title={t('title')}
        subtitle={t('subtitle')}
        icon="📊"
        onSearch={(query) => console.log('Searching for:', query)}
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-3 lg:p-4">
        <div className="space-y-3 md:space-y-3">
          {/* Header with Greeting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-extrabold text-blue-900 uppercase">{t('executiveOverview')}</h2>
              <p className="text-[11px] font-semibold text-slate-500 uppercase">{t('welcomeAdmin')}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex-1 md:flex-none px-5 py-2.5 bg-slate-200 border border-blue-200 rounded-sm text-[10px] font-bold uppercase text-blue-800 shadow-sm hover:bg-slate-300 transition-all flex items-center justify-center gap-2">
                <span>📄</span> {t('exportReport')}
              </button>
              <button className="flex-1 md:flex-none px-5 py-2.5 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-bold uppercase shadow-md hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                <span>⚙️</span> {t('manageSystem')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-3 md:p-5 rounded-sm border border-blue-100 shadow-sm flex items-center space-x-3 group hover:shadow-md transition-all cursor-default relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${stat.color.replace('text-', 'bg-')}`}></div>
                <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-2xl ${stat.bgColor} ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-700 uppercase">{stat.name}</p>
                  <div className="flex items-baseline space-x-2">
                    <h4 className="text-lg font-black text-blue-900">{stat.value}</h4>
                    <span className={`text-[9px] font-black ${stat.isUp ? 'text-green-600' : 'text-blue-600'} flex items-center`}>
                      {stat.isUp ? '↑' : '↓'} {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Revenue Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
            <div className="lg:col-span-2 bg-white p-3 md:p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-blue-900 uppercase">{t('revenuePerformance')}</h3>
                  <p className="text-[10px] font-semibold text-slate-700 uppercase">{t('monthlySales')}</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-sm border border-blue-100 self-start sm:self-auto">
                  <button className="px-4 py-1.5 bg-white shadow-sm rounded-sm text-[10px] font-bold uppercase text-slate-700">Monthly</button>
                  <button className="px-4 py-1.5 text-slate-600 text-[10px] font-bold uppercase hover:text-blue-900 transition-colors">Weekly</button>
                </div>
              </div>

              <div className="h-[200px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fontWeight: 900, fill: '#64748b' }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fontWeight: 900, fill: '#64748b' }}
                      tickFormatter={(value) => `KSh ${value/1000}k`}
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '8px' }}
                      itemStyle={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1e3a8a' }}
                      labelStyle={{ fontSize: '9px', fontWeight: 700, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}
                    />
                    <Bar dataKey="sales" fill="#1e3a8a" radius={[0, 0, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sidebar: Payment Split & Sellers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="bg-white p-3 md:p-3 rounded-sm border border-blue-100 shadow-sm">
                <h3 className="text-xs font-extrabold text-blue-900 uppercase mb-2 border-b border-blue-50 pb-2">{t('paymentMethods')}</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data.paymentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        stroke="none"
                      >
                        {data.paymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-1">
                  {data.paymentData.map((item) => (
                    <div key={item.name} className="flex flex-col items-center p-2 rounded-sm bg-slate-100 border border-slate-100/50">
                      <div className="w-2.5 h-2.5 rounded-full shadow-xs" style={{ backgroundColor: item.fill }}></div>
                      <span className="text-[9px] font-bold text-slate-700 uppercase">{item.name}</span>
                      <span className="text-[10px] font-black text-slate-800">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-900 p-5 rounded-sm shadow-md text-white relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-sm font-extrabold uppercase tracking-widest mb-5 text-blue-100/80 border-b border-white/10 pb-2">{t('topSellers')}</h3>
                <div className="space-y-5 relative z-10">
                  {[
                    { name: 'Paracetamol 500mg', price: '600', trend: '📈' },
                    { name: 'Vitamin C 1000mg', price: '1,710', trend: '📈' },
                    { name: 'Amoxicillin 250mg', price: '2,160', trend: '📈' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between group/item cursor-pointer">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold uppercase tracking-tight group-hover/item:text-blue-200 transition-colors">{item.name}</span>
                        <span className="text-[9px] font-semibold text-white/40 uppercase tracking-widest">Demand High</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-blue-200">KSh {item.price}</p>
                        <span className="text-xs opacity-80">{item.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-3">
            {/* Transactions Table */}
            <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-3 md:p-3 flex items-center justify-between border-b border-blue-50">
                <div>
                  <h3 className="text-sm md:text-base font-extrabold text-blue-800 uppercase">{t('recentTransactions')}</h3>
                  <p className="text-[10px] font-semibold text-slate-700 uppercase">{t('liveSalesFeed')}</p>
                </div>
                <Link href="/pos/sales-history" className="text-[10px] font-bold text-blue-700 hover:text-blue-800 uppercase bg-blue-50 px-3 py-2 rounded-sm transition-colors border border-blue-100/50">{t('viewAll')} →</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="px-3 py-3 text-[11px] font-bold text-blue-800 uppercase">Transaction ID</th>
                      <th className="px-3 py-3 text-[11px] font-bold text-blue-800 uppercase">Customer Detail</th>
                      <th className="px-3 py-3 text-[11px] font-bold text-blue-800 uppercase">Amount</th>
                      <th className="px-3 py-3 text-[11px] font-bold text-blue-800 uppercase text-right">Processing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.recentTransactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-3 py-3 text-[11px] font-bold text-blue-900">{txn.id}</td>
                        <td className="px-3 py-3">
                          <p className="text-[11px] font-bold text-slate-800 uppercase">{txn.customer}</p>
                          <p className="text-[9px] font-semibold text-slate-400 uppercase">{txn.method}</p>
                        </td>
                        <td className="px-3 py-3 text-[11px] font-extrabold text-slate-900">{txn.amount}</td>
                        <td className="px-3 py-3 text-right">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                            txn.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Secondary Sidebar: Low Stock & Branches */}
            <div className="space-y-3 md:space-y-4">
              <div className="bg-slate-50 p-3 md:p-4 rounded-sm border border-blue-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 relative z-10 border-b border-blue-200/50 pb-3">
                  <div>
                    <h3 className="text-sm md:text-base font-extrabold text-red-700 uppercase">{t('criticalAlerts')}</h3>
                    <p className="text-[10px] font-semibold text-red-400 uppercase">{t('inventoryAttention')}</p>
                  </div>
                  <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md animate-bounce">{data.lowStockAlerts.length} ALERTS</span>
                </div>
                <div className="space-y-3 relative z-10">
                  {data.lowStockAlerts.map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-3.5 rounded-sm border transition-all hover:translate-x-1 ${item.color}`}>
                      <div>
                        <p className="text-[10px] font-black uppercase">{item.name}</p>
                        <p className="text-[10px] font-bold opacity-70 uppercase">{item.meta}</p>
                      </div>
                      <span className="text-[9px] font-black uppercase">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 md:p-4 rounded-sm border border-blue-100 shadow-sm">
                <h3 className="text-sm font-extrabold text-blue-900 uppercase mb-3 border-b border-blue-50 pb-3">{t('branchPerformance')}</h3>
                <div className="space-y-3">
                  {data.branchPerformance.map((branch) => (
                    <div key={branch.name} className="flex items-center justify-between group cursor-pointer border-b border-blue-50 last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-9 h-9 rounded-sm bg-slate-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform group-hover:bg-blue-50">🏪</div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 uppercase">{branch.name}</p>
                          <p className="text-[9px] font-semibold text-slate-600 uppercase">{branch.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-blue-900">{branch.sales}</p>
                        <span className="text-[9px] font-bold uppercase text-green-600">{branch.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
