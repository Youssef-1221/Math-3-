import type { HighScoreEntry, TopicBestRecord, TopicId } from '../types/quiz';

const HISTORY_KEY = 'math3_quiz_history_v1';
const THEME_KEY = 'math3_theme_v1';
const MAX_HISTORY_ITEMS = 30;

export function loadQuizHistory(): HighScoreEntry[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is HighScoreEntry =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.score === 'number' &&
        typeof item.total === 'number' &&
        typeof item.percentage === 'number' &&
        typeof item.elapsedSeconds === 'number' &&
        typeof item.completedAt === 'string',
    );
  } catch {
    return [];
  }
}

export function saveQuizAttempt(entry: HighScoreEntry): {
  history: HighScoreEntry[];
  isNewBest: boolean;
  previousBestPercentage: number | null;
} {
  const existing = loadQuizHistory();
  const sameTopic = existing.filter((item) => item.topic === entry.topic);
  const previousBestPercentage =
    sameTopic.length > 0 ? Math.max(...sameTopic.map((item) => item.percentage)) : null;

  const sameTopicBestTime =
    previousBestPercentage !== null
      ? Math.min(
          ...sameTopic
            .filter((item) => item.percentage === previousBestPercentage)
            .map((item) => item.elapsedSeconds),
        )
      : null;

  const isNewBest =
    previousBestPercentage === null ||
    entry.percentage > previousBestPercentage ||
    (entry.percentage === previousBestPercentage &&
      sameTopicBestTime !== null &&
      entry.elapsedSeconds < sameTopicBestTime);

  const updated = [entry, ...existing].slice(0, MAX_HISTORY_ITEMS);
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota errors in restricted browsing contexts
  }

  return {
    history: updated,
    isNewBest,
    previousBestPercentage,
  };
}

export function clearQuizHistory(): void {
  try {
    window.localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function computeTopicBests(history: HighScoreEntry[]): Record<TopicId, TopicBestRecord> {
  const map: Partial<Record<TopicId, TopicBestRecord>> = {};

  for (const entry of history) {
    const current = map[entry.topic];
    if (!current) {
      map[entry.topic] = {
        topic: entry.topic,
        bestPercentage: entry.percentage,
        bestScore: entry.score,
        bestTotal: entry.total,
        fastestSecondsAtBest: entry.elapsedSeconds,
        attempts: 1,
      };
    } else {
      current.attempts += 1;
      if (
        entry.percentage > current.bestPercentage ||
        (entry.percentage === current.bestPercentage &&
          entry.elapsedSeconds < current.fastestSecondsAtBest)
      ) {
        current.bestPercentage = entry.percentage;
        current.bestScore = entry.score;
        current.bestTotal = entry.total;
        current.fastestSecondsAtBest = entry.elapsedSeconds;
      }
    }
  }

  return map as Record<TopicId, TopicBestRecord>;
}

export function loadSavedTheme(): 'light' | 'dark' | null {
  try {
    const val = window.localStorage.getItem(THEME_KEY);
    if (val === 'light' || val === 'dark') return val;
    return null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage errors
  }
}

export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
