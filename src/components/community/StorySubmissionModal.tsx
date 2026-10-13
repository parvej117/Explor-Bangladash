import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Camera,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Info,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { DIVISIONS, DISTRICTS } from '../../data/bangladeshData';
import { CommunityService } from '../../services/communityStore';
import { StorySubmissionPayload, TravelStory } from '../../types/community';
import {
  COXSBAZAR_IMAGE,
  SAJEK_IMAGE,
  SUNDARBANS_IMAGE,
  RATARGUL_IMAGE,
  SYLHET_TEA_IMAGE,
  BANDARBAN_IMAGE,
  KUAKATA_IMAGE,
  KAPTAI_IMAGE,
  LALBAGH_IMAGE
} from '../../data/bangladeshData';

interface StorySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStorySubmitted: (story: TravelStory) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  { labelBn: 'কক্সবাজার সৈকত', labelEn: "Cox's Bazar", url: COXSBAZAR_IMAGE },
  { labelBn: 'সাজেক মেঘের রাজ্য', labelEn: 'Sajek Valley', url: SAJEK_IMAGE },
  { labelBn: 'সুন্দরবন ম্যানগ্রোভ', labelEn: 'Sundarbans', url: SUNDARBANS_IMAGE },
  { labelBn: 'রাতারগুল সোয়াম্প', labelEn: 'Ratargul', url: RATARGUL_IMAGE },
  { labelBn: 'শ্রীমঙ্গল চা বাগান', labelEn: 'Sreemangal', url: SYLHET_TEA_IMAGE },
  { labelBn: 'বান্দরবান নীলগিরি', labelEn: 'Bandarban', url: BANDARBAN_IMAGE },
  { labelBn: 'কুয়াকাটা সৈকত', labelEn: 'Kuakata', url: KUAKATA_IMAGE },
  { labelBn: 'কাপ্তাই ঝুলন্ত সেতু', labelEn: 'Kaptai Lake', url: KAPTAI_IMAGE },
  { labelBn: 'লালবাগ কেল্লা', labelEn: 'Lalbagh Fort', url: LALBAGH_IMAGE },
];

