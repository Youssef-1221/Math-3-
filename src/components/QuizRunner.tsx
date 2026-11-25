import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Flag,
  HelpCircle,
  ListChecks,
  Target,
  XCircle,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getTopicMeta } from '../data/questions';
import type { AnswerRecord, Question } from '../types/quiz';
import { formatDuration } from '../utils/storage';
import { DiagramPreview } from './DiagramPreview';
import { MathText } from './MathText';

interface QuizRunnerProps {
  questions: Question[];
  onFinish: (records: AnswerRecord[], totalSeconds: number) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuizRunner({ questions, onFinish }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const questionStartRef = useRef<number>(0);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = records.length;
  const remainingCount = totalQuestions - answeredCount;
  const correctCount = records.filter((r) => r.isCorrect).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSelectOption = useCallback(
    (optionIdx: number) => {
      if (selectedIndex !== null || !currentQuestion) return;
      const spent = Math.max(1, elapsedSeconds - questionStartRef.current);
      const isCorrect = optionIdx === currentQuestion.correctIndex;
      setSelectedIndex(optionIdx);
      setRecords((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          selectedIndex: optionIdx,
          isCorrect,
          timeSpentSeconds: spent,
        },
      ]);
    },
    [selectedIndex, currentQuestion, elapsedSeconds],
  );

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      questionStartRef.current = elapsedSeconds;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFinish(records, elapsedSeconds);
    }
  }, [selectedIndex, currentIndex, totalQuestions, elapsedSeconds, onFinish, records]);

  // Keyboard shortcuts: 1-4 / A-D to answer, Enter / ArrowRight to continue
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // Do not intercept keys when a lightbox dialog is open
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;

      const key = e.key.toUpperCase();
      if (selectedIndex === null) {
        if (key === '1' || key === 'A') handleSelectOption(0);
        else if (key === '2' || key === 'B') handleSelectOption(1);
        else if (key === '3' || key === 'C') handleSelectOption(2);
        else if (key === '4' || key === 'D') handleSelectOption(3);
      } else if (e.key === 'Enter' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, handleSelectOption, handleNext]);

  if (!currentQuestion) return null;

  const topicMeta = getTopicMeta(currentQuestion.topic);
  const hasAnswered = selectedIndex !== null;
  const isCurrentCorrect = hasAnswered && selectedIndex === currentQuestion.correctIndex;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-8 space-y-6">
      {/* Live Session Progress, Timer & Score Tracker */}
      <section
        aria-label="Quiz session progress"
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs space-y-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
            <ListChecks className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" aria-hidden="true" />
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {remainingCount} remaining
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-sm font-mono tabular-nums">
            <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100 font-semibold">
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>
                Score: {correctCount}/{answeredCount}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-semibold"
              aria-label={`Elapsed time ${formatDuration(elapsedSeconds)}`}
            >
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>{formatDuration(elapsedSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Accessible Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Quiz progress: ${answeredCount} of ${totalQuestions} questions answered`}
          className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
        >
          <div
            className="h-full bg-sky-600 dark:bg-sky-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {/* Main Question Card */}
      <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-xs space-y-6">
        {/* Metadata Row (plain text + interpunct separator, zero pill clutter) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <span>
            {topicMeta.title} · {currentQuestion.sourceRef} · {currentQuestion.difficulty}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider">
            Keys: A–D / 1–4
          </span>
        </div>

        {/* Problem Statement + Optional Diagram Side-by-Side */}
        <div
          className={
            currentQuestion.diagram
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'
              : 'space-y-4'
          }
        >
          <div className={currentQuestion.diagram ? 'lg:col-span-7 space-y-4' : 'space-y-4'}>
            <div className="text-slate-900 dark:text-slate-50 font-medium">
              <MathText text={currentQuestion.prompt} size="lg" />
            </div>
          </div>

          {currentQuestion.diagram && (
            <div className="lg:col-span-5">
              <DiagramPreview diagram={currentQuestion.diagram} />
            </div>
          )}
        </div>

        {/* Multiple-Choice Options */}
        <div
          className="grid grid-cols-1 gap-3"
          role="radiogroup"
          aria-label="Choose the correct answer"
        >
          {currentQuestion.options.map((optionText, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrectOption = idx === currentQuestion.correctIndex;

            let stateStyle =
              'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:border-sky-500 hover:bg-sky-50/60 dark:hover:border-sky-400 dark:hover:bg-sky-950/30 text-slate-900 dark:text-slate-100';
            let letterStyle =
              'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200';
            let statusBadge: 'correct' | 'incorrect' | null = null;

            if (hasAnswered) {
              if (isCorrectOption) {
                stateStyle =
                  'border-emerald-600 bg-emerald-50/90 dark:border-emerald-500 dark:bg-emerald-950/45 text-slate-900 dark:text-white';
                letterStyle =
                  'bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-slate-950';
                statusBadge = 'correct';
              } else if (isSelected) {
                stateStyle =
                  'border-rose-600 bg-rose-50/90 dark:border-rose-500 dark:bg-rose-950/45 text-slate-900 dark:text-white';
                letterStyle =
                  'bg-rose-600 border-rose-600 text-white dark:bg-rose-500 dark:border-rose-500 dark:text-slate-950';
                statusBadge = 'incorrect';
              } else {
                stateStyle =
                  'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 opacity-75';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-14 p-3.5 sm:p-4 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition-colors ${
                  hasAnswered ? 'cursor-default' : 'cursor-pointer'
                } ${stateStyle}`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <span
                    className={`w-8 h-8 rounded-lg border font-mono text-sm font-bold flex items-center justify-center shrink-0 ${letterStyle}`}
                  >
                    {OPTION_LETTERS[idx]}
                  </span>
                  <div className="min-w-0 flex-1 overflow-x-auto py-0.5">
                    <MathText text={optionText} size="md" />
                  </div>
                </div>

                {statusBadge === 'correct' && (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">Correct</span>
                  </span>
                )}
                {statusBadge === 'incorrect' && (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300 shrink-0">
                    <XCircle className="w-5 h-5" aria-hidden="true" />
                    <span className="hidden sm:inline">Your Pick</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Live Feedback & Sequential Multi-Step Solution Phases */}
        {hasAnswered && (
          <section
            aria-live="polite"
            className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-5"
          >
            <div
              className={`rounded-xl p-4 border flex items-start gap-3 ${
                isCurrentCorrect
                  ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/35'
                  : 'border-rose-300 bg-rose-50/70 dark:border-rose-800 dark:bg-rose-950/35'
              }`}
            >
              {isCurrentCorrect ? (
                <CheckCircle2
                  className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              ) : (
                <XCircle
                  className="w-5 h-5 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              )}
              <div className="space-y-1 min-w-0">
                <p
                  className={`font-bold text-sm sm:text-base ${
                    isCurrentCorrect
                      ? 'text-emerald-900 dark:text-emerald-200'
                      : 'text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {isCurrentCorrect
                    ? 'Correct Answer!'
                    : `Incorrect — Option ${OPTION_LETTERS[currentQuestion.correctIndex]} is correct`}
                </p>
                <div className="text-sm text-slate-700 dark:text-slate-200">
                  <MathText text={currentQuestion.explanationSummary} size="sm" />
                </div>
              </div>
            </div>

            {/* Sequential Solution Phases */}
            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                <span>Step-by-Step Solution Phases</span>
              </h3>

              <ol className="space-y-3">
                {currentQuestion.phases.map((phase, pIdx) => (
                  <li
                    key={pIdx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {pIdx + 1}
                      </span>
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {phase.title}
                      </span>
                    </div>
                    <div className="text-sm text-slate-700 dark:text-slate-300 pl-8.5">
                      <MathText text={phase.explanation} size="sm" />
                    </div>
                    {phase.formula && (
                      <div className="ml-8.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 overflow-x-auto">
                        <MathText text={`$$${phase.formula}$$`} size="md" />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="min-h-12 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-sm sm:text-base inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                {currentIndex + 1 < totalQuestions ? (
                  <>
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <Flag className="w-4 h-4" aria-hidden="true" />
                    <span>Finish &amp; Review Results</span>
                  </>
                )}
              </button>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
