import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  Unlock,
  AlertTriangle,
  RefreshCw,
  Eye,
  Flag,
  UserCheck
} from 'lucide-react';
import { TravelStory, ModerationStatus } from '../../types/community';
import { CommunityService } from '../../services/communityStore';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';

interface AdminModerationPanelProps {
  onStoriesChanged: () => void;
}

export const AdminModerationPanel: React.FC<AdminModerationPanelProps> = ({ onStoriesChanged }) => {
  const { language } = useLanguage();
  const { user } = useModal();

  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem('explore_bd_admin_unlocked') === 'true';
  });
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'reported'>('pending');
  const [allStories, setAllStories] = useState<TravelStory[]>([]);
  const [actionSuccess, setActionSuccess] = useState('');

  const loadStories = () => {
    const list = CommunityService.getAllStoriesForAdmin();
    setAllStories(list);
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized admin credentials (or developer email)
    if (adminPin.trim() === 'admin2026' || user?.email === 'masumparvej117@gmail.com' || user?.email === 'pogrammmingparvej117@gmail.com') {
      setIsAdminUnlocked(true);
      localStorage.setItem('explore_bd_admin_unlocked', 'true');
      setPinError('');
    } else {
      setPinError(language === 'bn' ? 'ভুল অ্যাডমিন পিন কোড। (ডেমো পিন: admin2026)' : 'Incorrect admin PIN. (Demo PIN: admin2026)');
    }
  };

  const handleLock = () => {
    setIsAdminUnlocked(false);
    localStorage.removeItem('explore_bd_admin_unlocked');
  };

  const handleModerate = (storyId: string, status: ModerationStatus, reason?: string) => {
    CommunityService.moderateStory(storyId, status, reason);
    loadStories();
    onStoriesChanged();
    setActionSuccess(
      status === 'approved'
        ? language === 'bn' ? 'গল্পটি সফলভাবে অনুমোদিত হয়েছে!' : 'Story approved successfully!'
        : language === 'bn' ? 'গল্পটি বাতিল করা হয়েছে।' : 'Story rejected.'
    );
    setTimeout(() => setActionSuccess(''), 3000);
  };

  const handleDelete = (storyId: string) => {
    if (confirm(language === 'bn' ? 'আপনি কি নিশ্চিত যে গল্পটি স্থায়ীভাবে মুছে ফেলতে চান?' : 'Are you sure you want to permanently delete this story?')) {
      CommunityService.deleteStory(storyId, '', true);
      loadStories();
      onStoriesChanged();
      setActionSuccess(language === 'bn' ? 'গল্পটি মুছে ফেলা হয়েছে।' : 'Story deleted successfully.');
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const pendingList = allStories.filter(s => s.status === 'pending');
  const approvedList = allStories.filter(s => s.status === 'approved');
  const reportedList = allStories.filter(s => (s.reportsCount && s.reportsCount > 0) || s.status === 'rejected');

  if (!isAdminUnlocked) {
    return (
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {language === 'bn' ? 'অ্যাডমিন মডারেশন প্যানেল' : 'Admin Moderation Panel'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'bn'
                  ? 'গল্প পর্যালোচনা, অনুমোদন ও রিপোর্ট নিষ্পত্তির জন্য আনলক করুন।'
                  : 'Unlock to review pending submissions, approve stories, and moderate reports.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleUnlock} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="password"
              value={adminPin}
              onChange={e => setAdminPin(e.target.value)}
              placeholder={language === 'bn' ? 'অ্যাডমিন পিন (admin2026)' : 'Admin PIN (admin2026)'}
              className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-48"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
            >
              {language === 'bn' ? 'আনলক' : 'Unlock'}
            </button>
          </form>
        </div>
        {pinError && <p className="text-rose-400 text-xs mt-2 text-right">{pinError}</p>}
      </div>
    );
  }

  return (
    <div className="p-6 rounded-3xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl mb-10">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                {language === 'bn' ? 'কমিউনিটি মডারেশন ড্যাশবোর্ড' : 'Community Moderation Dashboard'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Admin Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'bn'
                ? 'পাবলিক ফিডের গুণমান ও সঠিকতা বজায় রাখতে সাবমিশন পর্যালোচনা করুন।'
                : 'Review submissions and moderate community content to maintain authenticity.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={loadStories}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLock}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'লক করুন' : 'Lock'}</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="my-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 pt-4 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'pending'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span>{language === 'bn' ? 'অপেক্ষমাণ সাবমিশন' : 'Pending Submissions'}</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
            {pendingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'approved'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span>{language === 'bn' ? 'অনুমোদিত গল্প' : 'Approved Stories'}</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
            {approvedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reported')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reported'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span>{language === 'bn' ? 'রিপোর্ট ও বাতিলকৃত' : 'Reports & Rejected'}</span>
          <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
            {reportedList.length}
          </span>
        </button>
      </div>

      {/* Active Tab Content List */}
      <div className="space-y-3 pt-2">
        {activeTab === 'pending' && (
          <>
            {pendingList.length === 0 ? (
              <p className="text-slate-400 text-xs py-6 text-center">
                {language === 'bn' ? 'বর্তমানে কোনো অপেক্ষমাণ গল্প নেই।' : 'No pending submissions at the moment.'}
              </p>
            ) : (
              pendingList.map(st => (
                <div
                  key={st.id}
                  className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-400">
                        {st.destinationNameBn}
                      </span>
                      <span className="text-slate-500 text-xs">· {st.visitDate}</span>
                      <span className="text-slate-500 text-xs">· লেখক: {st.authorName} ({st.authorEmail})</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{st.titleBn}</h4>
                    <p className="text-xs text-slate-300 line-clamp-1">{st.storyBn}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleModerate(st.id, 'approved')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'অনুমোদন' : 'Approve'}</span>
                    </button>
                    <button
                      onClick={() => handleModerate(st.id, 'rejected', 'Content not compliant')}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-rose-950 hover:text-rose-300 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'বাতিল' : 'Reject'}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(st.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'approved' && (
          <>
            {approvedList.map(st => (
              <div
                key={st.id}
                className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400">{st.destinationNameBn}</span>
                    <span className="text-slate-400 text-xs">· লেখক: {st.authorName}</span>
                    <span className="text-xs text-amber-300 font-semibold">★ {st.rating}</span>
                    <span className="text-xs text-slate-500">❤ {st.likesCount}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{st.titleBn}</h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleModerate(st.id, 'rejected', 'Unpublished by admin')}
                    className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-amber-950 hover:text-amber-300 text-slate-300 text-xs font-semibold cursor-pointer"
                  >
                    {language === 'bn' ? 'অপ্রকাশিত করুন' : 'Unpublish'}
                  </button>
                  <button
                    onClick={() => handleDelete(st.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'reported' && (
          <>
            {reportedList.length === 0 ? (
              <p className="text-slate-400 text-xs py-6 text-center">
                {language === 'bn' ? 'কোনো রিপোর্ট বা বাতিলকৃত গল্প নেই।' : 'No reported or rejected stories.'}
              </p>
            ) : (
              reportedList.map(st => (
                <div
                  key={st.id}
                  className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-rose-900/60 text-rose-300 text-[10px] font-bold">
                        {st.reportsCount ? `${st.reportsCount} টি রিপোর্ট` : 'বাতিলকৃত'}
                      </span>
                      <span className="text-xs text-slate-400">{st.destinationNameBn}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{st.titleBn}</h4>
                    {st.rejectionReason && (
                      <p className="text-xs text-rose-300">কারণ: {st.rejectionReason}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleModerate(st.id, 'approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                    >
                      {language === 'bn' ? 'পুনর্বহাল' : 'Restore'}
                    </button>
                    <button
                      onClick={() => handleDelete(st.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};
