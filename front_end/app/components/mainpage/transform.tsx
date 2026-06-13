'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Transform = () => {
  const t = useTranslations('Transform');
  return (
    <section className="py-6 bg-white relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-100 rounded-3xl p-4 md:p-8 lg:p-12 relative overflow-hidden shadow-xs">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -translate-y-12 translate-x-12 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-100/10 rounded-full translate-y-12 -translate-x-12 blur-2xl"></div>

          <div className="relative z-10 text-center flex flex-col items-center">
            <h2 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">{t('sectionHeader')}</h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-6 max-w-4xl">
              {t('title')}
            </h2>
            
            <p className="text-md text-slate-900/80 max-w-2xl mb-8 leading-relaxed font-medium">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-4 py-3 bg-blue-800 text-white rounded-lg font-black text-sm hover:bg-blue-600 transition-all shadow-xl hover:shadow-orange-900/20 active:scale-95 flex items-center justify-center"
              >
                <span className="mr-2 text-sm">🚀</span> {t('startFreeTrial')}
              </Link>
              <Link
                href="/request-demo"
                className="w-full sm:w-auto px-4 py-2.5 bg-white text-olive rounded-lg font-black text-sm hover:bg-blue-50 transition-all shadow-lg active:scale-95 border-2 border-transparent flex items-center justify-center"
              >
                <span className="mr-2 text-sm">📞</span> {t('talkToSales')}
              </Link>
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-blue-900 text-sm font-bold tracking-tight">
              <div className="flex items-center space-x-2">
                <span className="text-blue-700">✓</span>
                <span>{t('noCreditCard')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-700">✓</span>
                <span>{t('cancelAnytime')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-700">✓</span>
                <span>{t('freeOnboarding')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transform;
