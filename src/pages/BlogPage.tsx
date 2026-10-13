import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, Clock, Eye, ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ARTICLES } from '../data/bangladeshData';

export const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = ARTICLES.filter(a => {
    const q = search.toLowerCase().trim();
    const matchesQ =
      !q ||
      a.titleBn.toLowerCase().includes(q) ||
      a.titleEn.toLowerCase().includes(q) ||
      a.subtitleBn.toLowerCase().includes(q) ||
      a.subtitleEn.toLowerCase().includes(q);
    const matchesCat = selectedCat === 'all' || a.categoryBn.includes(selectedCat);
    return matchesQ && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-emerald-700 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-700 font-semibold">
            {t('nav.blog')}
          </span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
            {language === 'bn' ? 'তথ্যসমৃদ্ধ প্রবন্ধ' : 'Editorial Essays & Travelogues'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'bn' ? 'বাংলাদেশ ভ্রমণ ও ঐতিহ্য নিবন্ধ' : 'Articles & Stories of Bangladesh'}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'কক্সবাজার সমুদ্রসৈকত, সুন্দরবন, প্রাচীন মহাস্থানগড় ও জাতীয় স্মৃতিসৌধসহ বাংলাদেশের ইতিহাস ও দর্শনের উপর গভীর অনুসন্ধানমূলক লেখা।'
              : 'In-depth essays and guides exploring the world’s longest natural beach, ancient citadels, mangrove forests, and sacred liberation memorials.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={language === 'bn' ? 'নিবন্ধ খুঁজুন...' : 'Search articles...'}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(article => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div
                  className="relative h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.coverImage}
                    alt={article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {language === 'bn' ? article.categoryBn : article.categoryEn}
                  </div>
                </div>

                <div className="p-6">
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

                  <h2
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug"
                  >
                    {language === 'bn' ? article.titleBn : article.titleEn}
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? article.subtitleBn : article.subtitleEn}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-900 hover:text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('action.readMore')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
