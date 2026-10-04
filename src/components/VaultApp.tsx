import React, { useState, useEffect } from 'react';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { Navbar } from './Navbar';
import { TransmuteEngine } from './TransmuteEngine';
import { EnergyLedger } from './EnergyLedger';
import { StealthPad } from './StealthPad';
import { DataVaultModal } from './DataVaultModal';
import { FAQSection } from './FAQSection';
import {
  Flame,
  ShieldCheck,
  Zap,
  BookOpen,
  Lock,
  Coffee,
  HelpCircle,
} from 'lucide-react';

interface VaultAppProps {
  currentLocale: Locale;
}

export const VaultApp: React.FC<VaultAppProps> = ({ currentLocale }) => {
  const t = translations[currentLocale];
  const [isStealthOpen, setIsStealthOpen] = useState<boolean>(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Global 'Escape' Key Listener for instant Stealth Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsStealthOpen((prev) => !prev);
      }
    };

    const handleCustomStealth = () => {
      setIsStealthOpen((prev) => !prev);
    };

    const handleCustomVault = () => {
      setIsVaultModalOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('forge-toggle-stealth', handleCustomStealth);
    window.addEventListener('forge-open-vault-modal', handleCustomVault);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('forge-toggle-stealth', handleCustomStealth);
      window.removeEventListener('forge-open-vault-modal', handleCustomVault);
    };
  }, []);

  const triggerIntervention = () => {
    window.dispatchEvent(new CustomEvent('forge-trigger-intervention'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2EB] dark:bg-[#0E0F0D] text-[#22241F] dark:text-[#EFECE6] transition-colors duration-200">
      {/* Stealth / Panic Mode Scratchpad */}
      <StealthPad
        currentLocale={currentLocale}
        isOpen={isStealthOpen}
        onClose={() => setIsStealthOpen(false)}
      />

      {/* Zero-Server Data Vault & Backup Modal */}
      <DataVaultModal
        currentLocale={currentLocale}
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
        onDataChanged={() => {
          window.dispatchEvent(new CustomEvent('forge-vault-updated'));
        }}
      />

      {/* Main Sticky Responsive Navbar */}
      <Navbar
        currentLocale={currentLocale}
        onOpenPrivacyModal={() => setIsVaultModalOpen(true)}
        onTriggerStealth={() => setIsStealthOpen(true)}
      />

      {/* Main Application Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto pt-2 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAE2D6] dark:bg-[#1C1F18] text-[#566141] dark:text-[#BFD1A4] border border-[#DDD5C7] dark:border-[#2C3026] mb-5 shadow-soft-sm">
            <Lock className="w-3.5 h-3.5 text-[#8B9A6E]" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#22241F] dark:text-[#EFECE6] leading-[1.15] mb-4">
            {t.hero.titleLine1}{' '}
            <span className="text-[#8B9A6E] block sm:inline">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#555C4A] dark:text-[#A7AFA0] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={triggerIntervention}
              type="button"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#78875C] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-soft-md hover:shadow-glow-sage-lg transition-all transform active:scale-95"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>{t.hero.primaryCta}</span>
            </button>

            <a
              href="#ledger-section"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#EAE2D6] dark:bg-[#181A15] hover:bg-[#DDD5C7] dark:hover:bg-[#20231D] text-[#3D452E] dark:text-[#CCD4C5] font-bold text-sm sm:text-base border border-[#DDD5C7] dark:border-[#2C3026] flex items-center justify-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#8B9A6E]" />
              <span>{t.hero.secondaryCta}</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-[#6A735E] dark:text-[#8D9683]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B9A6E]" />
              {t.hero.securityNote}
            </span>
            <span>•</span>
            <button
              onClick={() => setShowGuideModal(true)}
              type="button"
              className="hover:underline flex items-center gap-1 text-[#8B9A6E]"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              How Transmutation Works
            </button>
          </div>
        </section>

        {/* Transmute Engine Island */}
        <TransmuteEngine currentLocale={currentLocale} />

        {/* Energy Converted Ledger Island & Physiological Milestones */}
        <EnergyLedger currentLocale={currentLocale} />

        {/* Semantic FAQ Section for SEO & Search Intent */}
        <FAQSection currentLocale={currentLocale} />
      </main>

      {/* Educational Urge Surfing Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#F7F2EB] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] p-6 sm:p-8 shadow-soft-lg text-[#22241F] dark:text-[#EFECE6]">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-5 right-5 text-[#6A735E] hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#8B9A6E]" />
              The Science of Sexual & Energy Transmutation
            </h3>
            <p className="text-xs text-[#6A735E] dark:text-[#8D9683] mb-4">
              Neurobiology of Impulse Conversion (Napoleon Hill & G. Alan Marlatt)
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#4A4F44] dark:text-[#C5CCC0] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#EAE2D6]/80 dark:bg-[#12130F] border border-[#DDD5C7] dark:border-[#22251D]">
                <h4 className="font-bold text-[#22241F] dark:text-[#EFECE6] mb-1">
                  1. Biological Impulse as High-Voltage Current
                </h4>
                <p>
                  Sexual and compulsive urges are the strongest motivating forces known to human biology. Suppressing them creates internal resistance. Indulging them compulsively depletes dopamine reserves. Transmutation means directing this raw electrical energy through the higher circuits of the brain.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EAE2D6]/80 dark:bg-[#12130F] border border-[#DDD5C7] dark:border-[#22251D]">
                <h4 className="font-bold text-[#22241F] dark:text-[#EFECE6] mb-1">
                  2. Urge Surfing (Alan Marlatt Protocol)
                </h4>
                <p>
                  Every craving has a bell-curve lifespan of approximately 3 to 5 minutes. If you breathe deeply (Navy SEAL Box Breathing) and observe the physical sensation without judgment, the autonomic surge subsides, leaving your mind alert, grounded, and primed for deep focus.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EAE2D6]/80 dark:bg-[#12130F] border border-[#DDD5C7] dark:border-[#22251D]">
                <h4 className="font-bold text-[#22241F] dark:text-[#EFECE6] mb-1">
                  3. The 15-Minute Sprint Bridge
                </h4>
                <p>
                  Immediately follow breathing with a 15-minute high-focus sprint (writing code, studying, or physical training). This anchors the neural reward circuitry to tangible creation rather than passive consumption.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDD5C7] dark:border-[#282B22] flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 rounded-xl bg-[#8B9A6E] text-white font-bold text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer with Zero-Server Guarantee & Support Dev CTA */}
      <footer className="mt-auto border-t border-[#EEEEEE] dark:border-[#2A2D26] bg-[#F7F2EB] dark:bg-[#0E0F0D] py-8 sm:py-10 text-xs text-[#6A735E] dark:text-[#8D9683]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-[#22241F] dark:text-[#EFECE6]">
                ForgeEnergy
              </span>
              <span>•</span>
              <span className="text-[#8B9A6E] font-medium">
                {t.footer.zeroServerBadge}
              </span>
            </div>
            <p className="text-[11px] text-[#88907E] dark:text-[#7A8270]">
              {t.footer.zeroServerDetail}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsVaultModalOpen(true)}
              className="text-[#8B9A6E] hover:underline flex items-center gap-1 text-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Zero-Server</span>
            </button>
            <span>•</span>
            <a
              href="https://buymeacoffee.com/kisharadilz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAE2D6] dark:bg-[#181A15] hover:bg-[#8B9A6E] hover:text-white border border-[#DDD5C7] dark:border-[#2C3026] text-[#3D452E] dark:text-[#CCD4C5] transition-all font-semibold"
            >
              <Coffee className="w-3.5 h-3.5 text-[#8B9A6E] group-hover:text-white" />
              <span>{t.footer.supportMe}</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
