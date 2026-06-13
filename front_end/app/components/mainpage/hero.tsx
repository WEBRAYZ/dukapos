'use client';

import Link from 'next/link';
import { BarChart, Bar } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('Hero');
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <section className="relative overflow-hidden bg-blue-50 pt-4 pb-4 lg:pt-4 lg:pb-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-olive rounded-full"></div>
      </div>

      <div className="mx-auto px-4 sm:px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* Left Column: Content */}
          <div className="flex flex-col space-y-4 animate-in fade-in slide-in-from-left duration-1000">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                🇰🇪 {t('kenyanBuilt')}
              </span>
            </div>

            <h1 className="text-2xl lg:text-4xl font-extrabold text-blue-950 leading-tight tracking-tight">
              {t('title')} <br />
              <span className="text-blue-500">{t('inventoryControl')}</span>
            </h1>

            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              {t('subtitle')}
            </p>

            <div className="flex mt-4 flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="flex items-center justify-center px-8 py-3 text-white bg-linear-to-l from-blue-700 to-blue-950 rounded-sm font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t('startFreeTrial')}
              </Link>
              <Link
                href="/how-works"
                className="flex items-center justify-center px-8 py-3 bg-white text-olive border-2 border-olive rounded-sm font-bold text-lg hover:bg-blue-50 transition-all active:scale-95"
              >
                {t('exploreFeatures')} →
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blue-100">
              <div>
                <p className="text-2xl font-black text-olive">500+</p>
                <p className="text-xs font-semibold text-gray-500">{t('activeBusinesses')}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-500">KSh 2B+</p>
                <p className="text-xs font-semibold text-gray-500">{t('salesProcessed')}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-olive">99%</p>
                <p className="text-xs font-semibold text-gray-500">{t('uptimeSLA')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup */}
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
            {/* Main Mockup Card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-linear-to-l from-blue-800 to-blue-950 px-6 py-4 flex items-center justify-between">
                <span className="text-white font-bold text-sm">{t('dashboardTitle')}</span>
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-600 opacity-75"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-600 opacity-75"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-600 opacity-75"></div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">{t('todaysSales')}</p>
                    <p className="text-xl font-black text-olive mt-1">45.2K</p>
                    <p className="text-[10px] font-bold text-blue-600">↑ 12% vs yesterday</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">{t('products')}</p>
                    <p className="text-xl font-black text-olive mt-1">1,284</p>
                    <p className="text-[10px] font-bold text-blue-600">↑ 4 added today</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs font-bold text-gray-500 uppercase">{t('lowStock')}</p>
                    <p className="text-xl font-black text-red-600 mt-1">7</p>
                    <p className="text-[10px] font-bold text-red-500">⚠ {t('reorderNeeded')}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mock Chart Area */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-800">{t('dailyRevenue')}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-olive bg-blue-50 px-2 py-0.5 rounded-full">KSh 45.2K</span>
                        <span className="text-[10px] font-bold text-gray-400">Today</span>
                      </div>
                    </div>
                    <div className="h-32 w-full flex items-end justify-between px-1 pb-2 border-gray-100 gap-1.5">
                      <BarChart
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '100px', aspectRatio: 1.618 }}
                        data={data}
                      >
                        <Bar dataKey="uv" fill="#1e40af" />
                        <RechartsDevtools />
                      </BarChart>
                    </div>
                  </div>

                  {/* Top Products / Alerts */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">{t('topProductsToday')}</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Paracetamol 500mg', price: '4,200' },
                        { name: 'Maize Flour 2kg', price: '3,800' },
                        { name: 'Cooking Oil 1L', price: '3,100' },
                        { name: 'Cement 50kg', price: '2,900' }
                      ].map((item) => (
                        <div key={item.name} className="flex justify-between items-center p-2 bg-gray-50 border border-gray-100">
                          <span className="text-xs font-medium text-gray-700">{item.name}</span>
                          <span className="text-xs font-bold text-olive">KSh {item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Low Stock Alerts Banner */}
                <div className="bg-red-50 border border-blue-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2 text-red-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-black uppercase tracking-wider">⚠ {t('lowStockAlerts')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Amoxicillin 250mg', 'Sugar 1kg', 'Nails 3"', 'Blue Ink A4'].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white border border-red-200 rounded-md text-[10px] font-bold text-red-500 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floater Element: M-Pesa Integrated */}
            <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-lg shadow-xl border border-blue-100 flex items-center space-x-3 animate-bounce duration-3000">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-black text-xs">M</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">Payment Status</p>
                <p className="text-xs font-black text-olive">{t('mpesaIntegrated')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
