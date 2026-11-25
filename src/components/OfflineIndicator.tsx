import { Wifi, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return (
      <span
        className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap"
        title="Offline cache active — quiz works without internet"
      >
        <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <span>Offline-Ready</span>
      </span>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 whitespace-nowrap"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>Offline Mode</span>
    </span>
  );
}
