import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Compass, ChevronRight, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UPAZILAS, DISTRICTS, DIVISIONS } from '../data/bangladeshData';

export const UpazilasPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = UPAZILAS.filter(u => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      u.nameBn.toLowerCase().includes(q) ||
      u.nameEn.toLowerCase().includes(q) ||
      u.descriptionBn.toLowerCase().includes(q) ||
      u.postCode.includes(q)
    );
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
            {language === 'bn' ? 'উপজেলা ডিরেক্টরি' : 'Upazilas Directory'}
          </span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'তৃণমূল প্রশাসনিক ইউনিট' : 'Grassroots Administration'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'বাংলাদেশের উপজেলাসমূহ' : 'Upazilas of Bangladesh'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'সারাদেশে প্রায় ৪৯৫+ উপজেলা রয়েছে। এখানে নির্বাচিত গুরুত্বপূর্ণ ও পর্যটনসমৃদ্ধ উপজেলাসমূহের তথ্য উপস্থাপন করা হলো।'
              : 'Bangladesh encompasses 495+ administrative upazilas serving as the primary local administration unit.'}
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={language === 'bn' ? 'উপজেলা নাম বা পোস্ট কোড দিয়ে খুঁজুন...' : 'Search upazila or post code...'}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map(u => {
            const district = DISTRICTS.find(d => d.id === u.districtId);
            const division = DIVISIONS.find(div => div.id === u.divisionId);
            return (
              <div
                key={u.id}
                onClick={() => navigate(`/upazilas/${u.id}`)}
                className="group p-5 rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-emerald-400 font-semibold">
                      {language === 'bn' ? district?.nameBn : district?.nameEn}
                    </span>
                    <span className="font-mono text-slate-500">#{u.postCode}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? `${u.nameBn} উপজেলা` : `${u.nameEn} Upazila`}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {language === 'bn' ? u.descriptionBn : u.descriptionEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
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
