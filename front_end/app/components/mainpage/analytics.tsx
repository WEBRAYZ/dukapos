'use client';

import { useTranslations } from 'next-intl';

const Analytics = () => {
  const t = useTranslations('Analytics');
  const analyticsFeatures = [
    {
      icon: '📈',
      title: t('feature1Title'),
      description: t('feature1Desc'),
      tag: 'Visualization'
    },
    {
      icon: '🏆',
      title: t('feature2Title'),
      description: t('feature2Desc'),
      tag: 'Insights'
    },
    {
      icon: '📦',
      title: t('feature3Title'),
      description: t('feature3Desc'),
      tag: 'Accounting'
    },
    {
      icon: '💡',
      title: t('feature4Title'),
      description: t('feature4Desc'),
      tag: 'Reporting'
    }
  ];

  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Mockup */}
          <div className="relative order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-1000">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              {/* Mockup Header */}
              <div className="bg-linear-to-l from-blue-700 to-blue-950 px-8 py-4 flex justify-between items-center text-white">
                <div>
                  <h4 className="font-black text-sm">{t('salesAnalytics')}</h4>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{t('realTimePerformance')}</p>
                </div>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold border border-gray-100 transition-colors">
                  {t('thisWeek')} ▾
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{t('revenue')}</p>
                    <p className="text-xl font-black text-olive">KSh 84.2K</p>
                    <p className="text-[10px] font-bold text-blue-600">↑ 12.4% vs last week</p>
                  </div>
                  <div className="space-y-1 border-x border-gray-100 px-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{t('transactions')}</p>
                    <p className="text-xl font-black text-olive">1,248</p>
                    <p className="text-[10px] font-bold text-blue-600">↑ 8.1%</p>
                  </div>
                  <div className="space-y-1 pl-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{t('avgBasket')}</p>
                    <p className="text-xl font-black text-olive">KSh 674</p>
                    <p className="text-[10px] font-bold text-red-500">↓ 2.3%</p>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="space-y-3">
                  <div className="h-19 flex items-end justify-between px-2 pb-2 border-b border-gray-100">
                    {[35, 60, 45, 90, 65, 85, 50].map((h, i) => (
                      <div key={i} className="group relative w-full flex flex-col items-center mx-1">
                        <div className="w-full bg-blue-100 rounded-t-lg group-hover:bg-blue-400 transition-colors" style={{ height: `${h}%` }}></div>
                        <span className="text-[9px] font-bold text-gray-700 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products Table */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black text-gray-800 uppercase tracking-tighter">{t('topProducts')}</h5>
                  <div className="space-y-3">
                    {[
                      { name: 'Colgate Toothpaste', cat: 'Oral Care', stock: 85, rev: '14,250' },
                      { name: 'Ariel Powder 500g', cat: 'Detergents', stock: 42, rev: '11,640' },
                      { name: 'Safaricom Airtime', cat: 'Vouchers', stock: 95, rev: '9,800' }
                    ].map((row) => (
                      <div key={row.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-olive">{row.name}</span>
                          <span className="text-[9px] font-bold text-gray-400">{row.cat}</span>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="w-70 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${row.stock < 70 ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ width: `${row.stock}%` }}></div>
                          </div>
                          <span className="text-[11px] font-black text-gray-800">KSh {row.rev}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="order-1 lg:order-2 space-y-5">
            <div>
              <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2">{t('sectionHeader')}</h2>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-olive leading-tight mb-3">
                {t('titlePrefix')}<br />
                <span className="text-blue-500 text-2xl lg:text-3xl italic">{t('titleSuffix')}</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {analyticsFeatures.map((feature, idx) => (
                <div key={idx} className="group p-4 rounded-xl bg-white border border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{feature.icon}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">{feature.tag}</span>
                    </div>
                    <h4 className="text-xs font-black text-olive group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Analytics;
