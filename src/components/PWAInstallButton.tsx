import { Download, Share } from 'lucide-react';
import { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { canPromptInstall, isIOS, isInstalled, promptInstall } = usePWAInstall();
  const [showIOSHint, setShowIOSHint] = useState(false);

  if (isInstalled) return null;

  if (canPromptInstall) {
    return (
      <button
        type="button"
        onClick={() => void promptInstall()}
        className="inline-flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-lg border border-sky-600/30 bg-sky-50 hover:bg-sky-100 text-sky-800 dark:border-sky-400/30 dark:bg-sky-950/60 dark:hover:bg-sky-900/70 dark:text-sky-200 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowIOSHint((prev) => !prev)}
          className="inline-flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer"
        >
          <Share className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Save Offline</span>
        </button>
        {showIOSHint && (
          <div
            role="dialog"
            aria-label="iOS Offline Install Instructions"
            className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 shadow-xl text-xs text-slate-700 dark:text-slate-300 z-50"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              Install on iPhone / iPad
            </p>
            <p>
              Tap Safari&apos;s Share button and select <strong>Add to Home Screen</strong> for full offline access.
            </p>
          </div>
        )}
      </div>
    );
  }

  return null;
}
