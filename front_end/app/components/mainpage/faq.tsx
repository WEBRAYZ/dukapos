'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const FAQ = () => {
  const t = useTranslations('FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('q1'),
      answer: t('a1')
    },
    {
      question: t('q2'),
      answer: t('a2')
    },
    {
      question: t('q3'),
      answer: t('a3')
    },
    {
      question: t('q4'),
      answer: t('a4')
    },
    {
      question: t('q5'),
      answer: t('a5')
    },
    {
      question: t('q6'),
      answer: t('a6')
    }
  ];

  return (
    <section className="py-8 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3">{t('sectionHeader')}</h2>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-olive mb-2">
            {t('title')}
          </h3>
          <Link href="#" className="text-olive font-bold hover:text-blue-600 transition-colors border-b border-dashed border-olive hover:border-blue-600 pb-1">
            {t('contactTeam')} →
          </Link>
        </div>

        {/* Accordion List */}
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className={`border rounded-xl transition-all duration-300 ${
                openIndex === idx ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white hover:border-blue-100'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-4 py-4 flex justify-between items-center text-left focus:outline-none"
              >
                <span className={`text-sm font-bold ${openIndex === idx ? 'text-blue-600' : 'text-olive'}`}>
                  {faq.question}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === idx ? 'bg-blue-500 text-white rotate-45' : 'bg-blue-100 text-blue-600'
                }`}>
                  <span className="text-2xl font-light leading-none">+</span>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-xs text-olive font-bold">
            {t('stillHaveQuestions')} <Link href="#" className="text-blue-600 underline hover:text-blue-700">{t('bookDemo')}</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
