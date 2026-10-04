import React, { useState, useEffect } from 'react';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import { getStealthNotes, saveStealthNotes } from '../utils/storage';
import {
  FileText,
  Lock,
  ArrowLeft,
  Check,
  Download,
  Trash2,
  Bold,
  Italic,
  List,
  Heading,
} from 'lucide-react';

interface StealthPadProps {
  currentLocale: Locale;
  isOpen: boolean;
  onClose: () => void;
}

export const StealthPad: React.FC<StealthPadProps> = ({
  currentLocale,
  isOpen,
  onClose,
}) => {
  const t = translations[currentLocale].stealth;
  const [content, setContent] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('Saved');

  useEffect(() => {
    setContent(getStealthNotes());
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setContent(next);
    setSaveStatus('Saving...');
    saveStealthNotes(next);
    setTimeout(() => {
      setSaveStatus('All changes saved locally');
    }, 400);
  };

  const handleClear = () => {
    if (window.confirm('Clear scratchpad content?')) {
      setContent('');
      saveStealthNotes('');
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('stealth-textarea') as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = `${before}${selected}${after}`;
    const next = content.substring(0, start) + replacement + content.substring(end);
    setContent(next);
    saveStealthNotes(next);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 50);
  };

  const downloadText = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notes_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FBFBFA] dark:bg-[#121212] text-[#2F3437] dark:text-[#D4D4D4] flex flex-col font-sans animate-in fade-in duration-100">
      {/* Discreet Minimalist Topbar */}
      <header className="h-14 border-b border-[#E9E9E7] dark:border-[#222222] px-4 sm:px-6 flex items-center justify-between bg-white dark:bg-[#181818]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#8B9A6E]/20 text-[#566141] dark:text-[#A5BD84] flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-semibold text-[#37352F] dark:text-[#EDEDED]">
              {t.notesTitle}
            </h1>
            <span className="text-[10px] text-[#787774] dark:text-[#888888] flex items-center gap-1">
              <Check className="w-3 h-3 text-[#8B9A6E]" />
              {saveStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Return to Vault Button */}
          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#8B9A6E] text-white hover:bg-[#78875C] shadow-sm transition-all"
            title="Return to ForgeEnergy Vault (Esc)"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.returnBtn}</span>
            <kbd className="text-[9px] px-1 rounded bg-black/20 font-mono ml-1">
              ESC
            </kbd>
          </button>
        </div>
      </header>

      {/* Editor Toolbar */}
      <div className="px-4 sm:px-6 py-2 border-b border-[#E9E9E7] dark:border-[#222222] bg-[#FAF9F7] dark:bg-[#151515] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertMarkdown('### ')}
            className="p-1.5 rounded hover:bg-[#EAE2D6]/60 dark:hover:bg-[#252525] text-[#555C4A] dark:text-[#AAA]"
            title="Heading"
          >
            <Heading className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertMarkdown('**', '**')}
            className="p-1.5 rounded hover:bg-[#EAE2D6]/60 dark:hover:bg-[#252525] text-[#555C4A] dark:text-[#AAA]"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertMarkdown('*', '*')}
            className="p-1.5 rounded hover:bg-[#EAE2D6]/60 dark:hover:bg-[#252525] text-[#555C4A] dark:text-[#AAA]"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => insertMarkdown('- ')}
            className="p-1.5 rounded hover:bg-[#EAE2D6]/60 dark:hover:bg-[#252525] text-[#555C4A] dark:text-[#AAA]"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadText}
            className="flex items-center gap-1 text-[11px] text-[#6A735E] dark:text-[#888] hover:text-black dark:hover:text-white"
          >
            <Download className="w-3 h-3" />
            <span>Export .md</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-[11px] text-[#A86464] hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
            <span>{t.clearNotes}</span>
          </button>
        </div>
      </div>

      {/* Realistic Markdown Text Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 flex flex-col">
        <textarea
          id="stealth-textarea"
          value={content}
          onChange={handleChange}
          placeholder="Start typing your notes, sprint tasks, or documentation..."
          className="flex-1 w-full bg-transparent resize-none focus:outline-none font-mono text-sm sm:text-base leading-relaxed text-[#2F3437] dark:text-[#E2E2E2] placeholder-[#9B9A97]"
          autoFocus
        />
      </main>

      {/* Innocent Footer */}
      <footer className="h-8 border-t border-[#E9E9E7] dark:border-[#222222] px-6 flex items-center justify-between text-[11px] text-[#9B9A97] dark:text-[#666666] bg-white dark:bg-[#181818]">
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-[#8B9A6E]" />
          <span>Local offline document • Zero telemetry</span>
        </div>
        <div>
          <span>{content.trim() ? content.trim().split(/\s+/).length : 0} words</span>
        </div>
      </footer>
    </div>
  );
};
