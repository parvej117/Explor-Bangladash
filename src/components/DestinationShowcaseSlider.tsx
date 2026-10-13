import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Compass,
  ArrowRight,
  Sparkles,
  Pause,
  Play,
  LayoutGrid,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SHOWCASE_DESTINATIONS } from '../data/showcaseDestinations';
import { prefersReducedMotion } from '../utils/webgl';
import { Destination3DCard } from './Destination3DCard';
import { FloatingDestination3DEffect } from './3d/FloatingDestination3DEffect';

type ViewMode = 'multi' | 'spotlight';

export const DestinationShowcaseSlider: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('multi');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [progress, setProgress] = useState(0);

  // Responsive cards per view: 1 on mobile (< 640px), 2 on tablet (< 1024px), 3 on desktop
  const [cardsPerView, setCardsPerView] = useState(3);

  const totalSlides = SHOWCASE_DESTINATIONS.length;
  const autoPlayInterval = 4000; // Exactly 4 seconds
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cardsPerView setup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = viewMode === 'multi' ? Math.max(0, totalSlides - cardsPerView) : totalSlides - 1;

  // Clamp currentIndex whenever maxIndex changes
  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Next slide function
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => {
      if (viewMode === 'multi') {
        return prev >= maxIndex ? 0 : prev + 1;
      }
      return (prev + 1) % totalSlides;
    });
    setProgress(0);
  }, [maxIndex, totalSlides, viewMode]);

  // Previous slide function
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => {
      if (viewMode === 'multi') {
        return prev <= 0 ? maxIndex : prev - 1;
      }
      return (prev - 1 + totalSlides) % totalSlides;
    });
    setProgress(0);
  }, [maxIndex, totalSlides, viewMode]);

  const goToSlide = (idx: number) => {
    const clamped = viewMode === 'multi' ? Math.min(idx, maxIndex) : idx % totalSlides;
    setCurrentIndex(clamped);
    setProgress(0);
  };

  // Autoplay functionality: automatically slide to the next destination every 4 seconds
  // Includes progress bar animation and interval cleanup on unmount
  useEffect(() => {
    if (prefersReducedMotion() || isPaused) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / autoPlayInterval) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + progressIncrement;
      });
    }, stepMs);

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    // Guaranteed interval cleanup when unmounting or re-running
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };
  }, [isPaused, nextSlide, autoPlayInterval, currentIndex]);

  // Handlers for user interactions that reset autoplay progress cleanly
  const handleNext = () => {
    nextSlide();
  };

  const handlePrev = () => {
    prevSlide();
  };

  const handleGoTo = (idx: number) => {
    goToSlide(idx);
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchDelta(0);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchDelta(currentTouch - touchStart);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    if (touchDelta < -40) {
      handleNext();
    } else if (touchDelta > 40) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchDelta(0);
    setIsPaused(false);
  };

  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 text-slate-100 overflow-hidden relative"
      aria-label="Bangladesh Tourist Destinations Showcase"
    >
      {/* Background ambient emerald glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{language === 'bn' ? 'শ্রেষ্ঠ পর্যটন আকর্ষণ' : 'Signature Tourist Showcase'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'bn' ? 'বাংলাদেশের অপরূপ দর্শনীয় স্থান' : 'Iconic Destinations of Bangladesh'}
            </h2>

            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'সৈকত, বনানী, মেঘের পাহাড় আর আড়াই হাজার বছরের ঐতিহ্যবাহী ১২টি সেরা পর্যটন কেন্দ্র এক নজরে ঘুরে দেখুন।'
                : 'Journey through 12 quintessential landmarks of Bangladesh — from the world’s longest sandy beach to ethereal highland peaks and ancient citadels.'}
            </p>
          </div>

          {/* Action Buttons, View Mode Toggle & Header Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start md:self-end">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setViewMode('multi')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'multi'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'কার্ড ক্যারোসেল' : 'Card Carousel'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'কার্ড ভিউ' : 'Card View'}</span>
              </button>
              <button
                onClick={() => setViewMode('spotlight')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'spotlight'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'সিনেম্যাটিক ভিউ' : 'Cinematic Spotlight'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'সিনেম্যাটিক' : 'Spotlight'}</span>
              </button>
            </div>

            <button
              onClick={() => navigate('/tourism')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700/80 hover:border-emerald-500 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>{language === 'bn' ? 'সকল স্থান' : 'All Spots'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Header Mini Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous destination"
                title="Previous slide"
                className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 border border-slate-800 hover:border-emerald-400 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next destination"
                title="Next slide"
                className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 border border-slate-800 hover:border-emerald-400 flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating 3D Depth Indicator / Accent */}
        <div className="relative mb-6 hidden md:block h-12 w-full overflow-hidden">
          <FloatingDestination3DEffect />
        </div>

        {/* ========================================================
            VIEW MODE 1: MULTI-CARD HORIZONTAL CAROUSEL (Default)
           ======================================================== */}
        {viewMode === 'multi' && (
          <div
            className="relative select-none group/carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Navigation Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous destination"
              title="Previous destination"
              className="absolute left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-emerald-400 flex items-center justify-center shadow-2xl shadow-black/80 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Right Navigation Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next destination"
              title="Next destination"
              className="absolute right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-emerald-400 flex items-center justify-center shadow-2xl shadow-black/80 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Horizontal Track Viewport */}
            <div className="overflow-hidden py-4 -my-4 px-1 sm:px-2">
              <div
                className="flex will-change-transform"
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                  transition: 'transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                {SHOWCASE_DESTINATIONS.map((dest, idx) => (
                  <div
                    key={dest.id}
                    className="shrink-0 px-2.5 sm:px-3"
                    style={{
                      flex: `0 0 ${100 / cardsPerView}%`,
                    }}
                  >
                    <Destination3DCard
                      dest={dest}
                      index={idx}
                      totalSlides={totalSlides}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: CINEMATIC SPOTLIGHT EXPANDED HERO CARD
           ======================================================== */}
        {viewMode === 'spotlight' && (
          <div
            className="relative select-none group/spotlight"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Navigation Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous destination"
              title="Previous destination"
              className="absolute left-1 sm:-left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-emerald-400 flex items-center justify-center shadow-2xl shadow-black/80 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Right Navigation Arrow Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next destination"
              title="Next destination"
              className="absolute right-1 sm:-right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-emerald-400 flex items-center justify-center shadow-2xl shadow-black/80 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md group"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="overflow-hidden py-4 -my-4 px-1 sm:px-2">
              <div
                className="flex will-change-transform"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: 'transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
              >
                {SHOWCASE_DESTINATIONS.map((dest, idx) => (
                  <div
                    key={dest.id}
                    className="w-full shrink-0 px-2 sm:px-3"
                    style={{ flex: '0 0 100%' }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-emerald-950/30">
                      {/* Left: Large High-Res Image with 3D Depth Hover */}
                      <div
                        className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[440px] rounded-2xl overflow-hidden bg-slate-950 cursor-pointer group"
                        onClick={() => navigate(dest.link)}
                      >
                        <img
                          src={dest.image}
                          alt={dest.nameEn}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                        {/* Top Left Tag Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-md">
                          {language === 'bn' ? dest.tagBn : dest.tagEn}
                        </div>

                        {/* Slide Counter on Top Right */}
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-slate-300 text-xs font-mono tabular-nums">
                          {String(idx + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                        </div>

                        {/* Mobile bottom title overlay */}
                        <div className="absolute bottom-4 left-4 right-4 lg:hidden">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? dest.locationBn : dest.locationEn}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white drop-shadow">
                            {language === 'bn' ? dest.nameBn : dest.nameEn}
                          </h3>
                        </div>
                      </div>

                      {/* Right: Destination Metadata, Information & CTA */}
                      <div className="lg:col-span-5 flex flex-col justify-between py-2 sm:py-4 px-2 space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Compass className="w-3.5 h-3.5" />
                              <span>{language === 'bn' ? dest.divisionBn : dest.divisionEn}</span>
                            </span>
                            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                              {language === 'bn' ? dest.locationBn : dest.locationEn}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                              {language === 'bn' ? dest.nameBn : dest.nameEn}
                            </h3>
                            <h4 className="text-sm sm:text-base font-semibold text-emerald-400/90 mt-1">
                              {language === 'bn' ? dest.nameEn : dest.nameBn}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>
                              {language === 'bn'
                                ? `অবস্থান: ${dest.locationBn}, ${dest.divisionBn}`
                                : `Location: ${dest.locationEn}, ${dest.divisionEn}`}
                            </span>
                          </div>

                          <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                            {language === 'bn' ? dest.descriptionBn : dest.descriptionEn}
                          </p>
                        </div>

                        {/* CTA and Explore More Button */}
                        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <button
                            onClick={() => navigate(dest.link)}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group cursor-pointer"
                          >
                            <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore More'}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </button>

                          <div className="text-xs text-slate-400 font-medium">
                            {language === 'bn' ? 'স্বয়ংক্রিয় স্লাইডার সক্রিয়' : 'Autoplay active (4s)'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick interactive thumbnail strip underneath Spotlight */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2.5 min-w-max">
                {SHOWCASE_DESTINATIONS.map((dest, i) => (
                  <button
                    key={dest.id}
                    onClick={() => handleGoTo(i)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                      i === currentIndex
                        ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold shadow-sm'
                        : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.nameEn}
                      className="w-5 h-5 rounded-md object-cover"
                      loading="lazy"
                    />
                    <span>{language === 'bn' ? dest.nameBn : dest.nameEn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar & Interactive Pagination Bar */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Pause / Play State Indicator & Live Autoplay Progress */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isPaused ? 'Resume Auto-slide' : 'Pause Auto-slide'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-75 ease-linear rounded-full"
                  style={{ width: `${isPaused ? 0 : progress}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400">
                {isPaused
                  ? language === 'bn'
                    ? 'স্থগিত'
                    : 'Paused'
                  : language === 'bn'
                  ? 'হোভার করলে থামবে'
                  : 'Hover to pause'}
              </span>
            </div>
          </div>

          {/* Pagination Dots for all 12 destinations */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            {SHOWCASE_DESTINATIONS.map((dest, i) => {
              const isActive =
                viewMode === 'multi'
                  ? i >= currentIndex && i < currentIndex + cardsPerView
                  : i === currentIndex;
              return (
                <button
                  key={dest.id}
                  onClick={() => handleGoTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${dest.nameEn}`}
                  title={`${i + 1}. ${language === 'bn' ? dest.nameBn : dest.nameEn}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 h-2.5 bg-emerald-400 shadow-sm shadow-emerald-400/50'
                      : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              );
            })}
          </div>

          {/* Numeric index display */}
          <div className="text-xs font-mono text-emerald-400 font-semibold tabular-nums">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
};
