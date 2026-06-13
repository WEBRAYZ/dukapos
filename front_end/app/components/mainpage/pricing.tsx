'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Pricing = () => {
  const t = useTranslations('Pricing');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: t('starterName'),
      monthlyPrice: 2999,
      description: t('billedMonthly'),
      features: [
        { name: t('productsCount', {count: '1,000'}), included: true },
        { name: t('usersCount', {count: 10}), included: true },
        { name: t('storageCount', {count: 10}), included: true },
        { name: t('basicInventory'), included: true },
        { name: t('singleTenant'), included: true },
        { name: t('basicPos'), included: true },
        { name: t('advancedAnalytics'), included: false },
        { name: t('purchaseOrders'), included: false },
        { name: t('apiAccess'), included: false },
      ],
      buttonText: t('getStarted'),
      highlighted: false,
      slug: 'starter'
    },
    {
      name: t('growthName'),
      monthlyPrice: 4999,
      description: t('billedMonthly'),
      features: [
        { name: t('productsCount', {count: '5,000'}), included: true },
        { name: t('usersCount', {count: 20}), included: true },
        { name: t('storageCount', {count: 50}), included: true },
        { name: t('multiTenant'), included: true },
        { name: t('advancedAnalytics'), included: true },
        { name: t('purchaseOrders'), included: true },
        { name: t('whatsappReceipts'), included: true },
        { name: t('apiAccess'), included: false },
        { name: t('customReports'), included: false },
      ],
      buttonText: t('getStarted'),
      highlighted: true,
      slug: 'growth'
    },
    {
      name: t('proName'),
      monthlyPrice: 7999,
      description: t('billedMonthly'),
      features: [
        { name: t('unlimitedProducts'), included: true },
        { name: t('usersCount', {count: 50}), included: true },
        { name: t('storageCount', {count: 100}), included: true },
        { name: t('multiTenant'), included: true },
        { name: t('customReports'), included: true },
        { name: t('apiAccess'), included: true },
        { name: t('prioritySupport'), included: true },
        { name: t('multiBranch'), included: false },
        { name: t('dedicatedSupport'), included: false },
      ],
      buttonText: t('getStarted'),
      highlighted: false,
      slug: 'pro'
    },
    {
      name: t('enterpriseName'),
      monthlyPrice: 15999,
      description: t('billedMonthly'),
      features: [
        { name: t('unlimitedProducts'), included: true },
        { name: t('unlimitedUsers'), included: true },
        { name: t('storageCount', {count: '500+'}), included: true },
        { name: t('multiBranch'), included: true },
        { name: t('customIntegrations'), included: true },
        { name: t('dedicatedSupport'), included: true },
        { name: t('quickbooksSage'), included: true },
        { name: t('ecommerceReady'), included: true },
        { name: t('slaGuarantee'), included: true },
      ],
      buttonText: t('contactSales'),
      highlighted: false,
      slug: 'enterprise'
    }
  ];

  const calculatePrice = (price: number) => {
    if (billingCycle === 'annual') {
      return Math.floor(price * 0.8);
    }
    return price;
  };

  return (
    <section id="pricing" className="py-8 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Section Header */}
        <div className="text-left mb-10">
          <h2 className="text-blue-600 font-black text-sm uppercase tracking-widest mb-2">{t('sectionHeader')}</h2>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-olive">
            {t('title')}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="mt-7 flex items-center justify-center space-x-3">
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-olive' : 'text-gray-400'}`}>{t('monthly')}</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-8 bg-blue-100 rounded-full p-1 transition-colors duration-300 relative focus:outline-none"
            >
              <div className={`w-6 h-6 bg-olive rounded-full transition-transform duration-300 transform ${billingCycle === 'annual' ? 'translate-x-6' : ''}`}></div>
            </button>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${billingCycle === 'annual' ? 'text-olive' : 'text-gray-400'}`}>{t('annual')}</span>
              <span className="bg-blue-100 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">{t('save20')}</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div 
              key={plan.slug}
              className={`flex flex-col p-6 rounded-lg border transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted 
                  ? 'bg-white border-blue-500 shadow-2xl z-10' 
                  : 'bg-white border-blue-100 hover:border-blue-200 shadow-sm'
              }`}
            >
              <div className="mb-6">
                <h4 className="text-xl font-black text-olive mb-1">{plan.name}</h4>
                <div className="flex items-baseline mb-1">
                  <span className="text-sm font-bold text-gray-500 mr-1">KSh</span>
                  <span className="text-2xl font-black text-olive">{calculatePrice(plan.monthlyPrice).toLocaleString()}</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                  {billingCycle === 'monthly' ? t('billedMonthly') : t('billedAnnually')}
                </p>
              </div>

              <div className="space-y-3 mb-8 grow">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className={`text-xs font-bold shrink-0 ${feature.included ? 'text-blue-600' : 'text-gray-300'}`}>
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span className={`text-sm font-medium ${feature.included ? 'text-gray-700' : 'text-gray-300'}`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.slug === 'enterprise' ? '/request-demo' : '/signup'}
                className={`w-full text-center py-3 rounded-sm font-black text-xs transition-all shadow-md active:scale-95 ${
                  plan.highlighted
                    ? 'bg-blue-900 text-white hover:bg-blue-600 shadow-blue-100'
                    : 'bg-slate-100 text-gray-900 hover:bg-slate-200'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
