'use client';

import { useTranslations } from 'next-intl';

const LogoStrip = () => {
  const t = useTranslations('LogoStrip');
  const partners = [
    { name: 'Safaricom', accent: 'text-blue-600' },
    { name: 'Equity Bank', accent: 'text-red-700' },
    { name: 'KRA', accent: 'text-blue-800' },
    { name: 'NCBA', accent: 'text-orange-900' },
    { name: 'Absa', accent: 'text-red-600' },
    { name: 'KCB Group', accent: 'text-blue-800' }
  ];

  return (
    <div className="bg-white py-8 border-b border-orange-50">
      <div className="px-4 sm:px-6 lg:px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
          {t('trustedBy')}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div key={partner.name} className={`text-xl md:text-xl font-bold tracking-tighter ${partner.accent} cursor-default`}>
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoStrip;
