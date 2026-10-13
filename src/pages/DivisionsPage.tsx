import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Users, Compass, ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS, DISTRICTS } from '../data/bangladeshData';

export const DivisionsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

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
            {language === 'bn' ? 'সকল বিভাগ' : 'All Divisions'}
          </span>
        </nav>

        {/* Page Title */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'প্রশাসনিক পরিভ্রমণ' : 'Administrative Divisions'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'বাংলাদেশের ৮টি বিভাগ' : 'The 8 Divisions of Bangladesh'}
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'বাংলাদেশ আটটি প্রধান প্রশাসনিক বিভাগে বিভক্ত। প্রতিটি বিভাগের রয়েছে নিজস্ব ভূগোল, সংস্কৃতি, নদ-নদী, সমৃদ্ধ ঐতিহ্য এবং পর্যটন আকর্ষণ।'
              : 'Bangladesh is structured into eight distinct administrative divisions, each blessed with unique geography, cultural tapestries, and regional wonders.'}
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {DIVISIONS.map(div => {
            const distCount = DISTRICTS.filter(d => d.divisionId === div.id).length;
            return (
              <div
                key={div.id}
                onClick={() => navigate(`/divisions/${div.id}`)}
                className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800/90 hover:border-emerald-500/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-950/30 flex flex-col justify-between"
              >
                <div>
                  {/* Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    <img
                      src={div.bannerImage}
                      alt={div.nameEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-semibold">
                      {distCount} {language === 'bn' ? 'জেলা' : 'Districts'}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>
                        {language === 'bn'
                          ? `সদর: ${div.headquartersBn}`
                          : `HQ: ${div.headquartersEn}`}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {language === 'bn' ? `${div.nameBn} বিভাগ` : `${div.nameEn} Division`}
                    </h2>

                    <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {language === 'bn' ? div.descriptionBn : div.descriptionEn}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-slate-500">{t('geo.area')}</div>
                        <div className="font-semibold text-slate-300 tabular-nums">
                          {div.areaKm2.toLocaleString()} {language === 'bn' ? 'বর্গ কিমি' : 'km²'}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">{t('geo.population')}</div>
                        <div className="font-semibold text-slate-300 tabular-nums">
                          {div.populationMillions}M
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-slate-800 group-hover:bg-emerald-600 text-slate-200 group-hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5">
                    <span>{t('action.exploreDivision')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
