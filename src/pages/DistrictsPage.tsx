import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Landmark, ChevronRight, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DISTRICTS, DIVISIONS } from '../data/bangladeshData';

export const DistrictsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDistricts = DISTRICTS.filter(d => {
    const matchesDiv = selectedDivision === 'all' || d.divisionId === selectedDivision;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      d.nameBn.toLowerCase().includes(q) ||
      d.nameEn.toLowerCase().includes(q) ||
      d.descriptionBn.toLowerCase().includes(q) ||
      d.descriptionEn.toLowerCase().includes(q) ||
      d.famousForBn.some(f => f.toLowerCase().includes(q)) ||
      d.famousForEn.some(f => f.toLowerCase().includes(q));
    return matchesDiv && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {language === 'bn' ? 'সকল ৬৪ জেলা' : 'All 64 Districts'}
          </span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'জেলা ডিরেক্টরি' : 'District Directory'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'বাংলাদেশের ৬৪টি জেলা' : '64 Districts of Bangladesh'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? '৮টি বিভাগে বিন্যস্ত বাংলাদেশের সকল ৬৪ জেলার ইতিহাস, ঐতিহ্য, বিখ্যাত খাবার এবং দর্শনীয় স্থানের পূর্ণাঙ্গ তালিকা।'
              : 'Complete directory of all 64 districts across 8 divisions with regional specialties, upazilas, and heritage.'}
          </p>
        </div>

        {/* Search & Division Filter Controls */}
        <div className="space-y-4 mb-10">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'জেলা বা দর্শনীয় স্থান খুঁজুন...' : 'Search district or specialty...'}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Division Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedDivision('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDivision === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {language === 'bn' ? 'সকল বিভাগ (৬৪)' : 'All Divisions (64)'}
            </button>
            {DIVISIONS.map(div => {
              const isSelected = selectedDivision === div.id;
              const count = DISTRICTS.filter(d => d.divisionId === div.id).length;
              return (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {language === 'bn' ? `${div.nameBn} (${count})` : `${div.nameEn} (${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-400 mb-6 flex items-center justify-between">
          <span>
            {language === 'bn'
              ? `মোট ${filteredDistricts.length}টি জেলা প্রদর্শিত হচ্ছে`
              : `Showing ${filteredDistricts.length} districts`}
          </span>
        </div>

        {/* 64 Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredDistricts.map(dist => {
            const divisionObj = DIVISIONS.find(d => d.id === dist.divisionId);
            return (
              <div
                key={dist.id}
                onClick={() => navigate(`/districts/${dist.id}`)}
                className="group bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                      {language === 'bn' ? divisionObj?.nameBn : divisionObj?.nameEn}
                    </span>
                    <span className="text-xs text-slate-500 tabular-nums">
                      {dist.upazilaCount} {language === 'bn' ? 'উপজেলা' : 'Upazilas'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? `${dist.nameBn} জেলা` : `${dist.nameEn} District`}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? dist.descriptionBn : dist.descriptionEn}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="text-[11px] text-slate-500 mb-1">
                      {language === 'bn' ? 'বিখ্যাত:' : 'Famous for:'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(language === 'bn' ? dist.famousForBn : dist.famousForEn).slice(0, 2).map((item, idx) => (
                        <span key={idx} className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-emerald-400 font-semibold group-hover:bg-slate-850">
                  <span>{t('action.exploreDistrict')}</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
