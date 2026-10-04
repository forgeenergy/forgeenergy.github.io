import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { soundSynth } from '../utils/audio';
import {
  Wind,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TransmuteEngineProps {
  currentLocale: Locale;
  onOpenLogModal?: (prefilled?: { title: string; category: string; amount: number; unit: string }) => void;
}

type Mode = 'breathing' | 'sprint';
type BreathPhase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

export const TransmuteEngine: React.FC<TransmuteEngineProps> = ({
  currentLocale,
  onOpenLogModal,
}) => {
  const t = translations[currentLocale].transmute;
  const [mode, setMode] = useState<Mode>('breathing');

  // Breathing Visualizer State (2 minutes = 120s total, each cycle is 16s = 4s * 4)
  const [isBreathingRunning, setIsBreathingRunning] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [totalBreathingElapsed, setTotalBreathingElapsed] = useState<number>(0);
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // 15-Minute Sprint State (15 min = 900 seconds)
  const SPRINT_TOTAL_SECONDS = 15 * 60;
  const [isSprintRunning, setIsSprintRunning] = useState<boolean>(false);
  const [sprintSecondsRemaining, setSprintSecondsRemaining] = useState<number>(SPRINT_TOTAL_SECONDS);
  const [sprintTask, setSprintTask] = useState<string>('');
  const [sprintCompleted, setSprintCompleted] = useState<boolean>(false);

  // Refs for timers
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sprintIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger Urge Intercept (Scrolls directly here and starts breathing visualizer)
  const triggerImmediateIntervention = () => {
    setMode('breathing');
    if (!isBreathingRunning) {
      startBreathing();
    }
    const el = document.getElementById('transmute-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Expose custom event so other components or hero can trigger immediate intervention
  useEffect(() => {
    const handleTrigger = () => triggerImmediateIntervention();
    window.addEventListener('forge-trigger-intervention', handleTrigger);
    return () => window.removeEventListener('forge-trigger-intervention', handleTrigger);
  }, [isBreathingRunning]);

  // Rotate quotes every 12 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % t.urgeSurfingQuotes.length);
    }, 12000);
    return () => clearInterval(quoteInterval);
  }, [t.urgeSurfingQuotes.length]);

  // Breathing cycle logic
  const handlePhaseTransition = useCallback((currentPhase: BreathPhase) => {
    if (currentPhase === 'inhale') {
      setBreathPhase('holdIn');
      soundSynth.playHold();
    } else if (currentPhase === 'holdIn') {
      setBreathPhase('exhale');
      soundSynth.playExhale();
    } else if (currentPhase === 'exhale') {
      setBreathPhase('holdOut');
      soundSynth.playHold();
    } else {
      setBreathPhase('inhale');
      soundSynth.playInhale();
    }
    setPhaseSecondsLeft(4);
  }, []);

  const startBreathing = () => {
    setIsBreathingRunning(true);
    soundSynth.playInhale();
  };

  const pauseBreathing = () => {
    setIsBreathingRunning(false);
  };

  const resetBreathing = () => {
    setIsBreathingRunning(false);
    setBreathPhase('inhale');
    setPhaseSecondsLeft(4);
    setTotalBreathingElapsed(0);
  };

  useEffect(() => {
    if (!isBreathingRunning) {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
      return;
    }

    breathIntervalRef.current = setInterval(() => {
      setPhaseSecondsLeft((prevPhaseSec) => {
        if (prevPhaseSec <= 1) {
          handlePhaseTransition(breathPhase);
          return 4;
        }
        return prevPhaseSec - 1;
      });

      setTotalBreathingElapsed((prev) => {
        const next = prev + 1;
        // If 2 minutes (120s) reached, trigger celebration
        if (next >= 120) {
          setIsBreathingRunning(false);
          soundSynth.playComplete();
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#8B9A6E', '#BFD1A4', '#EAE2D6'],
            });
          } catch {
            // Ignore if confetti not supported
          }
        }
        return next;
      });
    }, 1000);

    return () => {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    };
  }, [isBreathingRunning, breathPhase, handlePhaseTransition]);

  // Sprint timer logic
  const startSprint = () => {
    setIsSprintRunning(true);
    soundSynth.playBowl(432, 2.5, 0.2);
  };

  const pauseSprint = () => {
    setIsSprintRunning(false);
  };

  const resetSprint = () => {
    setIsSprintRunning(false);
    setSprintSecondsRemaining(SPRINT_TOTAL_SECONDS);
    setSprintCompleted(false);
  };

  const completeSprint = () => {
    setIsSprintRunning(false);
    setSprintCompleted(true);
    soundSynth.playComplete();
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#8B9A6E', '#BFD1A4', '#F7F2EB'],
      });
    } catch {
      // Ignored
    }

    // Prefill output log
    const taskName = sprintTask.trim() || '15-Minute Deep Focus Sprint';
    if (onOpenLogModal) {
      onOpenLogModal({
        title: taskName,
        category: 'deepwork',
        amount: 15,
        unit: 'sprint minutes',
      });
    } else {
      window.dispatchEvent(
        new CustomEvent('forge-open-log-entry', {
          detail: {
            title: taskName,
            category: 'deepwork',
            amount: 15,
            unit: 'sprint minutes',
          },
        })
      );
    }
  };

  useEffect(() => {
    if (!isSprintRunning) {
      if (sprintIntervalRef.current) clearInterval(sprintIntervalRef.current);
      return;
    }

    sprintIntervalRef.current = setInterval(() => {
      setSprintSecondsRemaining((prev) => {
        if (prev <= 1) {
          completeSprint();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sprintIntervalRef.current) clearInterval(sprintIntervalRef.current);
    };
  }, [isSprintRunning]);

  // Formatting helpers
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // SVG Progress calculation for box breathing
  const currentCycleNumber = Math.min(8, Math.floor(totalBreathingElapsed / 16) + 1);
  const totalBreathingPercent = Math.min(100, Math.round((totalBreathingElapsed / 120) * 100));

  // Determine breathing scale and label
  let phaseLabel = t.inhale;
  let circleScale = 'scale-100';
  let phaseColor = 'text-[#8B9A6E]';

  if (breathPhase === 'inhale') {
    phaseLabel = t.inhale;
    circleScale = 'scale-125';
    phaseColor = 'text-[#8B9A6E]';
  } else if (breathPhase === 'holdIn') {
    phaseLabel = t.holdIn;
    circleScale = 'scale-125';
    phaseColor = 'text-[#717F55]';
  } else if (breathPhase === 'exhale') {
    phaseLabel = t.exhale;
    circleScale = 'scale-90';
    phaseColor = 'text-[#8B9A6E]';
  } else if (breathPhase === 'holdOut') {
    phaseLabel = t.holdOut;
    circleScale = 'scale-90';
    phaseColor = 'text-[#566141]';
  }

  // Sprint Progress
  const sprintElapsed = SPRINT_TOTAL_SECONDS - sprintSecondsRemaining;
  const sprintProgressPercent = (sprintElapsed / SPRINT_TOTAL_SECONDS) * 100;
  const strokeDashoffset = 565.48 - (565.48 * sprintProgressPercent) / 100;

  return (
    <section id="transmute-section" className="relative scroll-mt-24">
      {/* Prominent Urge Intervention Anchor Banner */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EAE2D6] via-[#F0E9DD] to-[#EAE2D6] dark:from-[#1A1C16] dark:via-[#21241C] dark:to-[#1A1C16] border-2 border-[#8B9A6E]/30 shadow-soft-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#8B9A6E] text-white flex items-center justify-center shrink-0 shadow-glow-sage animate-pulse-subtle">
            <Flame className="w-6 h-6 text-[#F7F2EB] fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
                {translations[currentLocale].hero.badge}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B9A6E]/15 text-[#566141] dark:text-[#BFD1A4]">
                Tactical Intervention
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#22241F] dark:text-[#EFECE6] tracking-tight">
              {translations[currentLocale].hero.titleLine1} {translations[currentLocale].hero.titleAccent}
            </h3>
          </div>
        </div>

        <button
          onClick={triggerImmediateIntervention}
          type="button"
          className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#8B9A6E] hover:bg-[#78875C] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-soft-md hover:shadow-glow-sage-lg transition-all transform active:scale-95"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>{translations[currentLocale].hero.primaryCta}</span>
        </button>
      </div>

      {/* Main Transmutation Chamber Card */}
      <div className="rounded-3xl bg-[#EAE2D6]/80 dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] p-5 sm:p-8 shadow-soft-lg backdrop-blur-sm">
        {/* Chamber Header & Mode Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8CFC1] dark:border-[#282B22]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B9A6E]">
              <Sparkles className="w-4 h-4" />
              <span>{t.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#555C4A] dark:text-[#A7AFA0] mt-1 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[#DDD5C7] dark:bg-[#20231D] self-start sm:self-center">
            <button
              onClick={() => setMode('breathing')}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'breathing'
                  ? 'bg-[#F7F2EB] dark:bg-[#0E0F0D] text-[#22241F] dark:text-[#EFECE6] shadow-soft-sm'
                  : 'text-[#6A735E] dark:text-[#8D9683] hover:text-[#22241F] dark:hover:text-white'
              }`}
            >
              <Wind className="w-4 h-4 text-[#8B9A6E]" />
              <span>{t.boxBreathingTab}</span>
            </button>
            <button
              onClick={() => setMode('sprint')}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'sprint'
                  ? 'bg-[#F7F2EB] dark:bg-[#0E0F0D] text-[#22241F] dark:text-[#EFECE6] shadow-soft-sm'
                  : 'text-[#6A735E] dark:text-[#8D9683] hover:text-[#22241F] dark:hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-[#8B9A6E]" />
              <span>{t.sprintTab}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Box Breathing Visualizer */}
        {mode === 'breathing' && (
          <div className="pt-6 flex flex-col items-center">
            {/* Visualizer Area */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-4">
              {/* Outer Pulsing Aura */}
              <div
                className={`absolute inset-0 rounded-full bg-[#8B9A6E]/15 dark:bg-[#8B9A6E]/10 transition-transform duration-[4000ms] ease-in-out ${circleScale}`}
              />

              {/* Secondary Harmonic Wave */}
              <div
                className={`absolute inset-4 rounded-full border-2 border-dashed border-[#8B9A6E]/40 transition-transform duration-[4000ms] ease-in-out ${circleScale}`}
              />

              {/* Central Dynamic Sphere */}
              <div
                className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#8B9A6E] to-[#A5BD84] dark:from-[#566141] dark:to-[#8B9A6E] shadow-glow-sage flex flex-col items-center justify-center text-white p-4 text-center transition-transform duration-[4000ms] ease-in-out ${circleScale}`}
              >
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono">
                  {phaseSecondsLeft}s
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold mt-1 opacity-90">
                  {breathPhase === 'inhale' && 'Inhale'}
                  {breathPhase === 'holdIn' && 'Retain'}
                  {breathPhase === 'exhale' && 'Release'}
                  {breathPhase === 'holdOut' && 'Stillness'}
                </span>
              </div>

              {/* 4 Corner Markers of Tactical Box */}
              <div className="absolute top-2 left-2 text-[10px] font-mono uppercase font-semibold text-[#717F55] dark:text-[#A5BD84]">
                1. Inhale 4s
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono uppercase font-semibold text-[#717F55] dark:text-[#A5BD84]">
                2. Hold 4s
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono uppercase font-semibold text-[#717F55] dark:text-[#A5BD84]">
                3. Exhale 4s
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono uppercase font-semibold text-[#717F55] dark:text-[#A5BD84]">
                4. Hold 4s
              </div>
            </div>

            {/* Current Phase Instruction Text */}
            <div className="text-center my-3 max-w-md">
              <h4 className={`text-base sm:text-lg font-bold transition-colors ${phaseColor}`}>
                {phaseLabel}
              </h4>
              <p className="text-xs text-[#555C4A] dark:text-[#9EA895] mt-1">
                {t.boxDesc}
              </p>
            </div>

            {/* Overall 2-Minute Progress Bar & Cycle counter */}
            <div className="w-full max-w-md my-3 bg-[#DDD5C7] dark:bg-[#20231D] rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#8B9A6E] h-2.5 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${totalBreathingPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between w-full max-w-md text-[11px] text-[#6A735E] dark:text-[#8D9683] px-1 font-mono">
              <span>
                {t.cycleCount} {currentCycleNumber} / 8
              </span>
              <span>{formatTime(totalBreathingElapsed)} / 02:00</span>
            </div>

            {/* Breathing Control Buttons */}
            <div className="flex items-center gap-3 mt-6">
              {!isBreathingRunning ? (
                <button
                  onClick={startBreathing}
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#8B9A6E] hover:bg-[#78875C] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft-sm hover:shadow-glow-sage transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.startBreathing}</span>
                </button>
              ) : (
                <button
                  onClick={pauseBreathing}
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#566141] hover:bg-[#3D452E] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft-sm transition-all active:scale-95"
                >
                  <Pause className="w-4 h-4" />
                  <span>{t.pauseBreathing}</span>
                </button>
              )}

              <button
                onClick={resetBreathing}
                type="button"
                className="p-2.5 rounded-xl bg-[#DDD5C7] dark:bg-[#20231D] text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#CFC6B7] dark:hover:bg-[#292D24] transition-all"
                title={t.resetBreathing}
                aria-label={t.resetBreathing}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: 15-Minute Deep Work Sprint */}
        {mode === 'sprint' && (
          <div className="pt-6 flex flex-col items-center">
            {/* Sprint Task Input */}
            <div className="w-full max-w-lg mb-6">
              <label
                htmlFor="sprint-task"
                className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-2"
              >
                {t.sprintTitle}
              </label>
              <input
                id="sprint-task"
                type="text"
                value={sprintTask}
                onChange={(e) => setSprintTask(e.target.value)}
                placeholder={t.sprintTaskPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-[#F7F2EB] dark:bg-[#0E0F0D] border border-[#DDD5C7] dark:border-[#2C3026] text-sm text-[#22241F] dark:text-[#EFECE6] placeholder-[#88907E] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
              />
              <p className="text-[11px] text-[#6A735E] dark:text-[#8D9683] mt-1.5">
                {t.sprintDesc}
              </p>
            </div>

            {/* Circular Sprint Timer */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="stroke-[#DDD5C7] dark:stroke-[#20231D]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Active Progress Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="stroke-[#8B9A6E] transition-all duration-1000 ease-linear"
                  strokeWidth="8"
                  strokeDasharray="565.48"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Countdown Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-[#22241F] dark:text-[#EFECE6]">
                  {formatTime(sprintSecondsRemaining)}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#8B9A6E] font-semibold mt-1">
                  {sprintCompleted ? 'Sprint Completed!' : t.timeRemaining}
                </span>
                {sprintTask && (
                  <span className="text-[11px] max-w-[180px] truncate text-[#6A735E] dark:text-[#8D9683] mt-1 font-medium">
                    "{sprintTask}"
                  </span>
                )}
              </div>
            </div>

            {/* Sprint Controls */}
            <div className="flex items-center gap-3 mt-6">
              {!isSprintRunning ? (
                <button
                  onClick={startSprint}
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#8B9A6E] hover:bg-[#78875C] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft-sm hover:shadow-glow-sage transition-all active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.startSprint}</span>
                </button>
              ) : (
                <button
                  onClick={pauseSprint}
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-[#566141] hover:bg-[#3D452E] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft-sm transition-all active:scale-95"
                >
                  <Pause className="w-4 h-4" />
                  <span>{t.pauseSprint}</span>
                </button>
              )}

              <button
                onClick={completeSprint}
                type="button"
                className="px-4 py-2.5 rounded-xl bg-[#D5E1C3] dark:bg-[#2A3122] text-[#3D452E] dark:text-[#D5E1C3] font-bold text-xs sm:text-sm hover:bg-[#C2D3AC] dark:hover:bg-[#363E2C] transition-all flex items-center gap-1.5"
                title={t.completeSprint}
              >
                <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
                <span className="hidden sm:inline">{t.completeSprint}</span>
              </button>

              <button
                onClick={resetSprint}
                type="button"
                className="p-2.5 rounded-xl bg-[#DDD5C7] dark:bg-[#20231D] text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#CFC6B7] dark:hover:bg-[#292D24] transition-all"
                title="Reset Sprint"
                aria-label="Reset Sprint"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Urge-Surfing Psychological Guidance Prompt Carousel */}
        <div className="mt-8 pt-5 border-t border-[#D8CFC1] dark:border-[#282B22]">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F0E9DD]/90 dark:bg-[#12130F] border border-[#DDD5C7]/70 dark:border-[#22251D]">
            <div className="w-8 h-8 rounded-lg bg-[#8B9A6E]/15 text-[#8B9A6E] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B9A6E]">
                Urge Surfing Protocol • Neuro-Reframing
              </span>
              <p className="text-xs sm:text-sm italic text-[#3D452E] dark:text-[#CCD4C5] mt-0.5 leading-relaxed transition-all">
                "{t.urgeSurfingQuotes[quoteIndex]}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
