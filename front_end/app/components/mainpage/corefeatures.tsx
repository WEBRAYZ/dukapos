'use client';

import { useTranslations } from 'next-intl';

const CoreFeatures = () => {
  const t = useTranslations('CoreFeatures');
  const features = [
    {
      title: t('inventoryTitle'),
      description: t('inventoryDesc'),
      icon: '📦',
      tag: 'Inventory',
      tagColor: 'bg-orange-100 text-orange-700'
    },
    {
      title: t('posTitle'),
      description: t('posDesc'),
      icon: '🖥️',
      tag: 'Point of Sale',
      tagColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: t('mpesaTitle'),
      description: t('mpesaDesc'),
      icon: '📱',
      tag: 'Payments',
      tagColor: 'bg-blue-100 text-blue-800 font-black'
    },
    {
      title: t('receiptsTitle'),
      description: t('receiptsDesc'),
      icon: '🧾',
      tag: 'Hardware',
      tagColor: 'bg-gray-100 text-gray-700'
    },
    {
      title: t('rbacTitle'),
      description: t('rbacDesc'),
      icon: '🔐',
      tag: 'Security',
      tagColor: 'bg-red-100 text-red-700'
    },
    {
      title: t('analyticsTitle'),
      description: t('analyticsDesc'),
      icon: '📊',
      tag: 'Analytics',
      tagColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: t('multiTenantTitle'),
      description: t('multiTenantDesc'),
      icon: '🏢',
      tag: 'Architecture',
      tagColor: 'bg-indigo-100 text-indigo-700'
    },
    {
      title: t('purchaseOrdersTitle'),
      description: t('purchaseOrdersDesc'),
      icon: '🛒',
      tag: 'Operations',
      tagColor: 'bg-yellow-100 text-yellow-700'
    },
    {
      title: t('realTimeSyncTitle'),
      description: t('realTimeSyncDesc'),
      icon: '⚡',
      tag: 'Real-Time',
      tagColor: 'bg-orange-50 text-orange-600'
    },
  ];

  return (
    <section className="py-6 bg-slate-50 relative">
      <div className="mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-left mb-6">
          <h2 className="text-blue-600 font-black text-sm uppercase tracking-widest mb-3">{t('sectionHeader')}</h2>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-olive mb-6 leading-tight">
            {t('titlePrefix')}<br />
            <span className="text-blue-500 text-2xl lg:text-3xl italic">{t('titleSuffix')}</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group p-3 rounded-lg bg-white border border-blue-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col h-full">
                {/* Header: Icon & Tag */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${feature.tagColor} shadow-sm`}>
                    {feature.tag}
                  </span>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-olive mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-xs grow">
                  {feature.description}
                </p>

                {/* Footer decorator */}
                <div className="mt-8 flex items-center text-blue-500 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{t('exploreDetails')}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
