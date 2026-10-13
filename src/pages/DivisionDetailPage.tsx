import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Landmark, Compass, ArrowRight, ChevronRight, Wind, Users, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS, DISTRICTS, TOURIST_SPOTS, ARTICLES } from '../data/bangladeshData';

export const DivisionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const division = DIVISIONS.find(d => d.id === id) || DIVISIONS[0];
  const districts = DISTRICTS.filter(d => d.divisionId === division.id);
  const divisionSpots = TOURIST_SPOTS.filter(s => s.divisionId === division.id);
  const relatedArticles = ARTICLES.filter(a =>
    a.tagsBn.some(tag => tag.includes(division.nameBn)) ||
    a.tagsEn.some(tag => tag.toLowerCase().includes(division.nameEn.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero Banner */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <img
          src={division.bannerImage}
          alt={division.nameEn}
          className="w-full h-full object-cover filter brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-3">
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              {t('geo.bangladesh')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/divisions" className="hover:text-emerald-400 transition-colors">
              {t('geo.division')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-400 font-semibold">
              {language === 'bn' ? `${division.nameBn} বিভাগ` : `${division.nameEn} Division`}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {language === 'bn' ? `${division.nameBn} বিভাগ` : `${division.nameEn} Division`}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 mt-2">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <MapPin className="w-4 h-4" />
              <span>
                {language === 'bn' ? `সদর দপ্তর: ${division.headquartersBn}` : `HQ: ${division.headquartersEn}`}
              </span>
            </span>
            <span>·</span>
            <span>{districts.length} {language === 'bn' ? 'টি জেলা' : 'Districts'}</span>
            <span>·</span>
            <span>{division.upazilaCount} {language === 'bn' ? 'টি উপজেলা' : 'Upazilas'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Division Overview & Key Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold text-white">
              {language === 'bn' ? 'বিভাগ পরিচিতি ও ভূগোল' : 'Overview & Geography'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'bn' ? division.descriptionBn : division.descriptionEn}
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
              <Wind className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-300">
                  {language === 'bn' ? 'আবহাওয়া ও জলবায়ু' : 'Climate & Weather'}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {language === 'bn' ? division.climateBn : division.climateEn}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'দ্রুত তথ্য' : 'Quick Facts'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">{t('geo.area')}</span>
                <span className="font-semibold text-slate-200 tabular-nums">
                  {division.areaKm2.toLocaleString()} {language === 'bn' ? 'বর্গ কিমি' : 'km²'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">{t('geo.population')}</span>
                <span className="font-semibold text-emerald-400 tabular-nums">
                  {division.populationMillions} Million
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">{language === 'bn' ? 'জেলা সংখ্যা' : 'Districts Count'}</span>
                <span className="font-semibold text-slate-200 tabular-nums">{division.districtCount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{language === 'bn' ? 'উপজেলা সংখ্যা' : 'Upazilas Count'}</span>
                <span className="font-semibold text-slate-200 tabular-nums">{division.upazilaCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Districts in This Division */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {language === 'bn'
                ? `${division.nameBn} বিভাগের সকল জেলা (${districts.length}টি)`
                : `Districts of ${division.nameEn} (${districts.length})`}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'bn'
                ? 'জেলায় ক্লিক করে উপজেলা, দর্শনীয় স্থান ও স্থানীয় ঐতিহ্য আবিষ্কার করুন।'
                : 'Click any district to explore its upazilas, tourist spots, and regional delicacies.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {districts.map(dist => (
              <div
                key={dist.id}
                onClick={() => navigate(`/districts/${dist.id}`)}
                className="group bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                      {dist.upazilaCount} {language === 'bn' ? 'উপজেলা' : 'Upazilas'}
                    </span>
                    <span className="text-xs text-slate-500 tabular-nums">{dist.population}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? `${dist.nameBn} জেলা` : `${dist.nameEn} District`}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {language === 'bn' ? dist.descriptionBn : dist.descriptionEn}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-500 font-medium mb-1">
                      {language === 'bn' ? 'যার জন্য বিখ্যাত:' : 'Famous for:'}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(language === 'bn' ? dist.famousForBn : dist.famousForEn).slice(0, 2).map((item, idx) => (
                        <span key={idx} className="text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
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
            ))}
          </div>
        </div>

        {/* Division Tourist Spots */}
        {divisionSpots.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                {language === 'bn' ? 'বিভাগের প্রধান দর্শনীয় স্থান' : 'Top Attractions in this Division'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {divisionSpots.map(spot => (
                <div
                  key={spot.id}
                  onClick={() => navigate(`/tourism/${spot.id}`)}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all hover:-translate-y-1"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={spot.image}
                      alt={spot.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-emerald-400 font-medium mb-1">
                      {language === 'bn' ? spot.locationBn : spot.locationEn}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300">
                      {language === 'bn' ? spot.nameBn : spot.nameEn}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
