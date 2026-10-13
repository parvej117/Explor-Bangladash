import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Compass, BookOpen, Landmark, ArrowRight, Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS, DISTRICTS, UPAZILAS, TOURIST_SPOTS, ARTICLES } from '../data/bangladeshData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useModal();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else open();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search results
  const matchedDivisions = cleanQ
    ? DIVISIONS.filter(
        d =>
          d.nameBn.toLowerCase().includes(cleanQ) ||
          d.nameEn.toLowerCase().includes(cleanQ) ||
          d.descriptionBn.toLowerCase().includes(cleanQ) ||
          d.descriptionEn.toLowerCase().includes(cleanQ)
      )
    : [];

  const matchedDistricts = cleanQ
    ? DISTRICTS.filter(
        d =>
          d.nameBn.toLowerCase().includes(cleanQ) ||
          d.nameEn.toLowerCase().includes(cleanQ) ||
          d.descriptionBn.toLowerCase().includes(cleanQ) ||
          d.descriptionEn.toLowerCase().includes(cleanQ) ||
          d.famousForBn.some(f => f.toLowerCase().includes(cleanQ)) ||
          d.famousForEn.some(f => f.toLowerCase().includes(cleanQ))
      ).slice(0, 6)
    : [];

  const matchedUpazilas = cleanQ
    ? UPAZILAS.filter(
        u =>
          u.nameBn.toLowerCase().includes(cleanQ) ||
          u.nameEn.toLowerCase().includes(cleanQ) ||
          u.descriptionBn.toLowerCase().includes(cleanQ)
      ).slice(0, 4)
    : [];

  const matchedSpots = cleanQ
    ? TOURIST_SPOTS.filter(
        s =>
          s.nameBn.toLowerCase().includes(cleanQ) ||
          s.nameEn.toLowerCase().includes(cleanQ) ||
          s.locationBn.toLowerCase().includes(cleanQ) ||
          s.locationEn.toLowerCase().includes(cleanQ)
      ).slice(0, 4)
    : [];

  const matchedArticles = cleanQ
    ? ARTICLES.filter(
        a =>
          a.titleBn.toLowerCase().includes(cleanQ) ||
          a.titleEn.toLowerCase().includes(cleanQ) ||
          a.categoryBn.toLowerCase().includes(cleanQ) ||
          a.tagsBn.some(t => t.toLowerCase().includes(cleanQ)) ||
          a.tagsEn.some(t => t.toLowerCase().includes(cleanQ))
      ).slice(0, 4)
    : [];

  const hasResults =
    matchedDivisions.length > 0 ||
    matchedDistricts.length > 0 ||
    matchedUpazilas.length > 0 ||
    matchedSpots.length > 0 ||
    matchedArticles.length > 0;

  const handleSelect = (url: string) => {
    closeSearch();
    navigate(url);
  };

  const quickPicks = [
    { label: language === 'bn' ? 'কক্সবাজার' : "Cox's Bazar", q: language === 'bn' ? 'কক্সবাজার' : "Cox's Bazar" },
    { label: language === 'bn' ? 'সুন্দরবন' : 'Sundarbans', q: language === 'bn' ? 'সুন্দরবন' : 'Sundarbans' },
    { label: language === 'bn' ? 'মহাস্থানগড়' : 'Mahasthangarh', q: language === 'bn' ? 'মহাস্থানগড়' : 'Mahasthangarh' },
    { label: language === 'bn' ? 'শ্রীমঙ্গল' : 'Sreemangal', q: language === 'bn' ? 'শ্রীমঙ্গল' : 'Sreemangal' },
    { label: language === 'bn' ? 'স্মৃতিসৌধ' : 'Memorial', q: language === 'bn' ? 'স্মৃতিসৌধ' : 'Memorial' },
    { label: language === 'bn' ? 'দই' : 'Doi', q: language === 'bn' ? 'দই' : 'Doi' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'কী খুঁজতে চান? (যেমন: কক্সবাজার, সুন্দরবন, ঢাকা...)'
                : "Search destinations, districts, heritage, articles..."
            }
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="px-2 py-1 text-xs font-mono text-slate-400 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
          {!cleanQ && (
            <div className="py-6 px-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                {language === 'bn' ? 'জনপ্রিয় অনুসন্ধান' : 'Popular Suggestions'}
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPicks.map(item => (
                  <button
                    key={item.label}
                    onClick={() => setQuery(item.q)}
                    className="px-3 py-1.5 text-sm bg-slate-800/80 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-700/50 border border-slate-700/60 rounded-lg transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 text-xs text-slate-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>
                  {language === 'bn'
                    ? '৬৪ জেলা, ৮ বিভাগ, পর্যটন স্থান ও নিবন্ধ সরাসরি অনুসন্ধান করতে টাইপ করুন।'
                    : 'Search across 64 districts, 8 divisions, attractions, and cultural guides.'}
                </span>
              </div>
            </div>
          )}

          {cleanQ && !hasResults && (
            <div className="py-12 text-center">
              <Compass className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <div className="text-base font-medium text-slate-300">
                {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matches found'}
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {language === 'bn'
                  ? `"${query}" সংক্রান্ত কোনো স্থান, জেলা বা নিবন্ধ খুঁজে পাওয়া যায়নি। বানান যাচাই করুন বা অন্য কোনো নাম লিখুন।`
                  : `We couldn't find any places matching "${query}". Try searching for another district or landmark.`}
              </p>
            </div>
          )}

          {/* Division Results */}
          {matchedDivisions.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                {language === 'bn' ? 'বিভাগসমূহ' : 'Divisions'}
              </div>
              <div className="space-y-1">
                {matchedDivisions.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/divisions/${d.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {language === 'bn' ? `${d.nameBn} বিভাগ` : `${d.nameEn} Division`}
                        </div>
                        <div className="text-xs text-slate-400">
                          {language === 'bn'
                            ? `${d.districtCount}টি জেলা · ${d.upazilaCount}টি উপজেলা`
                            : `${d.districtCount} Districts · ${d.upazilaCount} Upazilas`}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* District Results */}
          {matchedDistricts.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                {language === 'bn' ? 'জেলাসমূহ' : 'Districts'}
              </div>
              <div className="space-y-1">
                {matchedDistricts.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/districts/${d.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {language === 'bn' ? `${d.nameBn} জেলা` : `${d.nameEn} District`}
                        </div>
                        <div className="text-xs text-slate-400">
                          {language === 'bn' ? d.descriptionBn : d.descriptionEn}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tourist Spot Results */}
          {matchedSpots.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                {language === 'bn' ? 'দর্শনীয় স্থানসমূহ' : 'Tourist Destinations'}
              </div>
              <div className="space-y-1">
                {matchedSpots.map(s => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(`/tourism/${s.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {language === 'bn' ? s.nameBn : s.nameEn}
                        </div>
                        <div className="text-xs text-slate-400">
                          {language === 'bn' ? s.locationBn : s.locationEn}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Article Results */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                {language === 'bn' ? 'নিবন্ধসমূহ' : 'Articles & Stories'}
              </div>
              <div className="space-y-1">
                {matchedArticles.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(`/blog/${a.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {language === 'bn' ? a.titleBn : a.titleEn}
                        </div>
                        <div className="text-xs text-slate-400">
                          {language === 'bn' ? a.categoryBn : a.categoryEn} · {a.readingTimeMinutes} {language === 'bn' ? 'মিনিট পাঠ' : 'min read'}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
