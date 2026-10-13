import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Landmark, ArrowRight, Compass, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS, DISTRICTS } from '../data/bangladeshData';
import { Bangladesh3DGlobe } from './3d/Bangladesh3DGlobe';

export const GeographicExplorer: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>('dhaka');
  const [showGlobe, setShowGlobe] = useState<boolean>(true);

  const selectedDivision = DIVISIONS.find(d => d.id === selectedDivisionId) || DIVISIONS[0];
  const divisionDistricts = DISTRICTS.filter(d => d.divisionId === selectedDivisionId);

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
              {language === 'bn' ? 'ভৌগোলিক পরিভ্রমণ' : 'Geographic Hierarchy'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('sec.divisionsTitle')}
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              {t('sec.divisionsSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/divisions')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-end"
          >
            <span>{language === 'bn' ? 'সকল বিভাগ ও জেলা দেখুন' : 'View All 8 Divisions'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Division Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {DIVISIONS.map(div => {
            const isSelected = div.id === selectedDivisionId;
            return (
              <button
                key={div.id}
                onClick={() => setSelectedDivisionId(div.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
                }`}
              >
                {language === 'bn' ? `${div.nameBn} বিভাগ` : `${div.nameEn}`}
              </button>
            );
          })}
        </div>

        {/* Selected Division Featured Box */}
        <div className="bg-slate-900 border border-slate-800/90 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <MapPin className="w-4 h-4" />
                <span>
                  {language === 'bn'
                    ? `সদর দপ্তর: ${selectedDivision.headquartersBn}`
                    : `Headquarters: ${selectedDivision.headquartersEn}`}
                </span>
                <span className="text-slate-600">·</span>
                <span>
                  {selectedDivision.areaKm2.toLocaleString()} {language === 'bn' ? 'বর্গ কিমি' : 'sq km'}
                </span>
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  {language === 'bn' ? `${selectedDivision.nameBn} বিভাগ` : `${selectedDivision.nameEn} Division`}
                </h3>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {language === 'bn' ? selectedDivision.descriptionBn : selectedDivision.descriptionEn}
                </p>
              </div>

              {/* Division Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">
                    {language === 'bn' ? 'মোট জেলা' : 'Districts'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {selectedDivision.districtCount}
                  </div>
                </div>
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">
                    {language === 'bn' ? 'মোট উপজেলা' : 'Upazilas'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {selectedDivision.upazilaCount}
                  </div>
                </div>
                <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium">
                    {language === 'bn' ? 'জনসংখ্যা' : 'Population'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
                    {selectedDivision.populationMillions}M
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {language === 'bn' ? 'প্রধান দর্শনীয় স্থান' : 'Top Highlights'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(language === 'bn' ? selectedDivision.highlightSpotsBn : selectedDivision.highlightSpotsEn).map(
                    (spot, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs bg-slate-800 border border-slate-700/80 text-slate-200 rounded-lg"
                      >
                        {spot}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigate(`/divisions/${selectedDivision.id}`)}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-950/50 inline-flex items-center gap-2"
                >
                  <span>{language === 'bn' ? `${selectedDivision.nameBn} বিভাগের পূর্ণাঙ্গ গাইড` : `Full Guide to ${selectedDivision.nameEn}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Media: Switch between 3D Globe and Photo */}
            <div className="lg:col-span-5 relative h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl bg-slate-950 flex flex-col justify-between">
              {/* Media Toggle Switch */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700">
                <button
                  onClick={() => setShowGlobe(true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    showGlobe
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? '৩ডি গ্লোব' : '3D Globe'}
                </button>
                <button
                  onClick={() => setShowGlobe(false)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    !showGlobe
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? 'ল্যান্ডস্কেপ ছবি' : 'Photo'}
                </button>
              </div>

              {showGlobe ? (
                <Bangladesh3DGlobe
                  selectedDivisionId={selectedDivisionId}
                  onSelectDivision={setSelectedDivisionId}
                  language={language}
                />
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={selectedDivision.bannerImage}
                    alt={selectedDivision.nameEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-emerald-300 font-medium">
                      {language === 'bn' ? selectedDivision.climateBn : selectedDivision.climateEn}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Districts in This Division */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <span>
                {language === 'bn'
                  ? `${selectedDivision.nameBn} বিভাগের জেলাসমূহ (${divisionDistricts.length}টি)`
                  : `Districts of ${selectedDivision.nameEn} (${divisionDistricts.length})`}
              </span>
            </h4>
            <span className="text-xs text-slate-400">
              {language === 'bn' ? 'জেলায় ক্লিক করে বিস্তারিত দেখুন' : 'Click district for details'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {divisionDistricts.map(dist => (
              <div
                key={dist.id}
                onClick={() => navigate(`/districts/${dist.id}`)}
                className="group p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    {dist.nameBn.charAt(0)}
                  </div>
                  <div className="text-[11px] text-slate-400 tabular-nums">
                    {dist.upazilaCount} {language === 'bn' ? 'উপজেলা' : 'upazilas'}
                  </div>
                </div>

                <div className="mt-3">
                  <h5 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? `${dist.nameBn} জেলা` : `${dist.nameEn} District`}
                  </h5>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                    {language === 'bn' ? dist.descriptionBn : dist.descriptionEn}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 group-hover:text-emerald-400">
                  <span className="truncate max-w-[150px]">
                    {language === 'bn' ? dist.famousForBn[0] : dist.famousForEn[0]}
                  </span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
