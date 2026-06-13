'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const HowItWorks = () => {
  const t = useTranslations('HowItWorks');
  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      number: '02',
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      number: '03',
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: '04',
      title: t('step4Title'),
      description: t('step4Desc'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="px-4 sm:px-6 lg:px-8 relative">
        <div className="text-left mb-7">
          <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 italic">{t('sectionHeader')}</h2>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-olive mb-6">
            {t('title')}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector line for desktop */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full border-t-2 border-dashed border-blue-200 -z-10"></div>
              )}

              <div className="flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center text-olive mb-4 shadow-xl group-hover:bg-olive group-hover:text-white transition-all duration-500 relative">
                  <span className="text-xl font-black">{step.number}</span>
                  {/* Floating Icon */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-olive mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link href="/signup" className="bg-linear-to-l from-blue-800 to-blue-950 text-white px-10 py-4 rounded-lg font-black text-xs hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl active:scale-95 inline-block">
            {t('readyToStart')} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
