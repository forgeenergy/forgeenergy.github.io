import React, { useState } from 'react';
import type { Locale } from '../i18n/translations';
import { translations } from '../i18n/translations';
import {
  exportVaultToJson,
  importVaultFromJson,
  purgeAllVaultData,
} from '../utils/storage';
import { encryptData, decryptData } from '../utils/crypto';
import {
  ShieldCheck,
  Download,
  Upload,
  Lock,
  Trash2,
  X,
  AlertTriangle,
  FileJson,
  Key,
} from 'lucide-react';

interface DataVaultModalProps {
  currentLocale: Locale;
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const DataVaultModal: React.FC<DataVaultModalProps> = ({
  currentLocale,
  isOpen,
  onClose,
  onDataChanged,
}) => {
  const t = translations[currentLocale].privacyModal;
  const [passphrase, setPassphrase] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [showPurgeConfirm, setShowPurgeConfirm] = useState<boolean>(false);
  const [purgeInput, setPurgeInput] = useState<string>('');

  if (!isOpen) return null;

  const handleExportRaw = () => {
    try {
      const json = exportVaultToJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forgeenergy_vault_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMessage({ text: t.exportSuccess });
    } catch {
      setStatusMessage({ text: 'Export failed', isError: true });
    }
  };

  const handleExportEncrypted = async () => {
    if (!passphrase.trim()) {
      setStatusMessage({
        text: 'Please specify an encryption passphrase to encrypt the backup.',
        isError: true,
      });
      return;
    }
    try {
      const plainJson = exportVaultToJson();
      const encrypted = await encryptData(plainJson, passphrase.trim());
      const blob = new Blob([encrypted], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forgeenergy_encrypted_${new Date().toISOString().slice(0, 10)}.forge`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMessage({ text: 'AES-GCM Encrypted vault downloaded!' });
    } catch {
      setStatusMessage({ text: 'Encryption failed. Check your passphrase.', isError: true });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      try {
        // Try raw JSON parse first
        let parsed = false;
        try {
          const testObj = JSON.parse(content);
          if (testObj.ciphertext && testObj.salt) {
            // It's an encrypted file
            if (!passphrase.trim()) {
              setStatusMessage({
                text: 'This file is encrypted! Please enter your passphrase above and re-select the file.',
                isError: true,
              });
              return;
            }
            const decryptedJson = await decryptData(content, passphrase.trim());
            parsed = importVaultFromJson(decryptedJson);
          } else {
            parsed = importVaultFromJson(content);
          }
        } catch {
          // If parse or decrypt failed
          if (passphrase.trim()) {
            const decryptedJson = await decryptData(content, passphrase.trim());
            parsed = importVaultFromJson(decryptedJson);
          }
        }

        if (parsed) {
          setStatusMessage({ text: t.restoreSuccess });
          onDataChanged();
        } else {
          setStatusMessage({ text: t.restoreError, isError: true });
        }
      } catch (err) {
        console.error(err);
        setStatusMessage({ text: t.restoreError, isError: true });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePurge = () => {
    if (purgeInput.trim() !== 'DELETE') {
      setStatusMessage({ text: 'Please type "DELETE" exactly to confirm purge.', isError: true });
      return;
    }
    purgeAllVaultData();
    setShowPurgeConfirm(false);
    setPurgeInput('');
    setStatusMessage({ text: 'All local vault data has been purged completely.' });
    onDataChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F7F2EB] dark:bg-[#181A15] border border-[#DDD5C7] dark:border-[#2C3026] p-6 sm:p-8 shadow-soft-lg text-[#22241F] dark:text-[#EFECE6]">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl text-[#6A735E] dark:text-[#8D9683] hover:bg-[#EAE2D6] dark:hover:bg-[#20231D] transition-all"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#8B9A6E]/20 text-[#566141] dark:text-[#BFD1A4] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#8B9A6E]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#22241F] dark:text-[#EFECE6]">
              {t.title}
            </h2>
            <p className="text-xs text-[#6A735E] dark:text-[#8D9683]">
              {translations[currentLocale].nav.tagline} • Zero Server Storage
            </p>
          </div>
        </div>

        {/* Status Message Notification */}
        {statusMessage && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs font-medium flex items-center justify-between ${
              statusMessage.isError
                ? 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900/40'
                : 'bg-[#8B9A6E]/20 text-[#3D452E] dark:text-[#BFD1A4] border border-[#8B9A6E]/40'
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* Description & Zero-Server Verification Badge */}
        <p className="text-xs sm:text-sm text-[#555C4A] dark:text-[#A7AFA0] leading-relaxed mb-4">
          {t.description}
        </p>

        <div className="p-3.5 rounded-xl bg-[#EAE2D6]/80 dark:bg-[#12130F] border border-[#DDD5C7] dark:border-[#22251D] text-xs text-[#566141] dark:text-[#BFD1A4] mb-6 flex items-start gap-2.5">
          <Lock className="w-4 h-4 shrink-0 text-[#8B9A6E] mt-0.5" />
          <span>{t.clientSideOnly}</span>
        </div>

        {/* Encryption Passphrase Input */}
        <div className="mb-6">
          <label
            htmlFor="vault-passphrase"
            className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-1.5 flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-[#8B9A6E]" />
            <span>{t.passphraseLabel}</span>
          </label>
          <input
            id="vault-passphrase"
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder={t.passphrasePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] dark:bg-[#0E0F0D] border border-[#DDD5C7] dark:border-[#2C3026] text-xs sm:text-sm text-[#22241F] dark:text-[#EFECE6] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
          />
        </div>

        {/* Backup & Restore Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {/* Raw JSON Export */}
          <button
            onClick={handleExportRaw}
            type="button"
            className="p-3.5 rounded-xl bg-[#EAE2D6] dark:bg-[#20231D] hover:bg-[#DDD5C7] dark:hover:bg-[#282B24] border border-[#D5CCC0] dark:border-[#2A2E25] text-left transition-all flex flex-col gap-1.5 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#22241F] dark:text-[#EFECE6] group-hover:text-[#8B9A6E]">
              <FileJson className="w-4 h-4 text-[#8B9A6E]" />
              <span>{t.backupJson}</span>
            </div>
            <span className="text-[11px] text-[#6A735E] dark:text-[#8D9683]">
              Standard unencrypted JSON for easy inspection & portability.
            </span>
          </button>

          {/* AES-GCM Encrypted Export */}
          <button
            onClick={handleExportEncrypted}
            type="button"
            className="p-3.5 rounded-xl bg-[#EAE2D6] dark:bg-[#20231D] hover:bg-[#DDD5C7] dark:hover:bg-[#282B24] border border-[#D5CCC0] dark:border-[#2A2E25] text-left transition-all flex flex-col gap-1.5 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#22241F] dark:text-[#EFECE6] group-hover:text-[#8B9A6E]">
              <Lock className="w-4 h-4 text-[#8B9A6E]" />
              <span>{t.backupEncrypted}</span>
            </div>
            <span className="text-[11px] text-[#6A735E] dark:text-[#8D9683]">
              Browser-native 256-bit AES-GCM encrypted (.forge) payload.
            </span>
          </button>
        </div>

        {/* Restore from File */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#555C4A] dark:text-[#A7AFA0] mb-2 flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-[#8B9A6E]" />
            <span>{t.restoreJson}</span>
          </label>
          <div className="relative border-2 border-dashed border-[#DDD5C7] dark:border-[#2C3026] rounded-xl p-4 text-center hover:border-[#8B9A6E] transition-colors cursor-pointer">
            <input
              type="file"
              accept=".json,.forge"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-1">
              <Download className="w-5 h-5 text-[#8B9A6E]" />
              <span className="text-xs font-medium text-[#22241F] dark:text-[#EFECE6]">
                Click or drag .json or .forge file to restore
              </span>
              <span className="text-[10px] text-[#717F55] dark:text-[#8D9683]">
                Restores your streaks, ledger entries, and scratchpad
              </span>
            </div>
          </div>
        </div>

        {/* Nuclear Option: Purge Data */}
        <div className="pt-5 border-t border-[#DDD5C7] dark:border-[#282B22]">
          {!showPurgeConfirm ? (
            <button
              onClick={() => setShowPurgeConfirm(true)}
              type="button"
              className="text-xs text-[#A86464] hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1.5 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.purgeTitle}</span>
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40">
              <div className="flex items-center gap-2 text-xs font-bold text-red-800 dark:text-red-300 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>{t.purgeTitle}</span>
              </div>
              <p className="text-[11px] text-red-700/80 dark:text-red-300/80 mb-3">
                {t.purgeDesc}
              </p>
              <label
                htmlFor="purge-confirm-input"
                className="block text-[11px] font-semibold text-red-800 dark:text-red-200 mb-1"
              >
                {t.purgeConfirmPrompt}
              </label>
              <input
                id="purge-confirm-input"
                type="text"
                value={purgeInput}
                onChange={(e) => setPurgeInput(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-black border border-red-300 dark:border-red-800 text-xs text-red-900 dark:text-red-100 font-mono mb-2 focus:outline-none"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePurge}
                  type="button"
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  {t.purgeButton}
                </button>
                <button
                  onClick={() => {
                    setShowPurgeConfirm(false);
                    setPurgeInput('');
                  }}
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs text-[#555C4A] dark:text-[#AAA] hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
