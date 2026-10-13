import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, Landmark, Compass, Sparkles, Box } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { HERO_IMAGE, STATS } from '../data/bangladeshData';
import { RiverSunset3DHero } from './3d/RiverSunset3DHero';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { openSearch } = useModal();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [show3D, setShow3D] = useState(true);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      openSearch();
    } else {
      openSearch();
    }
  };

  const statCards = [
    {
      num: language === 'bn' ? STATS.divisions.bn : STATS.divisions.en,
      title: language === 'bn' ? STATS.divisions.labelBn : STATS.divisions.labelEn,
      subtitle: language === 'bn' ? STATS.divisions.descBn : STATS.divisions.descEn,
      icon: Map,
      link: '/divisions'
    },
    {
      num: language === 'bn' ? STATS.districts.bn : STATS.districts.en,
      title: language === 'bn' ? STATS.districts.labelBn : STATS.districts.labelEn,
      subtitle: language === 'bn' ? STATS.districts.descBn : STATS.districts.descEn,
      icon: Landmark,
      link: '/districts'
    },
    {
      num: language === 'bn' ? STATS.upazilas.bn : STATS.upazilas.en,
      title: language === 'bn' ? STATS.upazilas.labelBn : STATS.upazilas.labelEn,
      subtitle: language === 'bn' ? STATS.upazilas.descBn : STATS.upazilas.descEn,
      icon: Compass,
      link: '/upazilas'
    },
    {
      num: language === 'bn' ? STATS.places.bn : STATS.places.en,
      title: language === 'bn' ? STATS.places.labelBn : STATS.places.labelEn,
      subtitle: language === 'bn' ? STATS.places.descBn : STATS.places.descEn,
      icon: Sparkles,
      link: '/tourism'
    }
  ];

  return (
    <section className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center">
      {/* 3D Cinematic River Background (or 2D Fallback) */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Sunset over Bangladesh river"
          className="w-full h-full object-cover object-center filter brightness-95"
          referrerPolicy="no-referrer"
        />
        {/* Render 3D Canvas when show3D is enabled */}
        {show3D && <RiverSunset3DHero />}

        {/* Deep Navy and Emerald Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/70 pointer-events-none" />
      </div>

      {/* Floating 3D Mode Toggle on Top Right of Hero */}
      <div className="absolute top-4 right-4 z-20 hidden sm:block">
        <button
          onClick={() => setShow3D(!show3D)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md transition-all border ${
            show3D
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950/40'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
          }`}
          title="Toggle 3D Cinematic Scene"
        >
          <Box className="w-3.5 h-3.5 text-emerald-400" />
          <span>{show3D ? (language === 'bn' ? 'সরাসরি ৩ডি ভিউ অন' : '3D River Scene ON') : (language === 'bn' ? '৩ডি ভিউ অফ' : '3D Scene OFF')}</span>
        </button>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {/* Bengali Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md mb-6 shadow-lg shadow-emerald-950/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{t('hero.tagline')}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">Bangladesh</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-200/90 font-medium mb-10 leading-relaxed drop-shadow">
          {t('hero.subtitle')}
        </p>

        {/* Large Rounded Search Bar */}
        <div className="max-w-2xl mx-auto mb-14">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center p-2 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md shadow-2xl shadow-black/50 focus-within:border-emerald-400 transition-all"
          >
            <div className="pl-3 sm:pl-4 text-emerald-400">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onClick={() => openSearch()}
              placeholder={t('hero.searchPlaceholder')}
              className="flex-1 px-3 sm:px-4 py-3 bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              onClick={e => {
                e.preventDefault();
                openSearch();
              }}
              className="px-5 sm:px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm sm:text-base transition-colors shadow-lg shadow-emerald-500/30 whitespace-nowrap shrink-0"
            >
              {t('hero.searchBtn')}
            </button>
          </form>
        </div>

        {/* 4 Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(card.link)}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-850/90 border border-slate-800/80 hover:border-emerald-500/50 backdrop-blur-md transition-all duration-200 text-left hover:-translate-y-0.5 shadow-lg shadow-black/20"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums group-hover:text-emerald-300 transition-colors">
                  {card.num}
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-0.5">
                  {card.title}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {card.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
