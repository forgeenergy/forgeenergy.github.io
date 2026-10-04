export interface LedgerEntry {
  id: string;
  timestamp: string; // ISO
  category: 'code' | 'reading' | 'workout' | 'writing' | 'deepwork' | 'custom';
  title: string;
  amount: number;
  unit: string;
  energyPoints: number;
  notes?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  streakStartDate: string;
  lastCheckInDate: string;
  totalTransmutations: number;
  totalEnergyPoints: number;
}

export interface ForgeVaultData {
  version: string;
  exportDate: string;
  streak: StreakData;
  ledger: LedgerEntry[];
  notes: string;
}

const STORAGE_KEYS = {
  STREAK: 'forge_streak_data',
  LEDGER: 'forge_output_ledger',
  STEALTH_NOTES: 'forge_stealth_notes',
  THEME: 'forge_theme',
};

const DEFAULT_STREAK: StreakData = {
  currentStreak: 1,
  longestStreak: 1,
  streakStartDate: new Date().toISOString(),
  lastCheckInDate: new Date().toISOString(),
  totalTransmutations: 0,
  totalEnergyPoints: 0,
};

const DEFAULT_NOTES = `# Q4 Strategic Engineering & Project Notes
*Updated: October 2026*

## Immediate Deliverables
- [x] Refactor core data transformation pipeline
- [x] Implement deterministic state persistence
- [ ] Review benchmark profiling metrics on cache invalidation
- [ ] Audit zero-dependency cryptographic hash routines

## Design System Guidelines
- Maintain WCAG AAA contrast ratio across all palettes.
- Keep cognitive load minimal through generous whitespace and semantic typography.
`;

export const getStreakData = (): StreakData => {
  if (typeof window === 'undefined') return DEFAULT_STREAK;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!raw) return DEFAULT_STREAK;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STREAK, ...parsed };
  } catch {
    return DEFAULT_STREAK;
  }
};

export const saveStreakData = (data: StreakData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save streak data:', e);
  }
};

export const getLedgerEntries = (): LedgerEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEDGER);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveLedgerEntries = (entries: LedgerEntry[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.LEDGER, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save ledger entries:', e);
  }
};

export const addLedgerEntry = (entry: Omit<LedgerEntry, 'id' | 'timestamp'>): LedgerEntry => {
  const current = getLedgerEntries();
  const newEntry: LedgerEntry = {
    ...entry,
    id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  const updated = [newEntry, ...current];
  saveLedgerEntries(updated);

  // Update streak metrics
  const streak = getStreakData();
  const newStreak: StreakData = {
    ...streak,
    totalTransmutations: streak.totalTransmutations + 1,
    totalEnergyPoints: streak.totalEnergyPoints + entry.energyPoints,
    lastCheckInDate: new Date().toISOString(),
  };
  saveStreakData(newStreak);

  return newEntry;
};

export const deleteLedgerEntry = (id: string): void => {
  const current = getLedgerEntries();
  const entryToDelete = current.find((e) => e.id === id);
  const updated = current.filter((e) => e.id !== id);
  saveLedgerEntries(updated);

  if (entryToDelete) {
    const streak = getStreakData();
    const newPoints = Math.max(0, streak.totalEnergyPoints - entryToDelete.energyPoints);
    saveStreakData({
      ...streak,
      totalEnergyPoints: newPoints,
    });
  }
};

export const getStealthNotes = (): string => {
  if (typeof window === 'undefined') return DEFAULT_NOTES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STEALTH_NOTES);
    return raw !== null ? raw : DEFAULT_NOTES;
  } catch {
    return DEFAULT_NOTES;
  }
};

export const saveStealthNotes = (notes: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.STEALTH_NOTES, notes);
  } catch (e) {
    console.error('Failed to save stealth notes:', e);
  }
};

export const exportVaultToJson = (): string => {
  const vaultData: ForgeVaultData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    streak: getStreakData(),
    ledger: getLedgerEntries(),
    notes: getStealthNotes(),
  };
  return JSON.stringify(vaultData, null, 2);
};

export const importVaultFromJson = (jsonStr: string): boolean => {
  try {
    const data = JSON.parse(jsonStr) as ForgeVaultData;
    if (!data || typeof data !== 'object') return false;

    if (data.streak && typeof data.streak.currentStreak === 'number') {
      saveStreakData(data.streak);
    }
    if (Array.isArray(data.ledger)) {
      saveLedgerEntries(data.ledger);
    }
    if (typeof data.notes === 'string') {
      saveStealthNotes(data.notes);
    }
    return true;
  } catch (e) {
    console.error('Import parsing error:', e);
    return false;
  }
};

export const purgeAllVaultData = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.STREAK);
    localStorage.removeItem(STORAGE_KEYS.LEDGER);
    localStorage.removeItem(STORAGE_KEYS.STEALTH_NOTES);
  } catch (e) {
    console.error('Purge error:', e);
  }
};
