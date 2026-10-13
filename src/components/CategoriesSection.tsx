import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Landmark, Scroll, GraduationCap, Sparkles, TrendingUp, UtensilsCrossed, Users, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/bangladeshData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Landmark,
  Scroll,
  GraduationCap,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Users
};

export const CategoriesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'বিষয়শ্রেণী' : 'Explore by Category'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('sec.categoriesTitle')}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            {t('sec.categoriesSubtitle')}
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map(category => {
            const Icon = iconMap[category.icon] || Compass;
            return (
              <div
                key={category.id}
                onClick={() => navigate(category.link)}
                className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
              >
                {/* Background Image Container */}
                <div className="relative h-36 sm:h-44 w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={language === 'bn' ? category.nameBn : category.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-emerald-400 flex items-center justify-center shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Corner Action Arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/60 text-slate-400 group-hover:text-emerald-300 group-hover:bg-emerald-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-slate-900">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400/90 mb-1">
                      {language === 'bn' ? category.countBn : category.countEn}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {language === 'bn' ? category.nameBn : category.nameEn}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {language === 'bn' ? category.descriptionBn : category.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                    <span>{language === 'bn' ? 'অন্বেষণ করুন' : 'Discover'}</span>
                    <span className="text-emerald-400">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
