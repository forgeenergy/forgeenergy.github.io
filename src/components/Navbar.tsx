import React, { useState, useEffect, useRef } from 'react';
import type { Locale } from '../i18n/translations';
import { translations, supportedLocales } from '../i18n/translations';
import {
  Flame,
  Wind,
  BookOpen,
  Milestone,
  EyeOff,
  Coffee,
  Sun,
  Moon,
  Globe,
  ShieldCheck,
  Volume2,
  VolumeX,
  Menu,
  X,
  Check,
} from 'lucide-react';
import { soundSynth } from '../utils/audio';

interface NavbarProps {
  currentLocale: Locale;
  onOpenPrivacyModal?: () => void;
  onTriggerStealth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocale,
  onOpenPrivacyModal,
  onTriggerStealth,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLocale].nav;

  useEffect(() => {
    // Check initial theme from html class or localStorage
    const savedTheme = localStorage.getItem('forge_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(activeDark);
    if (activeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setIsMuted(soundSynth.getMuted());
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('forge_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('forge_theme', 'light');
    }
  };

  const toggleSound = () => {
    const muted = soundSynth.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundSynth.playBowl(528, 1.2, 0.15);
    }
  };

  const handleStealthClick = () => {
    setIsMobileMenuOpen(false);
    if (onTriggerStealth) {
      onTriggerStealth();
    } else {
      window.dispatchEvent(new CustomEvent('forge-toggle-stealth'));
    }
  };

  const handlePrivacyClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenPrivacyModal) {
      onOpenPrivacyModal();
    } else {
      window.dispatchEvent(new CustomEvent('forge-open-vault-modal'));
    }
  };

  const switchLocale = (newLocale: Locale) => {
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
    if (newLocale === currentLocale) return;
    if (newLocale === 'en') {
      window.location.href = '/';
    } else {
      window.location.href = `/${newLocale}/`;
    }
  };

  const homeHref = currentLocale === 'en' ? '/' : `/${currentLocale}/`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F7F2EB]/95 dark:bg-[#0E0F0D]/95 border-b border-[#EEEEEE] dark:border-[#2A2D26] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Emblem (Guaranteed visible and never squished) */}
        <a
          href={homeHref}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B9A6E] rounded-lg py-1 shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#8B9A6E] flex items-center justify-center text-white shadow-soft-sm group-hover:shadow-glow-sage transition-all transform group-hover:scale-105 shrink-0">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#F7F2EB] fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#22241F] dark:text-[#EFECE6] leading-none group-hover:text-[#8B9A6E] transition-colors">
              {t.brand}
            </span>
            <span className="hidden sm:inline text-[10px] tracking-wider uppercase text-[#8B9A6E] font-semibold mt-0.5">
              {t.tagline}
            </span>
          </div>
        </a>

        {/* Center: Navigation Links
            - Mobile (< sm): HIDDEN to eliminate cramping (accessible via Menu toggle)
            - Tablet (sm to lg): ICONS ONLY
            - Desktop (lg+): Full text labels + icons */}
        <nav
          className="hidden sm:flex items-center gap-1 lg:gap-1.5"
          aria-label="Main Navigation"
        >
          <a
            href="#transmute-section"
            className="flex items-center gap-1.5 p-2 lg:px-2.5 lg:py-2 rounded-lg text-xs font-medium text-[#4A4F44] dark:text-[#C5CCC0] hover:text-[#22241F] dark:hover:text-white hover:bg-[#EAE2D6]/70 dark:hover:bg-[#1E201A] transition-all"
            title={t.transmute}
            aria-label={t.transmute}
          >
            <Wind className="w-4 h-4 text-[#8B9A6E]" />
            <span className="hidden lg:inline">{t.transmute}</span>
          </a>

          <a
            href="#ledger-section"
            className="flex items-center gap-1.5 p-2 lg:px-2.5 lg:py-2 rounded-lg text-xs font-medium text-[#4A4F44] dark:text-[#C5CCC0] hover:text-[#22241F] dark:hover:text-white hover:bg-[#EAE2D6]/70 dark:hover:bg-[#1E201A] transition-all"
            title={t.ledger}
            aria-label={t.ledger}
          >
            <BookOpen className="w-4 h-4 text-[#8B9A6E]" />
            <span className="hidden lg:inline">{t.ledger}</span>
          </a>

          <a
            href="#milestones-section"
            className="flex items-center gap-1.5 p-2 lg:px-2.5 lg:py-2 rounded-lg text-xs font-medium text-[#4A4F44] dark:text-[#C5CCC0] hover:text-[#22241F] dark:hover:text-white hover:bg-[#EAE2D6]/70 dark:hover:bg-[#1E201A] transition-all"
            title={t.milestones}
            aria-label={t.milestones}
          >
            <Milestone className="w-4 h-4 text-[#8B9A6E]" />
            <span className="hidden lg:inline">{t.milestones}</span>
          </a>
        </nav>

        {/* Right Action Cluster: Clean and uncluttered on all viewports */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* 1. Stealth / Panic Button [Esc] (Always visible for emergency privacy) */}
          <button
            onClick={handleStealthClick}
            type="button"
            className="flex items-center gap-1.5 p-2 lg:px-2.5 lg:py-1.5 rounded-lg text-xs font-semibold bg-[#EAE2D6] dark:bg-[#1C1F18] text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#8B9A6E]/20 hover:text-[#22241F] dark:hover:text-white border border-[#DDD5C7] dark:border-[#2C3026] transition-all active:scale-95"
            title={`${t.stealth} (${t.panicHint})`}
            aria-label={t.stealth}
          >
            <EyeOff className="w-4 h-4 text-[#8B9A6E]" />
            <span className="hidden lg:inline">{t.stealth}</span>
            <kbd className="hidden xl:inline text-[9px] px-1 py-0.2 rounded bg-black/10 dark:bg-white/10 font-mono">
              ESC
            </kbd>
          </button>

          {/* 2. Sound Toggle (Visible on Desktop & Tablet, accessible in Mobile drawer) */}
          <button
            onClick={toggleSound}
            type="button"
            className="hidden md:flex p-2 rounded-lg text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
            title={isMuted ? 'Sound Muted' : 'Sound On'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#8B9A6E]/60" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#8B9A6E]" />
            )}
          </button>

          {/* 3. Vault / Privacy Modal (Visible on Desktop & Tablet, in Mobile drawer) */}
          <button
            onClick={handlePrivacyClick}
            type="button"
            className="hidden md:flex p-2 rounded-lg text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
            title="Data Vault & Zero-Server Verification"
            aria-label="Data Vault & Privacy"
          >
            <ShieldCheck className="w-4 h-4 text-[#8B9A6E]" />
          </button>

          {/* 4. Global Language Selector Dropdown (Visible on Tablet & Desktop) */}
          <div className="relative hidden sm:block" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              type="button"
              className="flex items-center gap-1 p-2 rounded-lg text-xs font-semibold text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
              title={t.language}
              aria-label={t.language}
              aria-expanded={isLangMenuOpen}
            >
              <Globe className="w-4 h-4 text-[#8B9A6E]" />
              <span className="hidden lg:inline uppercase text-[11px] font-bold">
                {currentLocale}
              </span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 py-1.5 rounded-xl bg-[#F7F2EB] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2A2D26] shadow-soft-lg z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#88907E] border-b border-[#DDD5C7]/60 dark:border-[#282B22] mb-1">
                  {t.language}
                </div>
                {supportedLocales.map((loc) => {
                  const isActive = currentLocale === loc.code;
                  return (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        isActive
                          ? 'font-bold text-[#8B9A6E] bg-[#EAE2D6]/50 dark:bg-[#20231D]'
                          : 'text-[#4A4F44] dark:text-[#C5CCC0] hover:bg-[#EAE2D6]/30 dark:hover:bg-[#20231D]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="uppercase text-[10px] font-mono text-[#8B9A6E] w-5 font-bold">
                          {loc.code}
                        </span>
                        <span>{loc.nativeName}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#8B9A6E]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. Dark / Light Mode Switcher (Always accessible on top bar) */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-lg text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
            title="Toggle Light / Dark Obsidian Theme"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#8B9A6E]" />
            ) : (
              <Moon className="w-4 h-4 text-[#555C4A]" />
            )}
          </button>

          {/* 6. Support Developer CTA (Desktop and Tablet sm+) */}
          <a
            href="https://buymeacoffee.com/kisharadilz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 p-2 lg:px-3 lg:py-1.5 rounded-lg text-xs font-semibold bg-[#8B9A6E] text-white hover:bg-[#78875C] shadow-soft-sm hover:shadow-glow-sage transition-all transform active:scale-95"
            title={t.support}
            aria-label={t.support}
          >
            <Coffee className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-white" />
            <span className="hidden lg:inline">{t.support}</span>
          </a>

          {/* 7. Responsive Navigation Toggle Hamburger (Mobile and Tablet lg:hidden) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#555C4A] dark:text-[#B9C2B0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
            title={t.menuToggle}
            aria-label={t.menuToggle}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#8B9A6E]" />
            ) : (
              <Menu className="w-5 h-5 text-[#8B9A6E]" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Mobile & Tablet Navigation Drawer (Responsive Toggle) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DDD5C7] dark:border-[#2A2D26] bg-[#F7F2EB] dark:bg-[#0E0F0D] px-4 py-5 shadow-soft-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-4 max-w-md mx-auto">
            {/* Primary Section Links */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88907E] px-2 block mb-1">
                Sections
              </span>
              <a
                href="#transmute-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#22241F] dark:text-[#EFECE6] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-[#8B9A6E]/15 text-[#8B9A6E]">
                  <Wind className="w-4 h-4" />
                </div>
                <span>{t.transmute}</span>
              </a>

              <a
                href="#ledger-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#22241F] dark:text-[#EFECE6] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-[#8B9A6E]/15 text-[#8B9A6E]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>{t.ledger}</span>
              </a>

              <a
                href="#milestones-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#22241F] dark:text-[#EFECE6] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18] transition-all"
              >
                <div className="p-1.5 rounded-lg bg-[#8B9A6E]/15 text-[#8B9A6E]">
                  <Milestone className="w-4 h-4" />
                </div>
                <span>{t.milestones}</span>
              </a>
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="pt-3 border-t border-[#DDD5C7] dark:border-[#242720] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88907E] px-2 block mb-1">
                Quick Actions
              </span>

              {/* Sound Toggle in Drawer */}
              <button
                onClick={toggleSound}
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#4A4F44] dark:text-[#C5CCC0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18]"
              >
                <div className="flex items-center gap-2.5">
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-[#8B9A6E]/60" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#8B9A6E]" />
                  )}
                  <span>{isMuted ? 'Sound Muted' : 'Sound Chimes Active'}</span>
                </div>
                <span className="text-[10px] text-[#8B9A6E]">
                  {isMuted ? 'Tap to Enable' : 'Tap to Mute'}
                </span>
              </button>

              {/* Vault in Drawer */}
              <button
                onClick={handlePrivacyClick}
                type="button"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A4F44] dark:text-[#C5CCC0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18]"
              >
                <ShieldCheck className="w-4 h-4 text-[#8B9A6E]" />
                <span>Zero-Server Vault & Backup</span>
              </button>

              {/* Stealth in Drawer */}
              <button
                onClick={handleStealthClick}
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#4A4F44] dark:text-[#C5CCC0] hover:bg-[#EAE2D6] dark:hover:bg-[#1C1F18]"
              >
                <div className="flex items-center gap-2.5">
                  <EyeOff className="w-4 h-4 text-[#8B9A6E]" />
                  <span>{t.stealth}</span>
                </div>
                <kbd className="text-[9px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono">
                  ESC
                </kbd>
              </button>
            </div>

            {/* Language Switcher in Mobile Drawer */}
            <div className="pt-3 border-t border-[#DDD5C7] dark:border-[#242720]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88907E] px-2 block mb-2">
                {t.language}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {supportedLocales.map((loc) => {
                  const isActive = currentLocale === loc.code;
                  return (
                    <button
                      key={loc.code}
                      onClick={() => switchLocale(loc.code)}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold border transition-all ${
                        isActive
                          ? 'bg-[#8B9A6E] text-white border-[#8B9A6E] shadow-soft-sm'
                          : 'bg-[#EAE2D6]/60 dark:bg-[#181A15] text-[#4A4F44] dark:text-[#C5CCC0] border-[#DDD5C7] dark:border-[#2A2E24]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="uppercase text-[9px] font-mono opacity-80">
                          {loc.code}
                        </span>
                        <span>{loc.nativeName}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support Developer Button in Mobile Drawer */}
            <div className="pt-3 border-t border-[#DDD5C7] dark:border-[#242720]">
              <a
                href="https://buymeacoffee.com/kisharadilz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#8B9A6E] text-white font-bold text-xs shadow-soft-sm active:scale-95 transition-transform"
              >
                <Coffee className="w-4 h-4 text-white" />
                <span>{t.support} (Buy Me a Coffee)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
