import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  PenTool,
  ArrowRight,
  Compass,
  MessageSquare,
  Users,
  Star,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CommunityService } from '../../services/communityStore';
import { TravelStory } from '../../types/community';
import { StoryCard } from './StoryCard';
import { StorySubmissionModal } from './StorySubmissionModal';

export const CommunitySection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [stories, setStories] = useState<TravelStory[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('all');

  const loadStories = () => {
    const list = CommunityService.getApprovedStories();
    setStories(list);
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleStorySubmitted = (newStory: TravelStory) => {
    loadStories();
  };

  const filteredStories = selectedDivision === 'all'
    ? stories.slice(0, 3)
    : stories.filter(s => s.divisionId === selectedDivision).slice(0, 3);

  return (
    <section
      className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800/80 text-slate-100 relative overflow-hidden"
      aria-label="Community Travel Stories Section"
    >
      {/* Background ambient emerald glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-emerald-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'ভ্রমণ অভিজ্ঞতা ও মতামত' : 'Travel Stories & Community Reviews'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'bn' ? 'আপনার ভ্রমণের গল্প শেয়ার করুন' : 'Share Your Travel Story'}
            </h2>

            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশের কোন জায়গায় ঘুরেছেন? কী দেখেছেন? আপনার অভিজ্ঞতা সবার সঙ্গে ভাগ করে নিন।'
                : 'Where did you travel in Bangladesh? What did you see? Share your genuine experience, tips, and photos with the community.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 group cursor-pointer"
            >
              <PenTool className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>{language === 'bn' ? 'আমার ভ্রমণের গল্প লিখুন' : 'Write My Travel Story'}</span>
            </button>

            <button
              onClick={() => navigate('/community')}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 hover:border-emerald-500 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>{language === 'bn' ? 'সব গল্প দেখুন' : 'View All Stories'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Division Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'all', nameBn: 'সব অভিজ্ঞতা', nameEn: 'All Stories' },
            { id: 'chattogram', nameBn: 'চট্টগ্রাম', nameEn: 'Chattogram' },
            { id: 'sylhet', nameBn: 'সিলেট', nameEn: 'Sylhet' },
            { id: 'khulna', nameBn: 'খুলনা', nameEn: 'Khulna' },
            { id: 'dhaka', nameBn: 'ঢাকা', nameEn: 'Dhaka' },
            { id: 'barishal', nameBn: 'বরিশাল', nameEn: 'Barishal' },
            { id: 'rajshahi', nameBn: 'রাজশাহী', nameEn: 'Rajshahi' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedDivision(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDivision === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {language === 'bn' ? tab.nameBn : tab.nameEn}
            </button>
          ))}
        </div>

        {/* Community Story Cards Grid (3 Cards on Homepage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onStoryUpdated={loadStories}
            />
          ))}
        </div>

        {/* Bottom Banner Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                {language === 'bn' ? 'বাঙালি ভ্রমণপ্রেমীদের উন্মুক্ত মঞ্চ' : 'Open Platform for Travel Enthusiasts'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'bn'
                  ? 'আপনার প্রতিটি পরামর্শ অন্য একজন পর্যটকের পথচলাকে সহজ ও আনন্দময় করে তুলবে।'
                  : 'Every tip and authentic story you share makes exploring Bangladesh richer for fellow travelers.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            {language === 'bn' ? 'আপনার গল্প জমা দিন' : 'Submit Your Story'}
          </button>
        </div>
      </div>

      {/* Story Submission Modal */}
      <StorySubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onStorySubmitted={handleStorySubmitted}
      />
    </section>
  );
};
