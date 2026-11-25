import { Maximize2, Minimize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { QuestionDiagram } from '../types/quiz';

interface DiagramPreviewProps {
  diagram: QuestionDiagram;
  compact?: boolean;
}

const ZOOM_STEPS = [1, 1.5, 2, 2.5];

export function DiagramPreview({ diagram, compact = false }: DiagramPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(0);

  const zoom = ZOOM_STEPS[zoomIdx];

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === '+' || e.key === '=') {
        setZoomIdx((prev) => Math.min(ZOOM_STEPS.length - 1, prev + 1));
      } else if (e.key === '-') {
        setZoomIdx((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const openModal = () => {
    setZoomIdx(0);
    setIsOpen(true);
  };

  return (
    <>
      <figure className="rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="diagram-frame relative flex items-center justify-center p-3 sm:p-4">
          <img
            src={diagram.src}
            alt={diagram.alt}
            loading="lazy"
            className={`w-full object-contain select-none ${
              compact ? 'max-h-48' : 'max-h-64 sm:max-h-72'
            }`}
          />
          <button
            type="button"
            onClick={openModal}
            className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-medium shadow-md transition-colors cursor-pointer"
            aria-label={`Open high-resolution preview of ${diagram.caption}`}
          >
            <Maximize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Inspect HD</span>
          </button>
        </div>
        <figcaption className="px-3.5 py-2.5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between gap-3">
          <span className="truncate">{diagram.caption}</span>
          <button
            type="button"
            onClick={openModal}
            className="text-sky-700 dark:text-sky-400 hover:underline font-medium shrink-0 cursor-pointer"
          >
            Zoom
          </button>
        </figcaption>
      </figure>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`High-resolution diagram preview: ${diagram.caption}`}
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-xs p-3 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-semibold truncate">{diagram.caption}</p>
              <p className="text-xs text-slate-400 truncate">{diagram.alt}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomIdx((prev) => Math.max(0, prev - 1))}
                disabled={zoomIdx === 0}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-100 transition-colors cursor-pointer"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="tabular-nums text-xs font-mono px-2 min-w-12 text-center text-slate-200">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomIdx((prev) => Math.min(ZOOM_STEPS.length - 1, prev + 1))}
                disabled={zoomIdx === ZOOM_STEPS.length - 1}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-100 transition-colors cursor-pointer"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setZoomIdx(0)}
                className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 transition-colors cursor-pointer"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-h-11 px-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 text-slate-900 hover:bg-white font-medium text-sm transition-colors cursor-pointer"
                aria-label="Close diagram preview"
              >
                <Minimize2 className="w-4 h-4 sm:hidden" aria-hidden="true" />
                <X className="w-4 h-4 hidden sm:block" aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="diagram-frame rounded-xl p-4 shadow-2xl inline-block max-w-none">
              <img
                src={diagram.src}
                alt={diagram.alt}
                style={{
                  width: `${zoom * 100}%`,
                  maxWidth: zoom === 1 ? 'min(85vw, 760px)' : 'none',
                  minWidth: zoom > 1 ? `${Math.round(zoom * 520)}px` : undefined,
                }}
                className="h-auto object-contain block mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
