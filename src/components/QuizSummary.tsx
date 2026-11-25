import {
  CheckCircle2,
  Clock,
  Home,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { getTopicMeta } from '../data/questions';
import type { AnswerRecord, Question } from '../types/quiz';
import { formatDuration } from '../utils/storage';
import { DiagramPreview } from './DiagramPreview';
import { MathText } from './MathText';

interface QuizSummaryProps {
  questions: Question[];
  records: AnswerRecord[];
  elapsedSeconds: number;
  topicLabel: string;
  isNewBest: boolean;
  previousBestPercentage: number | null;
  onRetryAll: () => void;
  onRetryIncorrect: (incorrectQuestions: Question[]) => void;
  onBackHome: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuizSummary({
  questions,
  records,
  elapsedSeconds,
  topicLabel,
  isNewBest,
  previousBestPercentage,
  onRetryAll,
  onRetryIncorrect,
  onBackHome,
}: QuizSummaryProps) {
  const incorrectItems = records
    .map((rec) => ({
      record: rec,
      question: questions.find((q) => q.id === rec.questionId),
    }))
    .filter(
      (item): item is { record: AnswerRecord; question: Question } =>
        Boolean(item.question) && !item.record.isCorrect,
    );

  const allItems = records
    .map((rec) => ({
      record: rec,
      question: questions.find((q) => q.id === rec.questionId),
    }))
    .filter((item): item is { record: AnswerRecord; question: Question } => Boolean(item.question));

  const [filterMode, setFilterMode] = useState<'incorrect' | 'all'>(
    incorrectItems.length > 0 ? 'incorrect' : 'all',
  );

  const total = records.length;
  const correctCount = records.filter((r) => r.isCorrect).length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const displayedItems = filterMode === 'incorrect' ? incorrectItems : allItems;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Results Summary Card */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-400">
              Session Completed · {topicLabel}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {percentage >= 80
                ? 'Strong Mastery!'
                : percentage >= 50
                  ? 'Good Progress — Review Missed Concepts'
                  : 'Keep Practicing — Inspect Step-by-Step Solutions'}
            </h1>
          </div>

          {isNewBest && (
            <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300">
              <Trophy className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>New Personal Best!</span>
            </div>
          )}
        </div>

        {/* Stat Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Final Score</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1 block">
              {correctCount}/{total}
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Accuracy</span>
            <span className="text-2xl font-extrabold text-sky-700 dark:text-sky-400 tabular-nums mt-1 block">
              {percentage}%
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Total Time
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums mt-1 block">
              {formatDuration(elapsedSeconds)}
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5" aria-hidden="true" /> Prior Best
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1 block">
              {previousBestPercentage !== null ? `${previousBestPercentage}%` : 'First Run'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          {incorrectItems.length > 0 && (
            <button
              type="button"
              onClick={() => onRetryIncorrect(incorrectItems.map((i) => i.question))}
              className="min-h-11 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Retry Incorrect ({incorrectItems.length})</span>
            </button>
          )}
          <button
            type="button"
            onClick={onRetryAll}
            className="min-h-11 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Practice Same Setup</span>
          </button>
          <button
            type="button"
            onClick={onBackHome}
            className="min-h-11 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Back to Question Bank</span>
          </button>
        </div>
      </section>

      {/* Answer Review Section */}
      <section aria-labelledby="review-heading" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="review-heading" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Answer Review &amp; Sequential Derivations
          </h2>

          <div className="flex items-center gap-2" role="tablist" aria-label="Filter reviewed answers">
            <button
              type="button"
              role="tab"
              aria-selected={filterMode === 'incorrect'}
              onClick={() => setFilterMode('incorrect')}
              className={`min-h-11 px-3.5 py-2 rounded-lg text-sm font-semibold tabular-nums transition-colors cursor-pointer ${
                filterMode === 'incorrect'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950'
                  : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Incorrect Only ({incorrectItems.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filterMode === 'all'}
              onClick={() => setFilterMode('all')}
              className={`min-h-11 px-3.5 py-2 rounded-lg text-sm font-semibold tabular-nums transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950'
                  : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Questions ({allItems.length})
            </button>
          </div>
        </div>

        {displayedItems.length === 0 ? (
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/30 p-6 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" aria-hidden="true" />
            <p className="font-bold text-emerald-900 dark:text-emerald-200">
              Zero Incorrect Answers!
            </p>
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              Switch to &ldquo;All Questions&rdquo; above if you want to review the step-by-step solutions.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {displayedItems.map(({ question, record }, idx) => {
              const topicMeta = getTopicMeta(question.topic);
              return (
                <article
                  key={question.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      Item {idx + 1} · {topicMeta.title} · {question.sourceRef}
                    </span>
                    {record.isCorrect ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-rose-700 dark:text-rose-400">
                        <XCircle className="w-4 h-4" aria-hidden="true" /> Incorrect
                      </span>
                    )}
                  </div>

                  <div
                    className={
                      question.diagram
                        ? 'grid grid-cols-1 lg:grid-cols-12 gap-5 items-start'
                        : ''
                    }
                  >
                    <div className={question.diagram ? 'lg:col-span-7 space-y-3' : 'space-y-3'}>
                      <div className="text-slate-900 dark:text-slate-50 font-medium">
                        <MathText text={question.prompt} size="md" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {!record.isCorrect && (
                          <div className="rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/35 p-3.5">
                            <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block mb-1">
                              Your Selection ({OPTION_LETTERS[record.selectedIndex]})
                            </span>
                            <div className="text-sm text-slate-900 dark:text-slate-100 overflow-x-auto">
                              <MathText text={question.options[record.selectedIndex]} size="sm" />
                            </div>
                          </div>
                        )}
                        <div
                          className={`rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/35 p-3.5 ${
                            record.isCorrect ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                            Correct Answer ({OPTION_LETTERS[question.correctIndex]})
                          </span>
                          <div className="text-sm text-slate-900 dark:text-slate-100 overflow-x-auto">
                            <MathText text={question.options[question.correctIndex]} size="sm" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {question.diagram && (
                      <div className="lg:col-span-5">
                        <DiagramPreview diagram={question.diagram} compact />
                      </div>
                    )}
                  </div>

                  {/* Sequential Phases */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                    <div className="text-sm text-slate-700 dark:text-slate-200">
                      <MathText text={question.explanationSummary} size="sm" />
                    </div>
                    <ol className="space-y-2">
                      {question.phases.map((phase, pIdx) => (
                        <li
                          key={pIdx}
                          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 p-3 space-y-1.5"
                        >
                          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                            {pIdx + 1}. {phase.title}
                          </p>
                          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                            <MathText text={phase.explanation} size="sm" />
                          </div>
                          {phase.formula && (
                            <div className="rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 overflow-x-auto">
                              <MathText text={`$$${phase.formula}$$`} size="sm" />
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
