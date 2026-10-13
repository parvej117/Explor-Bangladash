import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  ThumbsUp,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  Share2,
  Flag,
  User,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { TravelStory } from '../../types/community';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { CommunityService } from '../../services/communityStore';

interface StoryCardProps {
  story: TravelStory;
  onStoryUpdated?: () => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onStoryUpdated }) => {
  const { language } = useLanguage();
  const { user, openAuth } = useModal();
  const navigate = useNavigate();

  const userEmail = user?.email || '';
  const [likesCount, setLikesCount] = useState(story.likesCount || 0);
  const [hasLiked, setHasLiked] = useState(() => CommunityService.hasUserLiked(story.id, userEmail));

  const [helpfulCount, setHelpfulCount] = useState(story.helpfulCount || 0);
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(() => CommunityService.hasUserMarkedHelpful(story.id, userEmail));

  const [reported, setReported] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Handle Like
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openAuth('login');
      return;
    }
    const res = CommunityService.toggleLikeStory(story.id, user.email);
    setHasLiked(res.liked);
    setLikesCount(res.newCount);
  };

  // Handle Helpful
  const handleHelpful = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openAuth('login');
      return;
    }
    const res = CommunityService.toggleHelpfulStory(story.id, user.email);
    setHasMarkedHelpful(res.helpful);
    setHelpfulCount(res.newCount);
  };

  // Handle Report
  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openAuth('login');
      return;
    }
    if (confirm(language === 'bn' ? 'আপনি কি এই গল্পটি পর্যালোচনার জন্য রিপোর্ট করতে চান?' : 'Do you want to report this story for moderation?')) {
      CommunityService.reportStory(story.id, 'User report');
      setReported(true);
      setTimeout(() => setReported(false), 4000);
    }
  };

  // Handle Share
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/community/${story.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const coverPhoto = story.photos && story.photos.length > 0
    ? story.photos[0]
    : 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80';

  return (
    <div
      onClick={() => navigate(`/community/${story.id}`)}
      className="group flex flex-col h-full bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/30 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer relative"
    >
      {/* Photo with subtle zoom on hover */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
        <img
          src={coverPhoto}
          alt={story.titleEn}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

        {/* Top Badges: Rating & Location */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{story.rating}.0</span>
          </div>

          <div className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-slate-300 text-xs font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{language === 'bn' ? story.destinationNameBn : story.destinationNameEn}</span>
            </span>
          </div>
        </div>

        {/* Top Right: Status / Verified Badge */}
        <div className="absolute top-3.5 right-3.5">
          {story.status === 'approved' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-[11px] font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>{language === 'bn' ? 'অনুমোদিত' : 'Verified'}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-950/80 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[11px] font-semibold">
              <span>{language === 'bn' ? 'পর্যালোচনাধীন' : 'Pending'}</span>
            </span>
          )}
        </div>

        {/* Bottom of Image: Author details & date */}
        <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {story.authorAvatar ? (
              <img
                src={story.authorAvatar}
                alt={story.authorName}
                className="w-7 h-7 rounded-full object-cover border border-emerald-400/80"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-emerald-700 border border-emerald-500 flex items-center justify-center font-bold text-white text-xs">
                {story.authorName.charAt(0)}
              </div>
            )}
            <div className="leading-tight">
              <div className="font-bold text-white text-xs drop-shadow truncate max-w-[140px]">
                {story.authorName}
              </div>
              <div className="text-[10px] text-slate-300/90 flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 text-emerald-400" />
                <span>{story.visitDate}</span>
              </div>
            </div>
          </div>

          {story.estimatedCostBn && (
            <div className="px-2 py-0.5 rounded-lg bg-slate-900/85 backdrop-blur-sm text-[11px] text-emerald-300 font-medium border border-emerald-500/30 hidden sm:inline-block">
              {language === 'bn' ? story.estimatedCostBn : story.estimatedCostEn}
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight line-clamp-2 leading-snug">
            {language === 'bn' ? story.titleBn : story.titleEn}
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {language === 'bn' ? story.storyBn : story.storyEn}
          </p>

          {/* Highlights Chip: What was seen / liked */}
          {story.whatLikedMostBn && (
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 line-clamp-1">
              <span className="text-emerald-400 font-semibold mr-1">
                {language === 'bn' ? 'সেরা স্মৃতি:' : 'Highlight:'}
              </span>
              <span>{language === 'bn' ? story.whatLikedMostBn : story.whatLikedMostEn}</span>
            </div>
          )}
        </div>

        {/* Card Footer: Social actions & Read More Button */}
        <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
          {/* Action buttons: Like, Helpful, Comment */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                hasLiked
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-300 border border-slate-750'
              }`}
              title={language === 'bn' ? 'পছন্দ করুন' : 'Like'}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleHelpful}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                hasMarkedHelpful
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-emerald-300 border border-slate-750'
              }`}
              title={language === 'bn' ? 'উপকারী ভ্রমণ অভিজ্ঞতা' : 'Helpful'}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasMarkedHelpful ? 'fill-emerald-400 text-emerald-400' : ''}`} />
              <span>{helpfulCount}</span>
            </button>

            <div
              className="flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-800/60 text-slate-400 text-xs border border-slate-750"
              title={language === 'bn' ? 'মন্তব্য সংখ্যা' : 'Comments'}
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              <span>{story.commentsCount || 0}</span>
            </div>
          </div>

          {/* Read Full Story Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/community/${story.id}`);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সম্পূর্ণ গল্প পড়ুন' : 'Read Story'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-emerald-950/95 border border-emerald-500 text-emerald-200 text-xs shadow-lg">
          {language === 'bn' ? 'গল্পের লিংক কপি করা হয়েছে!' : 'Story link copied!'}
        </div>
      )}

      {/* Reported Toast */}
      {reported && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-rose-950/95 border border-rose-500 text-rose-200 text-xs shadow-lg">
          {language === 'bn' ? 'রিপোর্ট জমা হয়েছে। ধন্যবাদ!' : 'Report submitted for review.'}
        </div>
      )}
    </div>
  );
};
