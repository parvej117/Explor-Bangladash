import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight, Award, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONALITIES, DISTRICTS } from '../data/bangladeshData';

export const PersonalitiesPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {language === 'bn' ? 'বিখ্যাত মনীষী ও ব্যক্তিত্ব' : 'Famous Personalities'}
          </span>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'বাঙালির গৌরব' : 'Pride of the Nation'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'বিখ্যাত মনীষী ও স্মরণীয় ব্যক্তিত্ব' : 'Eminent Personalities of Bangladesh'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'সাহিত্য, স্বাধীনতা সংগ্রাম, বিজ্ঞান, নারী শিক্ষা, মানবাধিকার ও সমাজে অসামান্য অবদানের মাধ্যমে যারা বাংলাদেশকে বিশ্বমঞ্চে সমুজ্জ্বল করেছেন।'
              : 'Pioneering leaders, poets, social reformers, Nobel laureates, and scientists whose legacies shape our national identity.'}
          </p>
        </div>

        {/* Personalities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PERSONALITIES.map(person => {
            const district = DISTRICTS.find(d => d.id === person.districtId);
            return (
              <div
                key={person.id}
                className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? district?.nameBn : district?.nameEn}</span>
                    </span>
                    <span className="font-mono text-slate-400">{person.lifespan}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-1">
                    {language === 'bn' ? person.nameBn : person.nameEn}
                  </h2>
                  <div className="text-xs font-semibold text-emerald-400/90 mb-4">
                    {language === 'bn' ? person.roleBn : person.roleEn}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {language === 'bn' ? person.bioBn : person.bioEn}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>{language === 'bn' ? 'অনবদ্য কীর্তি ও অবদান:' : 'Key Achievements:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {(language === 'bn' ? person.achievementsBn : person.achievementsEn).map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 shrink-0 font-bold">·</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
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
