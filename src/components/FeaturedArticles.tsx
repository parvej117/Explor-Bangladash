import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ARTICLES } from '../data/bangladeshData';

export const FeaturedArticles: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Show the 4 requested articles
  const featured = ARTICLES.slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
              {language === 'bn' ? 'ফিচার্ড স্টোরি' : 'Featured Essays'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('sec.articlesTitle')}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              {t('sec.articlesSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors self-start md:self-end"
          >
            <span>{t('action.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map(article => (
            <article
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-600/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Large Cover Image */}
                <div
                  className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.coverImage}
                    alt={language === 'bn' ? article.titleBn : article.titleEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Accent Stripe */}
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {language === 'bn' ? article.categoryBn : article.categoryEn}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-5">
                  {/* Metadata with separators (Zero-Pill discipline) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                    <span className="font-medium text-slate-700">{article.publishDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readingTimeMinutes} {language === 'bn' ? 'মিনিট' : 'min'}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Eye className="w-3 h-3" />
                      <span>{article.views.toLocaleString()}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {language === 'bn' ? article.titleBn : article.titleEn}
                  </h3>

                  {/* Subtitle / Excerpt */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? article.subtitleBn : article.subtitleEn}
                  </p>
                </div>
              </div>

              {/* Card Footer with Read More Button */}
              <div className="px-5 pb-5 pt-2">
                <button
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-900 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>{t('action.readMore')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
