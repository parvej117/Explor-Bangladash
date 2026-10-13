import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Compass,
  MapPin,
  Check
} from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useLanguage } from '../context/LanguageContext';
import { Auth3DBackground } from './3d/Auth3DBackground';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth, authMode, setAuthMode, loginUser } = useModal();
  const { language } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(language === 'bn' ? 'সবগুলো ঘর সঠিকভাবে পূরণ করুন।' : 'Please fill in all fields.');
      return;
    }

    if (authMode === 'register' && !name) {
      setError(language === 'bn' ? 'আপনার পূর্ণ নাম লিখুন।' : 'Please enter your full name.');
      return;
    }

    setIsLoading(true);

    const userName = authMode === 'register' ? name : (email.split('@')[0] || 'Traveler');
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(
        authMode === 'register'
          ? language === 'bn'
            ? 'অভিনন্দন! অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।'
            : 'Welcome! Your account has been created successfully.'
          : language === 'bn'
          ? 'স্বাগতম! সফলভাবে লগইন হয়েছে।'
          : 'Welcome back! Signed in successfully.'
      );
      setTimeout(() => {
        loginUser(userName, email);
        setSuccess('');
      }, 700);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(language === 'bn' ? 'গুগল অ্যাকাউন্টে সাইন ইন সম্পন্ন!' : 'Google sign-in successful!');
      setTimeout(() => {
        loginUser('Google Explorer', 'traveler@gmail.com');
        setSuccess('');
      }, 600);
    }, 700);
  };

  const fillQuickDemo = () => {
    setEmail('explorer@bangladesh.travel');
    setPassword('ExploreBD2026!');
    if (authMode === 'register') {
      setName('তানভীর আহমেদ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-950/40 text-slate-100 overflow-hidden relative grid grid-cols-1 md:grid-cols-12"
        onClick={e => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -15px rgba(6, 78, 59, 0.35), 0 0 0 1px rgba(16, 185, 129, 0.15)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700/60 active:scale-95 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================
            LEFT COLUMN: 3D ANIMATED AMBIENT CANVAS & BRANDING
           ======================================================== */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/60 border-r border-slate-800/80 overflow-hidden">
          {/* Real-time Three.js 3D Background */}
          <Auth3DBackground />

          {/* Top Brand Pill */}
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{language === 'bn' ? 'প্রিমিয়াম ট্রাভেলার পোর্টাল' : 'Premium Traveler Portal'}</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-md">
              {language === 'bn' ? 'সোনার বাংলার রূপ আবিষ্কার করুন' : 'Experience the Magic of Bengal'}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed drop-shadow">
              {language === 'bn'
                ? 'লগইন করে আপনার প্রিয় দর্শনীয় স্থান সংরক্ষণ করুন, ভ্রমণ পরিকল্পনা সাজান এবং কমিউনিটিতে গল্প শেয়ার করুন।'
                : 'Sign in to bookmark sacred temples, lush mangroves, customize travel itineraries, and share journeys.'}
            </p>
          </div>

          {/* Feature Highlights on Bottom Left */}
          <div className="relative z-10 space-y-2.5 pt-6 border-t border-emerald-800/30">
            <div className="flex items-center gap-2 text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>{language === 'bn' ? 'ব্যক্তিগত ভ্রমণ উইশলিস্ট' : 'Personalized Travel Wishlist'}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                <Compass className="w-3 h-3" />
              </div>
              <span>{language === 'bn' ? 'স্মার্ট ট্যুর প্ল্যানার ও গাইড' : 'Smart Tour Planner & Guides'}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                <MapPin className="w-3 h-3" />
              </div>
              <span>{language === 'bn' ? '৬৪ জেলার পর্যটন ডেটাবেজ' : '64 District Tourism Insights'}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: AUTHENTICATION FORM & SOCIAL LOGIN
           ======================================================== */}
        <div className="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative z-10">
          <div>
            {/* Tab switch */}
            <div className="flex border-b border-slate-800 pb-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 pb-2.5 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  authMode === 'login'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'bn' ? 'লগইন' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 pb-2.5 text-sm font-bold transition-all border-b-2 cursor-pointer ${
                  authMode === 'register'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {language === 'bn' ? 'নতুন অ্যাকাউন্ট' : 'Register'}
              </button>
            </div>

            {/* Header Titles */}
            <div className="mb-5">
              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {authMode === 'login'
                  ? language === 'bn'
                    ? 'স্বাগতম ভ্রমণপ্রেমী!'
                    : 'Welcome Back, Traveler!'
                  : language === 'bn'
                  ? 'নতুন অ্যাকাউন্ট খুলুন'
                  : 'Start Your Bangladesh Journey'}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login'
                  ? language === 'bn'
                    ? 'আপনার অ্যাকাউন্টে প্রবেশ করে ভ্রমণ শুরু করুন।'
                    : 'Enter your credentials to access your saved places and travel plans.'
                  : language === 'bn'
                  ? 'কয়েক সেকেন্ডে বিনামূল্যে আপনার অ্যাকাউন্ট তৈরি করে নিন।'
                  : 'Create a free traveler account in just a few seconds.'}
              </p>
            </div>

            {/* Google Social Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 mb-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-3 shadow-md active:scale-98 cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{language === 'bn' ? 'গুগল দিয়ে প্রবেশ করুন' : 'Continue with Google'}</span>
            </button>

            {/* Or Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-px bg-slate-800 flex-1" />
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                {language === 'bn' ? 'অথবা ইমেইল দিয়ে' : 'or with email'}
              </span>
              <div className="h-px bg-slate-800 flex-1" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-xs text-rose-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'bn' ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: আহমেদ পারভেজ' : 'e.g. Parvej Ahmed'}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">
                    {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        fillQuickDemo();
                        setError(language === 'bn' ? 'ডেমো তথ্য স্বয়ংক্রিয়ভাবে বসানো হয়েছে।' : 'Demo credentials auto-filled.');
                      }}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                    >
                      {language === 'bn' ? 'ডেমো তথ্য পূরণ করুন' : 'Auto-fill Demo'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Remember Me & Terms */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-emerald-500 focus:ring-0 bg-slate-800"
                  />
                  <span>{language === 'bn' ? 'আমাকে মনে রাখুন' : 'Remember me'}</span>
                </label>

                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>{language === 'bn' ? 'নিরাপদ সেশন' : 'Secure Session'}</span>
                </div>
              </div>

              {/* Submit CTA Button with Emerald 3D styling */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {authMode === 'login'
                        ? language === 'bn'
                          ? 'লগইন করুন'
                          : 'Sign In to Account'
                        : language === 'bn'
                        ? 'নিবন্ধন সম্পন্ন করুন'
                        : 'Complete Registration'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Switcher */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            {authMode === 'login' ? (
              <span>
                {language === 'bn' ? 'এখনও কোনো অ্যাকাউন্ট নেই? ' : "Don't have an account yet? "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setError('');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold cursor-pointer"
                >
                  {language === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create one now'}
                </button>
              </span>
            ) : (
              <span>
                {language === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? ' : 'Already registered? '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                  }}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold cursor-pointer"
                >
                  {language === 'bn' ? 'এখানে লগইন করুন' : 'Sign in here'}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
