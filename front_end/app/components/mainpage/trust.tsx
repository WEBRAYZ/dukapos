'use client';

import { useTranslations } from 'next-intl';

const Trust = () => {
  const t = useTranslations('Trust');
  const testimonials = [
    {
      initials: 'AM',
      name: 'Amina Mwangi',
      role: t('aminaMwangiRole'),
      quote: t('aminaMwangiQuote'),
      rating: 5
    },
    {
      initials: 'JK',
      name: 'James Kariuki',
      role: t('jamesKariukiRole'),
      quote: t('jamesKariukiQuote'),
      rating: 5
    },
    {
      initials: 'FO',
      name: 'Fatuma Odhiambo',
      role: t('fatumaOdhiamboRole'),
      quote: t('fatumaOdhiamboQuote'),
      rating: 5
    }
  ];

  return (
    <section className="py-6 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none"></div>

      <div className="px-4 sm:px-6 lg:px-8 relative">
        <div className="text-left mb-7">
          <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 italic">{t('sectionHeader')}</h2>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-olive mb-6">
            {t('title')}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Star Rating */}
              <div className="flex space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-blue-400 text-xl">★</span>
                ))}
              </div>

              {/* Quote */}
              <div className="grow">
                <p className="text-gray-700 font-medium italic text-sm leading-relaxed mb-3">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>

              {/* Profile Card */}
              <div className="flex items-center space-x-4 border-t border-blue-50 pt-3">
                <div className="w-10 h-10 bg-olive text-white rounded-lg flex items-center justify-center font-black text-lg shadow-lg group-hover:bg-blue-500 transition-colors">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-black text-olive text-base">{testimonial.name}</h4>
                  <p className="text-xs font-bold text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact Note */}
        <div className="mt-10 flex flex-col items-center justify-center space-y-4">
          <div className="flex -space-x-4">
            {['AM', 'JK', 'FO', 'SM'].map((init, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-[10px] font-black text-olive shadow-md">
                {init}
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-white bg-olive flex items-center justify-center text-[10px] font-black text-white shadow-md">
              +490
            </div>
          </div>
          <p className="text-sm font-bold text-gray-400 tracking-tight">
            {t.rich('globalImpact', {
              brand: <span key="brand" className="text-olive">DUKAPOS</span>
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trust;
