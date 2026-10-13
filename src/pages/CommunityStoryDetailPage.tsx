import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  MapPin,
  Calendar,
  Star,
  Heart,
  ThumbsUp,
  MessageSquare,
  Share2,
  Flag,
  ArrowLeft,
  DollarSign,
  Compass,
  Sparkles,
  Send,
  User,
  ShieldCheck,
  Trash2,
  Edit3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { CommunityService } from '../services/communityStore';
import { TravelStory, StoryComment } from '../types/community';
import { DIVISIONS, DISTRICTS } from '../data/bangladeshData';

export const CommunityStoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { user, openAuth } = useModal();
  const navigate = useNavigate();

  const [story, setStory] = useState<TravelStory | null>(null);
  const [comments, setComments] = useState<StoryComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [activePhoto, setActivePhoto] = useState<string>('');

  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);

  const [shareToast, setShareToast] = useState(false);
  const [reportToast, setReportToast] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = CommunityService.getStoryById(id, user?.email, false);
    if (found) {
      setStory(found);
      setLikesCount(found.likesCount || 0);
      setHelpfulCount(found.helpfulCount || 0);
      setActivePhoto(found.photos && found.photos.length > 0 ? found.photos[0] : '');

      if (user?.email) {
        setHasLiked(CommunityService.hasUserLiked(found.id, user.email));
        setHasMarkedHelpful(CommunityService.hasUserMarkedHelpful(found.id, user.email));
      }

      const cList = CommunityService.getCommentsForStory(found.id);
      setComments(cList);
    }
  }, [id, user?.email]);

  if (!story) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {language === 'bn' ? 'গল্পটি খুঁজে পাওয়া যায়নি' : 'Travel Story Not Found'}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'bn'
              ? 'গল্পটি মুছে ফেলা হয়েছে অথবা এখনো অ্যাডমিন অনুমোদনের অপেক্ষায় রয়েছে।'
              : 'This story may have been removed or is pending moderation.'}
          </p>
          <button
            onClick={() => navigate('/community')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            {language === 'bn' ? 'কমিউনিটি ফিডে ফিরুন' : 'Back to Community'}
          </button>
        </div>
      </div>
    );
  }

  const division = DIVISIONS.find(d => d.id === story.divisionId);
  const district = DISTRICTS.find(d => d.id === story.districtId);

  const handleLike = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    const res = CommunityService.toggleLikeStory(story.id, user.email);
    setHasLiked(res.liked);
    setLikesCount(res.newCount);
  };

  const handleHelpful = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    const res = CommunityService.toggleHelpfulStory(story.id, user.email);
    setHasMarkedHelpful(res.helpful);
    setHelpfulCount(res.newCount);
  };

  const handleReport = () => {
    if (!user) {
      openAuth('login');
      return;
    }
    if (confirm(language === 'bn' ? 'আপনি কি এই গল্পটি রিপোর্ট করতে চান?' : 'Do you want to report this story?')) {
      CommunityService.reportStory(story.id);
      setReportToast(true);
      setTimeout(() => setReportToast(false), 3000);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuth('login');
      return;
    }
    if (!newComment.trim()) return;

    const created = CommunityService.addComment(story.id, newComment, {
      name: user.name,
      email: user.email
    });

    setComments(prev => [created, ...prev]);
    setNewComment('');
  };

  const isAuthor = user?.email === story.authorEmail;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* Top Banner & Breadcrumb */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
        <img
          src={activePhoto || (story.photos && story.photos[0]) || ''}
          alt={story.titleEn}
          className="w-full h-full object-cover filter brightness-80 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-3 flex-wrap">
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              {t('geo.bangladesh')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/community" className="hover:text-emerald-400 transition-colors">
              {language === 'bn' ? 'কমিউনিটি' : 'Community'}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-400 font-semibold truncate max-w-xs">
              {language === 'bn' ? story.destinationNameBn : story.destinationNameEn}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{story.rating}.0 / 5.0</span>
            </div>

            <div className="px-3 py-1 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {language === 'bn' ? story.destinationNameBn : story.destinationNameEn}
                {division ? ` (${language === 'bn' ? division.nameBn : division.nameEn} বিভাগ)` : ''}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl">
            {language === 'bn' ? story.titleBn : story.titleEn}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Author Meta Row */}
            <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {story.authorAvatar ? (
                  <img
                    src={story.authorAvatar}
                    alt={story.authorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center font-bold text-white text-base">
                    {story.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-extrabold text-white text-base">{story.authorName}</div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ভ্রমণ তারিখ: {story.visitDate}</span>
                    </span>
                    <span>·</span>
                    <span>প্রকাশিত: {story.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Interaction Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    hasLiked
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{likesCount} {language === 'bn' ? 'পছন্দ' : 'Likes'}</span>
                </button>

                <button
                  onClick={handleHelpful}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    hasMarkedHelpful
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasMarkedHelpful ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                  <span>{helpfulCount} {language === 'bn' ? 'উপকারী' : 'Helpful'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReport}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors cursor-pointer"
                  title="Report"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Photo Gallery (thumbnails) */}
            {story.photos && story.photos.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{language === 'bn' ? 'ফটোগ্যালারি' : 'Photo Gallery'}</span>
                  <span className="text-xs text-slate-400 font-normal">
                    ({story.photos.length} {language === 'bn' ? 'টি ছবি' : 'photos'})
                  </span>
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {story.photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhoto(p)}
                      className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activePhoto === p ? 'border-emerald-400 scale-105 shadow-md' : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={p} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Insights: What Saw, Liked Most, Tips, Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>{language === 'bn' ? 'সেখানে কী কী দেখেছেন?' : 'What was seen?'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {language === 'bn' ? story.whatSawBn : story.whatSawEn}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'bn' ? 'সবচেয়ে কী ভালো লেগেছে?' : 'What was liked most?'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {language === 'bn' ? story.whatLikedMostBn : story.whatLikedMostEn}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{language === 'bn' ? 'ভ্রমণ পরামর্শ ও টিপস' : 'Travel tips & advice'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {language === 'bn' ? story.travelTipsBn : story.travelTipsEn}
                </p>
              </div>

              {story.estimatedCostBn && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>{language === 'bn' ? 'আনুমানিক ভ্রমণ খরচ' : 'Estimated expenses'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-300 font-semibold leading-relaxed">
                    {language === 'bn' ? story.estimatedCostBn : story.estimatedCostEn}
                  </p>
                </div>
              )}
            </div>

            {/* Complete Travel Story Narrative */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-lg font-extrabold text-white">
                {language === 'bn' ? 'সম্পূর্ণ ভ্রমণের কাহিনী' : 'Full Travel Memoir'}
              </h3>
              <div className="text-sm sm:text-base text-slate-200 leading-loose whitespace-pre-line space-y-4 font-normal">
                {language === 'bn' ? story.storyBn : story.storyEn}
              </div>
            </div>

            {/* Comments & Discussion Section */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  <span>{language === 'bn' ? 'মন্তব্য ও আলোচনা' : 'Comments & Discussion'}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {comments.length}
                  </span>
                </h3>
              </div>

              {/* Comment Input */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder={
                    user
                      ? language === 'bn'
                        ? 'আপনার মতামত বা কোনো প্রশ্ন থাকলে লিখুন...'
                        : 'Write a comment, share your tips, or ask a question...'
                      : language === 'bn'
                      ? 'মন্তব্য করতে অনুগ্রহ করে প্রথমে লগইন করুন।'
                      : 'Please sign in to join the conversation.'
                  }
                  disabled={!user}
                  className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
                />

                <div className="flex justify-between items-center">
                  {!user ? (
                    <button
                      type="button"
                      onClick={() => openAuth('login')}
                      className="text-xs text-emerald-400 font-bold hover:underline"
                    >
                      {language === 'bn' ? 'লগইন করতে ক্লিক করুন' : 'Click here to sign in'}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">
                      {user.name} হিসেবে মন্তব্য করছেন
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={!user || !newComment.trim()}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-2 disabled:opacity-40 cursor-pointer"
                  >
                    <span>{language === 'bn' ? 'মন্তব্য প্রকাশ করুন' : 'Post Comment'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4 pt-2">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    {language === 'bn' ? 'এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন!' : 'No comments yet. Be the first to start the discussion!'}
                  </p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white text-xs">
                            {c.authorName.charAt(0)}
                          </div>
                          <span className="font-bold text-white">{c.authorName}</span>
                        </div>
                        <span className="text-slate-500 text-[11px]">{c.createdAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 pl-9 leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Destination Highlight Box */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'দর্শনীয় স্থান তথ্য' : 'Destination Info'}</span>
              </div>

              <div>
                <h4 className="text-xl font-black text-white">
                  {language === 'bn' ? story.destinationNameBn : story.destinationNameEn}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {district ? (language === 'bn' ? district.nameBn : district.nameEn) : ''}
                    {division ? `, ${language === 'bn' ? division.nameBn : division.nameEn}` : ''}
                  </span>
                </div>
              </div>

              {story.destinationSpotId && (
                <button
                  onClick={() => navigate(`/tourism/${story.destinationSpotId}`)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'গাইড ও দর্শনীয় স্থান পেজ দেখুন' : 'View Destination Guide'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Back to Community Button */}
            <button
              onClick={() => navigate('/community')}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'bn' ? 'সকল কমিউনিটি গল্পে ফিরুন' : 'Back to All Community Stories'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast notifications */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 px-4 py-2.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs shadow-xl z-50">
          {language === 'bn' ? 'গল্পের লিংক কপি করা হয়েছে!' : 'Story link copied to clipboard!'}
        </div>
      )}

      {reportToast && (
        <div className="fixed bottom-6 right-6 px-4 py-2.5 rounded-2xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs shadow-xl z-50">
          {language === 'bn' ? 'রিপোর্টটি মডারেশনের জন্য জমা হয়েছে।' : 'Report submitted for review.'}
        </div>
      )}
    </div>
  );
};
