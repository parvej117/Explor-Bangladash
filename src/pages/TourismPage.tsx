import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Compass, Star, MapPin, ChevronRight, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TOURIST_SPOTS, DIVISIONS } from '../data/bangladeshData';

export const TourismPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', labelBn: 'সকল স্থান', labelEn: 'All Spots' },
    { id: 'beach', labelBn: 'সমুদ্রসৈকত', labelEn: 'Beaches' },
    { id: 'forest', labelBn: 'বন ও সাফারি', labelEn: 'Forests & Wildlife' },
    { id: 'historical', labelBn: 'ঐতিহাসিক', labelEn: 'Historical' },
    { id: 'natural', labelBn: 'প্রাকৃতিক ও চা বাগান', labelEn: 'Nature & Tea Valleys' }
  ];

  const filtered = TOURIST_SPOTS.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesDiv = selectedDivision === 'all' || s.divisionId === selectedDivision;
    const q = search.toLowerCase().trim();
    const matchesQ =
      !q ||
      s.nameBn.toLowerCase().includes(q) ||
      s.nameEn.toLowerCase().includes(q) ||
      s.locationBn.toLowerCase().includes(q) ||
      s.locationEn.toLowerCase().includes(q);
    return matchesCat && matchesDiv && matchesQ;
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
            {language === 'bn' ? 'পর্যটন গন্তব্যসমূহ' : 'Tourist Destinations'}
          </span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'রূপসী বাংলাদেশ ভ্রমণ' : 'Travel Bangladesh'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'বাংলাদেশের শীর্ষ দর্শনীয় স্থান' : 'Top Tourist Destinations'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'বিশ্বের দীর্ঘতম সমুদ্রসৈকত থেকে শুরু করে সুবিশাল ম্যানগ্রোভ বন, সবুজ পাহাড়ি উপত্যকা ও হাজার বছরের প্রাচীন ঐতিহাসিক নিদর্শনসমূহ।'
              : "Discover pristine coastlines, majestic mangrove forests, rolling emerald tea hills, and ancient archaeological wonders across Bangladesh."}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={language === 'bn' ? 'দর্শনীয় স্থান বা জেলা খুঁজুন...' : 'Search attractions or locations...'}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Division Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs text-slate-500 font-medium shrink-0">
              {language === 'bn' ? 'বিভাগ:' : 'Division:'}
            </span>
            <button
              onClick={() => setSelectedDivision('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedDivision === 'all'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'bn' ? 'সব বিভাগ' : 'All Divisions'}
            </button>
            {DIVISIONS.map(div => (
              <button
                key={div.id}
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedDivision === div.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? div.nameBn : div.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Tourist Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(spot => (
            <div
              key={spot.id}
              onClick={() => navigate(`/tourism/${spot.id}`)}
              className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.nameEn}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{spot.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{language === 'bn' ? spot.locationBn : spot.locationEn}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? spot.nameBn : spot.nameEn}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? spot.descriptionBn : spot.descriptionEn}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(language === 'bn' ? spot.highlightsBn : spot.highlightsEn).map((hl, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">{language === 'bn' ? spot.entryFeeBn : spot.entryFeeEn}</span>
                <span className="text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('action.readMore')}</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
