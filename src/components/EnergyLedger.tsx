import React, { useState, useEffect } from 'react';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import type { LedgerEntry, StreakData } from '../utils/storage';
import {
  getStreakData,
  saveStreakData,
  getLedgerEntries,
  addLedgerEntry,
  deleteLedgerEntry,
} from '../utils/storage';
import { soundSynth } from '../utils/audio';
import {
  BookOpen,
  Code2,
  Dumbbell,
  PenTool,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  Flame,
  Award,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnergyLedgerProps {
  currentLocale: Locale;
}

export const EnergyLedger: React.FC<EnergyLedgerProps> = ({ currentLocale }) => {
  const t = translations[currentLocale].ledger;
  const m = translations[currentLocale].milestones;

  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 1,
    longestStreak: 1,
    streakStartDate: new Date().toISOString(),
    lastCheckInDate: new Date().toISOString(),
    totalTransmutations: 0,
    totalEnergyPoints: 0,
  });

  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  // Form Fields
  const [category, setCategory] = useState<LedgerEntry['category']>('code');
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(100);
  const [unit, setUnit] = useState<string>('lines of code');
  const [notes, setNotes] = useState<string>('');

  // Load from LocalStorage
  const refreshData = () => {
    setStreak(getStreakData());
    setEntries(getLedgerEntries());
  };

  useEffect(() => {
    refreshData();

    // Listen for custom events (e.g. from Transmute sprint completion or vault import)
    const handlePrefillLog = (e: Event) => {
      const customEvent = e as CustomEvent<{
        title: string;
        category: LedgerEntry['category'];
        amount: number;
        unit: string;
      }>;
      if (customEvent.detail) {
        setTitle(customEvent.detail.title || '');
        setCategory(customEvent.detail.category || 'deepwork');
        setAmount(customEvent.detail.amount || 15);
        setUnit(customEvent.detail.unit || 'sprint minutes');
        setIsFormOpen(true);
        const el = document.getElementById('ledger-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleVaultUpdated = () => {
      refreshData();
    };

    window.addEventListener('forge-open-log-entry', handlePrefillLog);
    window.addEventListener('forge-vault-updated', handleVaultUpdated);
    return () => {
      window.removeEventListener('forge-open-log-entry', handlePrefillLog);
      window.removeEventListener('forge-vault-updated', handleVaultUpdated);
    };
  }, []);

  // Update default unit based on selected category
  const handleCategoryChange = (cat: LedgerEntry['category']) => {
    setCategory(cat);
    switch (cat) {
      case 'code':
        setUnit('lines of code');
        setAmount(150);
        break;
      case 'reading':
        setUnit('pages read');
        setAmount(15);
        break;
      case 'workout':
        setUnit('sets / reps');
        setAmount(5);
        break;
      case 'writing':
        setUnit('words written');
        setAmount(500);
        break;
      case 'deepwork':
        setUnit('sprint minutes');
        setAmount(15);
        break;
      default:
        setUnit('units');
        setAmount(1);
    }
  };

  // Submit Log Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Calculate energy points (e.g. 15 min sprint = 30 pts, 100 lines = 25 pts, etc.)
    let points = 20;
    if (category === 'code') points = Math.max(10, Math.round(amount * 0.25));
    if (category === 'reading') points = Math.max(10, Math.round(amount * 2));
    if (category === 'workout') points = Math.max(15, Math.round(amount * 4));
    if (category === 'writing') points = Math.max(10, Math.round(amount * 0.05));
    if (category === 'deepwork') points = Math.max(15, Math.round(amount * 2));

    addLedgerEntry({
      category,
      title: title.trim(),
      amount: Number(amount) || 1,
      unit: unit.trim() || 'units',
      energyPoints: points,
      notes: notes.trim(),
    });

    soundSynth.playComplete();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8B9A6E', '#BFD1A4', '#EAE2D6'],
      });
    } catch {
      // Ignored
    }

    refreshData();
    setIsFormOpen(false);
    setTitle('');
    setNotes('');
  };

  // Streak Controls
  const handleAdvanceStreak = () => {
    const nextCurrent = streak.currentStreak + 1;
    const nextLongest = Math.max(streak.longestStreak, nextCurrent);
    const updated: StreakData = {
      ...streak,
      currentStreak: nextCurrent,
      longestStreak: nextLongest,
      lastCheckInDate: new Date().toISOString(),
    };
    saveStreakData(updated);
    setStreak(updated);
    soundSynth.playBowl(587, 2.0, 0.2);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#8B9A6E', '#EAE2D6'],
      });
    } catch {
      // Ignored
    }
  };

  const handleResetStreak = () => {
    if (window.confirm(t.streakResetConfirm)) {
      const updated: StreakData = {
        ...streak,
        currentStreak: 1,
        streakStartDate: new Date().toISOString(),
        lastCheckInDate: new Date().toISOString(),
      };
      saveStreakData(updated);
      setStreak(updated);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t.deleteConfirm)) {
      deleteLedgerEntry(id);
      refreshData();
    }
  };

  // Helper for Category Icon
  const getCategoryIcon = (cat: LedgerEntry['category']) => {
    switch (cat) {
      case 'code':
        return <Code2 className="w-4 h-4 text-[#8B9A6E]" />;
      case 'reading':
        return <BookOpen className="w-4 h-4 text-[#8B9A6E]" />;
      case 'workout':
        return <Dumbbell className="w-4 h-4 text-[#8B9A6E]" />;
      case 'writing':
        return <PenTool className="w-4 h-4 text-[#8B9A6E]" />;
      case 'deepwork':
        return <Clock className="w-4 h-4 text-[#8B9A6E]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#8B9A6E]" />;
    }
  };

  // Milestones timeline definition
  const milestonesList = [
    { day: 1, key: 'day1' as const },
    { day: 3, key: 'day3' as const },
    { day: 7, key: 'day7' as const },
    { day: 14, key: 'day14' as const },
    { day: 30, key: 'day30' as const },
    { day: 60, key: 'day60' as const },
    { day: 90, key: 'day90' as const },
  ];

  return (
    <div className="space-y-10">
      {/* 1. Dual Metric Tracker: Streaks + Converted Energy Points */}
      <section id="ledger-section" className="scroll-mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Current Streak Days */}
          <div className="p-5 rounded-2xl bg-[#EAE2D6] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] shadow-soft-sm relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#8B9A6E] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.currentStreak}
              </span>
              <Flame className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#22241F] dark:text-[#EFECE6]">
                {streak.currentStreak}
              </span>
              <span className="text-sm font-semibold text-[#6A735E] dark:text-[#8D9683]">
                {t.days}
              </span>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D5CCC0] dark:border-[#272B21]">
              <button
                onClick={handleAdvanceStreak}
                type="button"
                className="text-[11px] font-bold text-[#8B9A6E] hover:text-[#717F55] flex items-center gap-1 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.streakAdvance}</span>
              </button>
              <button
                onClick={handleResetStreak}
                type="button"
                className="text-[10px] text-[#A86464] hover:underline"
                title={t.streakReset}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Card 2: Longest Streak Recorded */}
          <div className="p-5 rounded-2xl bg-[#EAE2D6] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] shadow-soft-sm">
            <div className="flex items-center justify-between text-[#8B9A6E] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.longestStreak}
              </span>
              <Award className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#22241F] dark:text-[#EFECE6]">
                {streak.longestStreak}
              </span>
              <span className="text-sm font-semibold text-[#6A735E] dark:text-[#8D9683]">
                {t.days}
              </span>
            </div>
            <p className="text-[11px] text-[#6A735E] dark:text-[#8D9683] mt-4 pt-3 border-t border-[#D5CCC0] dark:border-[#272B21]">
              Historical maximum unbroken sovereignty
            </p>
          </div>

          {/* Card 3: Total Transmutations Intercepted */}
          <div className="p-5 rounded-2xl bg-[#EAE2D6] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] shadow-soft-sm">
            <div className="flex items-center justify-between text-[#8B9A6E] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.transmutations}
              </span>
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#22241F] dark:text-[#EFECE6]">
                {streak.totalTransmutations}
              </span>
              <span className="text-sm font-semibold text-[#6A735E] dark:text-[#8D9683]">
                Sessions
              </span>
            </div>
            <p className="text-[11px] text-[#6A735E] dark:text-[#8D9683] mt-4 pt-3 border-t border-[#D5CCC0] dark:border-[#272B21]">
              Biological impulses converted into focused output
            </p>
          </div>

          {/* Card 4: Energy Points Forged */}
          <div className="p-5 rounded-2xl bg-[#EAE2D6] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] shadow-soft-sm">
            <div className="flex items-center justify-between text-[#8B9A6E] mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.totalConvertedScore}
              </span>
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#22241F] dark:text-[#EFECE6]">
                {streak.totalEnergyPoints}
              </span>
              <span className="text-sm font-semibold text-[#8B9A6E]">
                PTS
              </span>
            </div>
            <p className="text-[11px] text-[#6A735E] dark:text-[#8D9683] mt-4 pt-3 border-t border-[#D5CCC0] dark:border-[#272B21]">
              Aggregate creative & physical production value
            </p>
          </div>
        </div>

        {/* Action Header & Log Output Modal / Form Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#EAE2D6]/70 dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026]">
          <div>
            <h3 className="text-lg font-bold text-[#22241F] dark:text-[#EFECE6]">
              {t.title}
            </h3>
            <p className="text-xs text-[#555C4A] dark:text-[#A7AFA0] mt-0.5">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-[#8B9A6E] hover:bg-[#78875C] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft-sm hover:shadow-glow-sage transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{t.logOutputBtn}</span>
          </button>
        </div>

        {/* Input Form Drawer */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 p-5 sm:p-7 rounded-2xl bg-[#F0E9DD] dark:bg-[#1C1F18] border-2 border-[#8B9A6E]/40 shadow-soft-md animate-in slide-in-from-top-4 duration-150"
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#3D452E] dark:text-[#BFD1A4] mb-4">
              {t.formTitle}
            </h4>

            {/* Category Selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-2">
                {t.categoryLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['code', 'reading', 'workout', 'writing', 'deepwork', 'custom'] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                        category === cat
                          ? 'bg-[#8B9A6E] text-white border-[#8B9A6E] shadow-soft-sm'
                          : 'bg-[#F7F2EB] dark:bg-[#12130F] text-[#4A4F44] dark:text-[#C5CCC0] border-[#DDD5C7] dark:border-[#2A2D24] hover:border-[#8B9A6E]'
                      }`}
                    >
                      {getCategoryIcon(cat)}
                      <span className="truncate">{t.categories[cat]}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="output-title"
                className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-1.5"
              >
                {t.outputTitleLabel}
              </label>
              <input
                id="output-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.outputTitlePlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EB] dark:bg-[#0E0F0D] border border-[#DDD5C7] dark:border-[#2C3026] text-xs sm:text-sm text-[#22241F] dark:text-[#EFECE6] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
              />
            </div>

            {/* Amount & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="output-amount"
                  className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-1.5"
                >
                  {t.amountLabel}
                </label>
                <input
                  id="output-amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EB] dark:bg-[#0E0F0D] border border-[#DDD5C7] dark:border-[#2C3026] text-xs sm:text-sm font-mono text-[#22241F] dark:text-[#EFECE6] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                />
              </div>
              <div>
                <label
                  htmlFor="output-unit"
                  className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-1.5"
                >
                  {t.unitLabel}
                </label>
                <input
                  id="output-unit"
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EB] dark:bg-[#0E0F0D] border border-[#DDD5C7] dark:border-[#2C3026] text-xs sm:text-sm text-[#22241F] dark:text-[#EFECE6] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                />
              </div>
            </div>

            {/* Notes / Reflection */}
            <div className="mb-5">
              <label
                htmlFor="output-notes"
                className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-1.5"
              >
                {t.notesLabel}
              </label>
              <textarea
                id="output-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EB] dark:bg-[#0E0F0D] border border-[#DDD5C7] dark:border-[#2C3026] text-xs sm:text-sm text-[#22241F] dark:text-[#EFECE6] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#8B9A6E] hover:bg-[#78875C] text-white font-bold text-xs sm:text-sm shadow-soft-sm hover:shadow-glow-sage transition-all active:scale-95"
              >
                {t.submitLog}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#6A735E] dark:text-[#8D9683] hover:text-[#22241F] dark:hover:text-white"
              >
                {t.cancel}
              </button>
            </div>
          </form>
        )}

        {/* Output Entries Table / List */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] px-1">
            <span>{t.recentOutputs}</span>
            <span>{entries.length} Logged</span>
          </div>

          {entries.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#EAE2D6]/40 dark:bg-[#181A15]/60 border border-dashed border-[#DDD5C7] dark:border-[#282B22] text-center">
              <Sparkles className="w-6 h-6 text-[#8B9A6E] mx-auto mb-2 opacity-80" />
              <p className="text-xs sm:text-sm text-[#6A735E] dark:text-[#8D9683] max-w-md mx-auto leading-relaxed">
                {t.emptyLedger}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-xl bg-[#EAE2D6]/60 dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2A2E24] hover:border-[#8B9A6E]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#F7F2EB] dark:bg-[#20231D] text-[#8B9A6E] shrink-0 mt-0.5">
                      {getCategoryIcon(entry.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-[#22241F] dark:text-[#EFECE6]">
                          {entry.title}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B9A6E]/15 text-[#566141] dark:text-[#BFD1A4] font-semibold">
                          +{entry.energyPoints} PTS
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6A735E] dark:text-[#8D9683]">
                        <span className="font-mono font-medium">
                          {entry.amount} {entry.unit}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(entry.timestamp).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      {entry.notes && (
                        <p className="text-xs text-[#555C4A] dark:text-[#A7AFA0] italic mt-1.5 pl-2 border-l-2 border-[#8B9A6E]/40">
                          "{entry.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(entry.id)}
                    type="button"
                    className="self-end sm:self-center p-2 rounded-lg text-[#6A735E] dark:text-[#8D9683] hover:text-[#A86464] hover:bg-[#F7F2EB] dark:hover:bg-[#20231D] transition-colors"
                    title="Delete entry"
                    aria-label="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Visual Timeline Mapping Physiological Milestones */}
      <section id="milestones-section" className="scroll-mt-24 pt-6 border-t border-[#DDD5C7] dark:border-[#282B22]">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B9A6E]">
            <TrendingUp className="w-4 h-4" />
            <span>{m.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#555C4A] dark:text-[#A7AFA0] mt-1 max-w-2xl">
            {m.subtitle}
          </p>
        </div>

        {/* Milestone Cards Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDD5C7] dark:before:bg-[#2A2E24]">
          {milestonesList.map(({ day, key }) => {
            const isCompleted = streak.currentStreak >= day;
            const isNextMilestone = !isCompleted && streak.currentStreak < day;
            const stageData = m.stages[key];

            return (
              <div key={day} className="relative group">
                {/* Timeline node marker */}
                <div
                  className={`absolute -left-[27px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-[#8B9A6E] text-white shadow-glow-sage'
                      : 'bg-[#DDD5C7] dark:bg-[#20231D] text-[#88907E] border-2 border-[#F7F2EB] dark:border-[#0E0F0D]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-[10px] font-bold font-mono">{day}</span>
                  )}
                </div>

                {/* Milestone Details Card */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-[#EAE2D6] dark:bg-[#181A15] border-[#8B9A6E]/40 shadow-soft-sm'
                      : 'bg-[#F0E9DD]/60 dark:bg-[#141611]/80 border-[#DDD5C7] dark:border-[#22251D] opacity-80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-sm font-bold text-[#22241F] dark:text-[#EFECE6] flex items-center gap-2">
                      <span>{stageData.title}</span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B9A6E]/20 text-[#566141] dark:text-[#BFD1A4]">
                          Achieved
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] font-mono font-semibold text-[#8B9A6E]">
                      {isCompleted
                        ? 'Active Physiological State'
                        : `${day - streak.currentStreak} Days Remaining`}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A4F44] dark:text-[#C5CCC0] leading-relaxed mb-2.5">
                    {stageData.desc}
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#F7F2EB]/90 dark:bg-[#0E0F0D] border border-[#DDD5C7]/70 dark:border-[#22251D] text-[11px] text-[#555C4A] dark:text-[#A7AFA0] flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B9A6E] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-semibold text-[#3D452E] dark:text-[#BFD1A4]">
                        Neuro-Endocrine Mechanism:
                      </strong>{' '}
                      {stageData.bio}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
