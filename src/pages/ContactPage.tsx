import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, ChevronRight, HelpCircle, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const faqs = [
    {
      qBn: 'কক্সবাজার বা সেন্টমার্টিন যাওয়ার সেরা সময় কোনটি?',
      qEn: "When is the best time to visit Cox's Bazar and Saint Martin?",
      aBn: 'সাধারণত অক্টোবর থেকে মার্চ মাস পর্যন্ত সমুদ্র শান্ত থাকে এবং সেন্টমার্টিনে নিয়মিত জাহাজ চলাচল করে। এটি ভ্রমণের জন্য সেরা সময়।',
      aEn: 'November to March is the ideal season when the sea is calm, weather is pleasant, and cruise ships operate regularly to Saint Martin.'
    },
    {
      qBn: 'সুন্দরবন ভ্রমণের জন্য কোনো বিশেষ অনুমতির প্রয়োজন হয় কি?',
      qEn: 'Do I need special permits to travel to the Sundarbans?',
      aBn: 'হ্যাঁ, সুন্দরবনে প্রবেশের জন্য বন অধিদপ্তরের আনুষ্ঠানিক অনুমতি ও প্রবেশ ফি প্রয়োজন হয়, যা সাধারণত নিবন্ধিত ট্যুর অপারেটররা ভ্রমণ প্যাকেজের সাথে সমন্বয় করে থাকে।',
      aEn: 'Yes, entry into the forest requires a permit and entry fee from the Forest Department, typically arranged by certified tour operators.'
    },
    {
      qBn: 'বাংলাদেশে পর্যটকদের সুরক্ষায় কোনো বিশেষ পুলিশ হেল্পলাইন আছে কি?',
      qEn: 'Is there a dedicated police helpline for tourists in Bangladesh?',
      aBn: 'হ্যাঁ, বাংলাদেশ ট্যুরিস্ট পুলিশের ২৪ ঘণ্টা সক্রিয় হটলাইন হলো ০১৩২০০১০১০০। জরুরি প্রয়োজনে জাতীয় জরুরি সেবা ৯৯৯ এ কল করা যায়।',
      aEn: 'Yes, Bangladesh Tourist Police operates a 24/7 dedicated helpline at 01320010100, and National Emergency 999 is accessible nationwide.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {t('nav.contact')}
          </span>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'সহায়তা ও যোগাযোগ' : 'Get in Touch'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'যোগাযোগ ও পর্যটন সহায়তা' : 'Contact & Travel Assistance'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'ভ্রমণ সংক্রান্ত কোনো প্রশ্ন, মতামত বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করতে পারেন।'
              : 'Have inquiries about destinations, heritage documentation, or travel guidance? Reach out to us.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2">
              {language === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send Us a Message'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {language === 'bn' ? 'আমরা শীঘ্রই আপনার বার্তার উত্তর দেব।' : 'We will respond promptly to your travel query.'}
            </p>

            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600 text-xs sm:text-sm text-emerald-200 flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! ধন্যবাদ।'
                    : 'Your message has been sent successfully! Thank you.'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'bn' ? 'আপনার নাম' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: আহমেদ পারভেজ' : 'e.g. Parvej Ahmed'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'bn' ? 'বিষয়' : 'Subject'}
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder={language === 'bn' ? 'ভ্রমণ সহায়তা / তথ্য জানতে চাই' : 'Travel Guide Query'}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {language === 'bn' ? 'আপনার বার্তা' : 'Message'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder={language === 'bn' ? 'আপনার বার্তা এখানে লিখুন...' : 'Write your inquiry here...'}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Right Emergency Hotlines Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'জরুরি পর্যটন ও নিরাপত্তা হেল্পলাইন' : 'Emergency Travel Hotlines'}
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-slate-400">{language === 'bn' ? 'বাংলাদেশ ট্যুরিস্ট পুলিশ' : 'Tourist Police Helpline'}</div>
                  <div className="text-emerald-400 font-bold text-base mt-0.5 font-mono">০১৩২০০১০১০০</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-slate-400">{language === 'bn' ? 'জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স, ফায়ার)' : 'National Emergency (Police/Medical)'}</div>
                  <div className="text-emerald-400 font-bold text-base mt-0.5 font-mono">৯৯৯ (999)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-slate-400">{language === 'bn' ? 'বাংলাদেশ পর্যটন কর্পোরেশন' : 'Bangladesh Parjatan Corporation'}</div>
                  <div className="text-slate-200 font-medium text-xs mt-0.5">info@parjatan.gov.bd</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>{language === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)' : 'Frequently Asked Questions'}</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="font-bold text-sm sm:text-base text-slate-100 mb-2">
                  {language === 'bn' ? faq.qBn : faq.qEn}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {language === 'bn' ? faq.aBn : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
