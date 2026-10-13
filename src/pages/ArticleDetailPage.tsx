import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Eye, Calendar, User, ArrowLeft, Share2, Check, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ARTICLES, TOURIST_SPOTS } from '../data/bangladeshData';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const article = ARTICLES.find(a => a.slug === slug || a.id === slug) || ARTICLES[0];
  const relatedSpot = article.relatedSpotId ? TOURIST_SPOTS.find(s => s.id === article.relatedSpotId) : null;
  const otherArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-emerald-700 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/blog" className="hover:text-emerald-700 transition-colors">
            {t('nav.blog')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-700 font-semibold truncate max-w-xs">
            {language === 'bn' ? article.titleBn : article.titleEn}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-3 uppercase tracking-wider">
            <span>{language === 'bn' ? article.categoryBn : article.categoryEn}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {language === 'bn' ? article.titleBn : article.titleEn}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-600 font-medium leading-relaxed">
            {language === 'bn' ? article.subtitleBn : article.subtitleEn}
          </p>

          {/* Author & Editorial Metadata */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                {(language === 'bn' ? article.authorBn : article.authorEn).charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-800">
                  {language === 'bn' ? article.authorBn : article.authorEn}
                </div>
                <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                  <span>{article.publishDate}</span>
                  <span>·</span>
                  <span>{article.readingTimeMinutes} {language === 'bn' ? 'মিনিট পাঠ' : 'min read'}</span>
                  <span>·</span>
                  <span className="tabular-nums">{article.views.toLocaleString()} {language === 'bn' ? 'পাঠক' : 'views'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : t('action.share')}</span>
            </button>
          </div>
        </header>

        {/* Feature Cover Image */}
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-lg border border-slate-200 max-h-[500px]">
          <img
            src={article.coverImage}
            alt={article.titleEn}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Longform Editorial Body */}
        <article className="prose prose-slate max-w-none text-slate-800 text-base sm:text-lg leading-relaxed space-y-6">
          {(language === 'bn' ? article.contentBn : article.contentEn).map((paragraph, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 leading-relaxed text-slate-900 font-medium'
                  : 'leading-relaxed text-slate-700'
              }
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* Related Spot Card if Linked */}
        {relatedSpot && (
          <div className="mt-12 p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <div className="text-xs uppercase font-bold text-emerald-800 tracking-wider mb-1 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? 'সম্পর্কিত ভ্রমণ গন্তব্য' : 'Linked Travel Destination'}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'bn' ? relatedSpot.nameBn : relatedSpot.nameEn}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md">
                {language === 'bn' ? relatedSpot.descriptionBn : relatedSpot.descriptionEn}
              </p>
            </div>
            <button
              onClick={() => navigate(`/tourism/${relatedSpot.id}`)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-md"
            >
              {language === 'bn' ? 'ভ্রমণ গাইড দেখুন →' : 'View Travel Guide →'}
            </button>
          </div>
        )}

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {language === 'bn' ? 'ট্যাগসমূহ' : 'Tags'}
          </div>
          <div className="flex flex-wrap gap-2">
            {(language === 'bn' ? article.tagsBn : article.tagsEn).map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Read More Next Articles */}
        <div className="mt-16 pt-10 border-t border-slate-300">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {language === 'bn' ? 'আরও পড়ুন' : 'More Featured Articles'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherArticles.map(other => (
              <div
                key={other.id}
                onClick={() => navigate(`/blog/${other.slug}`)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="h-32 rounded-xl overflow-hidden mb-3">
                    <img
                      src={other.coverImage}
                      alt={other.titleEn}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 line-clamp-2">
                    {language === 'bn' ? other.titleBn : other.titleEn}
                  </h4>
                </div>
                <div className="mt-3 text-xs text-emerald-700 font-semibold">
                  {t('action.readMore')} →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