export const StorySubmissionModal: React.FC<StorySubmissionModalProps> = ({
  isOpen,
  onClose,
  onStorySubmitted
}) => {
  const { language } = useLanguage();
  const { user, openAuth } = useModal();

  // Form State
  const [title, setTitle] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [divisionId, setDivisionId] = useState(DIVISIONS[0].id);
  const [districtId, setDistrictId] = useState('');
  const [upazilaName, setUpazilaName] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [whatSaw, setWhatSaw] = useState('');
  const [whatLikedMost, setWhatLikedMost] = useState('');
  const [travelTips, setTravelTips] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [story, setStory] = useState('');
  const [grantPublicPermission, setGrantPublicPermission] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTO_PRESETS[0].url);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState(false);

  if (!isOpen) return null;

  // Filter districts belonging to selected division
  const availableDistricts = DISTRICTS.filter(d => d.divisionId === divisionId);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = language === 'bn' ? 'গল্পের একটি আকর্ষণীয় শিরোনাম দিন।' : 'Please enter a story title.';
    } else if (title.trim().length < 5) {
      newErrors.title = language === 'bn' ? 'শিরোনাম অন্তত ৫ অক্ষরের হতে হবে।' : 'Title must be at least 5 characters.';
    }

    if (!destinationName.trim()) {
      newErrors.destinationName = language === 'bn' ? 'ভ্রমণকৃত স্থানের নাম লিখুন।' : 'Please enter the destination name.';
    }

    if (!divisionId) {
      newErrors.divisionId = language === 'bn' ? 'বিভাগ নির্বাচন করুন।' : 'Please select a division.';
    }

    if (!districtId) {
      newErrors.districtId = language === 'bn' ? 'জেলা নির্বাচন করুন।' : 'Please select a district.';
    }

    if (!whatSaw.trim()) {
      newErrors.whatSaw = language === 'bn' ? 'কী কী দেখেছেন সংক্ষেপে লিখুন।' : 'Please describe what you saw.';
    }

    if (!whatLikedMost.trim()) {
      newErrors.whatLikedMost = language === 'bn' ? 'সবচেয়ে কী ভালো লেগেছে লিখুন।' : 'Please share what you liked most.';
    }

    if (!travelTips.trim()) {
      newErrors.travelTips = language === 'bn' ? 'অন্যান্য ভ্রমণকারীদের জন্য কিছু পরামর্শ দিন।' : 'Please provide some travel tips.';
    }

    if (!story.trim()) {
      newErrors.story = language === 'bn' ? 'আপনার ভ্রমণের পুরো অভিজ্ঞতা ও গল্পটি লিখুন।' : 'Please write your complete travel story.';
    } else if (story.trim().length < 30) {
      newErrors.story = language === 'bn' ? 'গল্পটি অন্তত ৩০ অক্ষরের হতে হবে।' : 'Story must be at least 30 characters.';
    }

    if (!grantPublicPermission) {
      newErrors.permission = language === 'bn' ? 'পাবলিক প্রকাশের জন্য সম্মতি চেকবক্সে টিক দিন।' : 'Please check the public display permission box.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      openAuth('login');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    const finalPhoto = customPhotoUrl.trim() || selectedPhoto;

    const payload: StorySubmissionPayload = {
      title: title.trim(),
      story: story.trim(),
      destinationName: destinationName.trim(),
      divisionId,
      districtId: districtId || (availableDistricts[0]?.id ?? 'dhaka'),
      upazilaName: upazilaName.trim(),
      visitDate: visitDate || new Date().toISOString().split('T')[0],
      rating,
      whatSaw: whatSaw.trim(),
      whatLikedMost: whatLikedMost.trim(),
      travelTips: travelTips.trim(),
      estimatedCost: estimatedCost.trim(),
      photos: [finalPhoto],
      grantPublicPermission
    };

    const res = CommunityService.submitStory(payload, {
      name: user.name,
      email: user.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccessBanner(true);
      setTimeout(() => {
        onStorySubmitted(res.story);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-5 sm:p-8 text-slate-100 relative max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'bn' ? 'ভ্রমণ অভিজ্ঞতা প্রকাশ' : 'Share Travel Experience'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {language === 'bn' ? 'আমার ভ্রমণের গল্প লিখুন' : 'Write My Travel Story'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {language === 'bn'
              ? 'বাংলাদেশের কোনো দর্শনীয় স্থানে আপনার স্মৃতি, অভিজ্ঞতা, খরচ ও পরামর্শ সবার সঙ্গে ভাগ করে নিন।'
              : 'Share your genuine memories, photos, tips, and observations across Bangladesh.'}
          </p>
        </div>

        {/* User Logged In Prompt */}
        {!user && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Info className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? 'গল্প প্রকাশের জন্য আপনাকে লগইন করতে হবে।'
                  : 'You must be logged in to submit a travel story.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 cursor-pointer"
            >
              {language === 'bn' ? 'এখনই লগইন করুন' : 'Sign In Now'}
            </button>
          </div>
        )}

        {/* Success Banner */}
        {successBanner && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">
                {language === 'bn' ? 'ধন্যবাদ! আপনার গল্পটি সফলভাবে জমা হয়েছে।' : 'Success! Your travel story has been published.'}
              </div>
              <div className="text-xs text-emerald-300 mt-0.5">
                {language === 'bn' ? 'কমিউনিটি ফিডে এটি যুক্ত হচ্ছে...' : 'Adding to the public community feed...'}
              </div>
            </div>
          </div>
        )}

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author info preview */}
          {user && (
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-200">{user.name}</div>
                  <div className="text-slate-400 text-[11px]">{user.email}</div>
                </div>
              </div>
              <span className="text-emerald-400 font-semibold">
                {language === 'bn' ? 'ভ্রমণকারী লেখক' : 'Travel Author'}
              </span>
            </div>
          )}

          {/* 1. Title & Destination Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'গল্পের আকর্ষণীয় শিরোনাম *' : 'Story Title *'}
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: মেঘের দেশে তিন দিন: সাজেক ভ্রমণ' : 'e.g. Three Days in the Clouds: Sajek Valley'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'দর্শনীয় স্থানের নাম *' : 'Destination Name *'}
              </label>
              <input
                type="text"
                value={destinationName}
                onChange={e => setDestinationName(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: সাজেক ভ্যালি, রাঙামাটি' : 'e.g. Sajek Valley'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {errors.destinationName && <p className="text-rose-400 text-xs mt-1">{errors.destinationName}</p>}
            </div>
          </div>

          {/* 2. Geographic Hierarchy: Division, District, Upazila */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'বিভাগ নির্বাচন করুন *' : 'Select Division *'}
              </label>
              <select
                value={divisionId}
                onChange={e => {
                  setDivisionId(e.target.value);
                  setDistrictId('');
                }}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {DIVISIONS.map(d => (
                  <option key={d.id} value={d.id}>
                    {language === 'bn' ? `${d.nameBn} বিভাগ` : `${d.nameEn} Division`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'জেলা নির্বাচন করুন *' : 'Select District *'}
              </label>
              <select
                value={districtId}
                onChange={e => setDistrictId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="">{language === 'bn' ? '-- জেলা বেছে নিন --' : '-- Choose District --'}</option>
                {availableDistricts.map(dist => (
                  <option key={dist.id} value={dist.id}>
                    {language === 'bn' ? dist.nameBn : dist.nameEn}
                  </option>
                ))}
              </select>
              {errors.districtId && <p className="text-rose-400 text-xs mt-1">{errors.districtId}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'উপজেলা / এলাকা (ঐচ্ছিক)' : 'Upazila / Area (Optional)'}
              </label>
              <input
                type="text"
                value={upazilaName}
                onChange={e => setUpazilaName(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: বাঘাইছড়ি' : 'e.g. Baghaichhari'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 3. Date of Visit & Experience Star Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'ভ্রমণের তারিখ / সময়' : 'Date of Visit'}
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={e => setVisitDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'সার্বিক অভিজ্ঞতা রেটিং (১ থেকে ৫ স্টার)' : 'Overall Rating (1 to 5 Stars)'}
              </label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map(star => {
                  const active = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          active
                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold text-amber-300 ml-2">
                  {rating} / 5 {language === 'bn' ? 'স্টার' : 'Stars'}
                </span>
              </div>
            </div>
          </div>

          {/* 4. What did you see? & What did you like most? */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'সেখানে কী কী দেখেছেন? *' : 'What did you see there? *'}
              </label>
              <textarea
                rows={2}
                value={whatSaw}
                onChange={e => setWhatSaw(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: কংলাক পাহাড়ের চূড়া, রুইলুই পাড়া, মেঘের সাগর ও হেলিপ্যাডে সূর্যাস্ত।' : 'e.g. Konglak peak, Ruilui village, endless clouds.'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {errors.whatSaw && <p className="text-rose-400 text-xs mt-1">{errors.whatSaw}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'সবচেয়ে কী ভালো লেগেছে? *' : 'What did you like most? *'}
              </label>
              <textarea
                rows={2}
                value={whatLikedMost}
                onChange={e => setWhatLikedMost(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: ভোরে কটেজের বারান্দায় মেঘেদের ওড়াউড়ি ও স্থানীয় বাঁশের চিকেন।' : 'e.g. Sunrise above cloud blanket and bamboo chicken.'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {errors.whatLikedMost && <p className="text-rose-400 text-xs mt-1">{errors.whatLikedMost}</p>}
            </div>
          </div>

          {/* 5. Travel Tips & Estimated Expenses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'অন্যান্য ভ্রমণকারীদের জন্য পরামর্শ *' : 'Travel tips for other visitors *'}
              </label>
              <textarea
                rows={2}
                value={travelTips}
                onChange={e => setTravelTips(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: আগে থেকে কটেজ বুক করুন, নগদ টাকা সাথে রাখুন।' : 'e.g. Book in advance, carry sufficient cash.'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {errors.travelTips && <p className="text-rose-400 text-xs mt-1">{errors.travelTips}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {language === 'bn' ? 'আনুমানিক ভ্রমণ খরচ (ঐচ্ছিক)' : 'Estimated travel expenses (Optional)'}
              </label>
              <input
                type="text"
                value={estimatedCost}
                onChange={e => setEstimatedCost(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: জনপ্রতি প্রায় ৫,৫০০ টাকা (৩ দিন ২ রাত)' : 'e.g. Approx. Tk 5,500 per person (3 days)'}
                className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 6. Photo Selection / Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {language === 'bn' ? 'ভ্রমণের ছবি নির্বাচন করুন (বা ইমেজ লিংক দিন)' : 'Select Story Photograph (or Enter Image URL)'}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {SAMPLE_PHOTO_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(p.url);
                    setCustomPhotoUrl('');
                  }}
                  className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                    selectedPhoto === p.url && !customPhotoUrl
                      ? 'border-emerald-400 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.labelEn} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[10px] text-white p-0.5 truncate text-center">
                    {language === 'bn' ? p.labelBn : p.labelEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Photo URL option */}
            <div className="relative">
              <Camera className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="url"
                value={customPhotoUrl}
                onChange={e => setCustomPhotoUrl(e.target.value)}
                placeholder={language === 'bn' ? 'অথবা আপনার নিজস্ব ফটোর অনলাইন লিংক পেস্ট করুন (https://...)' : 'Or paste your custom image URL (https://...)'}
                className="w-full pl-9 pr-3 py-2 bg-slate-800/70 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* 7. Full Travel Story Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {language === 'bn' ? 'আপনার সম্পূর্ণ ভ্রমণের গল্প ও বিস্তারিত বিবরণ *' : 'Complete Travel Story *'}
            </label>
            <textarea
              rows={6}
              value={story}
              onChange={e => setStory(e.target.value)}
              placeholder={language === 'bn' ? 'আপনার ভ্রমণের পুরো কাহিনী বিস্তারিত বর্ণনা করুন—কীভাবে রওনা হয়েছিলেন, আবহাওয়া কেমন ছিল, কী খেলেন, কী কী রোমাঞ্চকর ঘটনা ঘটেছিল...' : 'Describe your entire journey in detail: departure, stay, transportation, culture, highlights...'}
              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
            {errors.story && <p className="text-rose-400 text-xs mt-1">{errors.story}</p>}
          </div>

          {/* 8. Public Permission Checkbox */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={grantPublicPermission}
                onChange={e => setGrantPublicPermission(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                {language === 'bn'
                  ? 'আমি এই ভ্রমণ অভিজ্ঞতা Explore Bangladesh প্ল্যাটফর্মে সর্বসাধারণের পাঠের জন্য প্রকাশের অনুমতি দিচ্ছি এবং নিশ্চিত করছি যে প্রদত্ত তথ্য সত্য ও সঠিক।'
                  : 'I grant permission to publicly publish this travel experience on Explore Bangladesh and confirm the information is authentic.'}
              </span>
            </label>
            {errors.permission && <p className="text-rose-400 text-xs mt-1">{errors.permission}</p>}
          </div>

          {/* Submit Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{language === 'bn' ? 'গল্প প্রকাশের জন্য জমা দিন' : 'Submit Story for Publication'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
