import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Music, Heart, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CULTURAL_ITEMS } from '../data/bangladeshData';

export const CulturePage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {language === 'bn' ? 'সংস্কৃতি ও লোকঐতিহ্য' : 'Culture & Folk Traditions'}
          </span>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'আবহমান বাংলা' : 'Timeless Bengal'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'সংস্কৃতি, উৎসব ও লোকঐতিহ্য' : 'Culture, Festivals & Living Traditions'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'বাংলা নববর্ষ থেকে শুরু করে লোকজ বাউল গান, হাতে বোনা জামদানি ও নকশিকাঁথার মায়াবী রূপ—বাঙালির হাজার বছরের সমৃদ্ধ জীবনাচার।'
              : 'From vibrant Pohela Boishakh festivities to mystic Baul philosophy, exquisite Jamdani weaves, and centuries of artistic heritage.'}
          </p>
        </div>

        {/* Culture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CULTURAL_ITEMS.map(item => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-emerald-500/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10">
                    {item.category.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {language === 'bn' ? item.regionBn : item.regionEn}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                  {language === 'bn' ? item.nameBn : item.nameEn}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                </p>

                <div className="mt-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-semibold text-emerald-400 mb-1">
                    {language === 'bn' ? 'ঐতিহাসিক পটভূমি ও গুরুত্ব:' : 'Historical Significance:'}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {language === 'bn' ? item.historyBn : item.historyEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
