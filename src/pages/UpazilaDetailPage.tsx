import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Landmark, ArrowLeft, Compass, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UPAZILAS, DISTRICTS, DIVISIONS } from '../data/bangladeshData';

export const UpazilaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const upazila = UPAZILAS.find(u => u.id === id) || UPAZILAS[0];
  const district = DISTRICTS.find(d => d.id === upazila.districtId) || DISTRICTS[0];
  const division = DIVISIONS.find(div => div.id === upazila.divisionId) || DIVISIONS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb: বাংলাদেশ > বিভাগ > জেলা > উপজেলা */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 flex-wrap">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to={`/divisions/${division.id}`} className="hover:text-emerald-400 transition-colors">
            {language === 'bn' ? `${division.nameBn} বিভাগ` : `${division.nameEn}`}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link to={`/districts/${district.id}`} className="hover:text-emerald-400 transition-colors">
            {language === 'bn' ? `${district.nameBn} জেলা` : `${district.nameEn}`}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-emerald-400 font-semibold">
            {language === 'bn' ? `${upazila.nameBn} উপজেলা` : `${upazila.nameEn} Upazila`}
          </span>
        </nav>

        {/* Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs font-semibold text-emerald-400 mb-1">
                {language === 'bn' ? `${district.nameBn} জেলার অধীনস্থ` : `Under ${district.nameEn} District`}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">
                {language === 'bn' ? `${upazila.nameBn} উপজেলা` : `${upazila.nameEn} Upazila`}
              </h1>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
              পোস্ট কোড: #{upazila.postCode}
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed">
            {language === 'bn' ? upazila.descriptionBn : upazila.descriptionEn}
          </p>

          {/* Quick Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">{language === 'bn' ? 'ইউনিয়ন সংখ্যা' : 'Unions'}</div>
              <div className="text-xl font-bold text-white mt-1 tabular-nums">{upazila.unionsCount}টি</div>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">{language === 'bn' ? 'জেলা' : 'District'}</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">
                {language === 'bn' ? district.nameBn : district.nameEn}
              </div>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-400">{language === 'bn' ? 'বিভাগ' : 'Division'}</div>
              <div className="text-sm font-bold text-slate-200 mt-1">
                {language === 'bn' ? division.nameBn : division.nameEn}
              </div>
            </div>
          </div>

          {/* Famous Spots in this Upazila */}
          {upazila.famousSpotsBn.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3">
                {language === 'bn' ? 'উপজেলার উল্লেখযোগ্য দর্শনীয় স্থান' : 'Notable Places in this Upazila'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(language === 'bn' ? upazila.famousSpotsBn : upazila.famousSpotsEn).map((spot, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/40 text-emerald-300 text-xs font-medium"
                  >
                    {spot}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-4">
            <button
              onClick={() => navigate(`/districts/${district.id}`)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? `${district.nameBn} জেলায় ফিরে যান` : `Back to ${district.nameEn}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
