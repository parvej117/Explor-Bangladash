import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  PenTool,
  Search,
  Filter,
  Star,
  MapPin,
  TrendingUp,
  Clock,
  Heart,
  MessageSquare,
  Users,
  Compass,
  CheckCircle2,
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { DIVISIONS, DISTRICTS } from '../data/bangladeshData';
import { CommunityService } from '../services/communityStore';
import { TravelStory, StoryFilterOptions } from '../types/community';
import { StoryCard } from '../components/community/StoryCard';
import { StorySubmissionModal } from '../components/community/StorySubmissionModal';
import { AdminModerationPanel } from '../components/community/AdminModerationPanel';

export const CommunityPage: React.FC = () => {
  const { language } = useLanguage();
  const { user, openAuth } = useModal();

  const [stories, setStories] = useState<TravelStory[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<'newest' | 'mostLiked' | 'highestRated'>('newest');

  const loadStories = () => {
    const filters: StoryFilterOptions = {
      divisionId: selectedDivision !== 'all' ? selectedDivision : undefined,
      districtId: selectedDistrict !== 'all' ? selectedDistrict : undefined,
      minRating: minRating > 0 ? minRating : undefined,
      sortBy,
      searchQuery: searchQuery.trim() || undefined
    };
    const list = CommunityService.getApprovedStories(filters);
    setStories(list);
  };

  useEffect(() => {
    loadStories();
  }, [selectedDivision, selectedDistrict, minRating, sortBy, searchQuery]);

  const availableDistricts = selectedDivision === 'all'
    ? DISTRICTS
    : DISTRICTS.filter(d => d.divisionId === selectedDivision);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDivision('all');
    setSelectedDistrict('all');
    setMinRating(0);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Hero Header */}
      <div className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'bn' ? 'ভ্রমণ অভিজ্ঞতা ও মতামত' : 'Travel Stories & Community'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {language === 'bn' ? 'বাঙালি ভ্রমণপ্রেমীদের কমিউনিটি' : 'Explore Bangladesh Community Feed'}
              </h1>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'bn'
                  ? 'বাংলাদেশের ৬৪ জেলার পর্যটন কেন্দ্রগুলোতে ভ্রমণকারীদের বাস্তব অভিজ্ঞতা, ফটো গ্যালারি, খরচ ও পরামর্শ পড়ুন এবং নিজের গল্প সবার সঙ্গে শেয়ার করুন।'
                  : 'Read authentic travel memoirs, visitor reviews, photo diaries, and genuine recommendations across all 64 districts of Bangladesh.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
              >
                <PenTool className="w-4 h-4" />
                <span>{language === 'bn' ? 'আমার ভ্রমণের গল্প লিখুন' : 'Write My Story'}</span>
              </button>

              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="px-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? 'মডারেশন প্যানেল' : 'Moderation'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-emerald-400">১০০০+</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'সক্রিয় ভ্রমণকারী' : 'Active Travelers'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white">{stories.length}+</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'অনুমোদিত ভ্রমণ গল্প' : 'Approved Stories'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-amber-400">৪.৯ ★</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'গড় সন্তুষ্টি রেটিং' : 'Average Rating'}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white">৬৪</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === 'bn' ? 'জেলাভিত্তিক কাভারেজ' : 'Districts Covered'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Protected Admin Moderation Panel */}
        {showAdminPanel && (
          <AdminModerationPanel onStoriesChanged={loadStories} />
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={language === 'bn' ? 'গল্প, স্থান বা লেখক খুঁজুন...' : 'Search stories, spots, or author...'}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Division Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDivision}
                onChange={e => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('all');
                }}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{language === 'bn' ? 'সব বিভাগ' : 'All Divisions'}</option>
                {DIVISIONS.map(d => (
                  <option key={d.id} value={d.id}>
                    {language === 'bn' ? `${d.nameBn} বিভাগ` : `${d.nameEn} Division`}
                  </option>
                ))}
              </select>
            </div>

            {/* District Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{language === 'bn' ? 'সব জেলা' : 'All Districts'}</option>
                {availableDistricts.map(dist => (
                  <option key={dist.id} value={dist.id}>
                    {language === 'bn' ? dist.nameBn : dist.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="newest">{language === 'bn' ? 'সর্বশেষ গল্প' : 'Newest First'}</option>
                <option value="mostLiked">{language === 'bn' ? 'সর্বাধিক পছন্দ' : 'Most Liked'}</option>
                <option value="highestRated">{language === 'bn' ? 'সর্বোচ্চ রেটিং' : 'Highest Rated'}</option>
              </select>
            </div>
          </div>

          {/* Quick Rating Filter Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">
                {language === 'bn' ? 'রেটিং ফিল্টার:' : 'Filter by Stars:'}
              </span>
              {[0, 4, 5].map(stars => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    minRating === stars
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {stars === 0 ? (language === 'bn' ? 'সব' : 'All') : `${stars}★ +`}
                </button>
              ))}
            </div>

            {(searchQuery || selectedDivision !== 'all' || selectedDistrict !== 'all' || minRating > 0) && (
              <button
                onClick={resetFilters}
                className="text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
              >
                {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset all filters'}
              </button>
            )}
          </div>
        </div>

        {/* Stories Grid */}
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {stories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
                onStoryUpdated={loadStories}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {language === 'bn' ? 'কোনো গল্প পাওয়া যায়নি' : 'No Travel Stories Found'}
            </h3>
            <p className="text-sm text-slate-400">
              {language === 'bn'
                ? 'আপনার বাছাইকৃত ফিল্টারের সাথে কোনো গল্প মেলেনি। ফিল্টার রিসেট করুন অথবা এই স্থানের প্রথম গল্পটি আপনিই লিখুন!'
                : 'No stories matched your filter criteria. Reset filters or be the first to share your experience!'}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                {language === 'bn' ? 'ফিল্টার মুছুন' : 'Reset Filters'}
              </button>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
              >
                {language === 'bn' ? 'প্রথম গল্পটি লিখুন' : 'Write the First Story'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submission Modal */}
      <StorySubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onStorySubmitted={() => {
          loadStories();
        }}
      />
    </div>
  );
};
