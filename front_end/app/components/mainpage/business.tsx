'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Business = () => {
  const t = useTranslations('Business');
  const businessTypes = [
    { icon: '🔧', label: t('hardwareStores') },
    { icon: '🛒', label: t('supermarkets') },
    { icon: '📦', label: t('generalMerchandise') },
    { icon: '📱', label: t('mpesaIntegrated') },
    { icon: '🧾', label: t('thermalPrinterReady') },
    { icon: '🔐', label: t('security') },
    { icon: '📊', label: t('realTimeAnalytics') },
    { icon: '🌍', label: t('multiTenantSaaS') },
    { icon: '🟢', label: t('retailShops') },
    { icon: '💊', label: t('pharmacies') },
  ];

  // Double the array for seamless looping
  const scrollItems = [...businessTypes, ...businessTypes, ...businessTypes];

  return (
    <div className="bg-blue-950 py-4 overflow-hidden relative border-y- border-blue-100">
      {/* Gradient Overlays for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-blue-950 to-blue-950 z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-blue-950 to-blue-950 z-10"></div>

      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex space-x-12 px-6">
          {scrollItems.map((item, idx) => (
            <div 
              key={`${item.label}-${idx}`}
              className="flex items-center space-x-3 backdrop-blur-sm px-3 py-1 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 group cursor-default"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
              <span className="text-blue-100 hover:text-blue-950 font-bold text-xs  transition-colors duration-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Business;
