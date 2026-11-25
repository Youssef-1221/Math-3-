import { ArrowLeft, Moon, Sigma, Sun } from 'lucide-react';
import type { ThemeMode } from '../hooks/useTheme';
import { OfflineIndicator } from './OfflineIndicator';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  inSession: boolean;
  onExitSession: () => void;
}

export function Header({ theme, onToggleTheme, inSession, onExitSession }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand / Back */}
        <div className="flex items-center gap-3 min-w-0">
          {inSession ? (
            <button
              type="button"
              onClick={onExitSession}
              className="inline-flex items-center gap-2 min-h-11 px-2.5 -ml-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Question Bank</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-sky-500/15 border border-slate-800 dark:border-sky-400/30 flex items-center justify-center shrink-0">
                <Sigma className="w-5 h-5 text-sky-400" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap block leading-tight">
                  Math 3 Question Bank
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Zone 2: Offline Status */}
        <div className="hidden sm:flex items-center justify-center">
          <OfflineIndicator />
        </div>

        {/* Zone 3: Primary Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="sm:hidden">
            <OfflineIndicator />
          </div>
          <PWAInstallButton />
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center gap-2 min-h-11 min-w-11 sm:px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
