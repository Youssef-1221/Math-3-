import {
  ArrowRight,
  Award,
  BookOpen,
  CheckSquare,
  Clock,
  Image as ImageIcon,
  Layers,
  Play,
  Shuffle,
  Trash2,
  Trophy,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { QUESTIONS, TOPICS } from '../data/questions';
import type { HighScoreEntry, QuizSessionConfig, TopicId } from '../types/quiz';
import { computeTopicBests, formatDuration } from '../utils/storage';

interface HomeSetupProps {
  config: QuizSessionConfig;
  onChangeConfig: (next: QuizSessionConfig) => void;
  onStartQuiz: () => void;
  history: HighScoreEntry[];
  onClearHistory: () => void;
}

const COUNT_OPTIONS = [5, 10, 20, 0] as const;

export function HomeSetup({
  config,
  onChangeConfig,
  onStartQuiz,
  history,
  onClearHistory,
}: HomeSetupProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  const topicBests = useMemo(() => computeTopicBests(history), [history]);

  const matchingQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      if (config.topic !== 'all' && q.topic !== config.topic) return false;
      if (config.diagramsOnly && !q.diagram) return false;
      return true;
    });
  }, [config.topic, config.diagramsOnly]);

  const effectiveCount =
    config.count === 0
      ? matchingQuestions.length
      : Math.min(config.count, matchingQuestions.length);

  const totalDiagramQuestions = useMemo(
    () => QUESTIONS.filter((q) => Boolean(q.diagram)).length,
    [],
  );

  const overallBest = useMemo(() => {
    if (history.length === 0) return null;
    return history.reduce((best, cur) => {
      if (cur.percentage > best.percentage) return cur;
      if (cur.percentage === best.percentage && cur.elapsedSeconds < best.elapsedSeconds) {
        return cur;
      }
      return best;
    }, history[0]);
  }, [history]);

  const selectedTopicLabel =
    config.topic === 'all'
      ? 'All Math 3 Modules'
      : TOPICS.find((t) => t.id === config.topic)?.title ?? 'Selected Module';

  const selectTopic = (topic: TopicId) => {
    onChangeConfig({ ...config, topic });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Intro & Launch Configuration */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-400">
              Engineering Mathematics 3 · {QUESTIONS.length} Verified MCQs · {totalDiagramQuestions} Lecture Diagrams
            </p>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Master Integration, ODEs &amp; Laplace Transforms
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Practice multiple-choice problems built from your 13 course lectures with clear mathematical
              typography, sequential multi-step derivations, cropped lecture diagrams, and offline support.
            </p>
          </div>

          {/* Topic Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                <span>Choose Topic Module</span>
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {matchingQuestions.length} available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Topic Module">
              {/* All Topics Card */}
              <button
                type="button"
                role="radio"
                aria-checked={config.topic === 'all'}
                onClick={() => selectTopic('all')}
                className={`text-left p-4 rounded-xl border transition-colors cursor-pointer min-h-11 ${
                  config.topic === 'all'
                    ? 'border-sky-600 bg-sky-50/70 dark:border-sky-400 dark:bg-sky-950/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    All Course Modules
                  </span>
                  <span className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400 shrink-0">
                    {QUESTIONS.length} Qs
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Comprehensive exam prep spanning Lectures 1–9 and Math 3 Lec 1–5.
                </p>
                {topicBests.all && (
                  <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                    Best: {topicBests.all.bestPercentage}% · {formatDuration(topicBests.all.fastestSecondsAtBest)}
                  </p>
                )}
              </button>

              {TOPICS.map((topic) => {
                const count = QUESTIONS.filter((q) => q.topic === topic.id).length;
                const diagramCount = QUESTIONS.filter((q) => q.topic === topic.id && q.diagram).length;
                const best = topicBests[topic.id];
                const isSelected = config.topic === topic.id;

                return (
                  <button
                    key={topic.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => selectTopic(topic.id)}
                    className={`text-left p-4 rounded-xl border transition-colors cursor-pointer min-h-11 ${
                      isSelected
                        ? 'border-sky-600 bg-sky-50/70 dark:border-sky-400 dark:bg-sky-950/40'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                        {topic.title}
                      </span>
                      <span className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400 shrink-0">
                        {count} Qs
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {topic.lectureRef}
                      {diagramCount > 0 ? ` · ${diagramCount} diagrams` : ''}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {topic.summary}
                    </p>
                    {best && (
                      <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                        Best: {best.bestPercentage}% · {formatDuration(best.fastestSecondsAtBest)}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Session Launcher & Quick Settings */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-22">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-5">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Session Setup
              </p>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedTopicLabel}
              </h2>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Questions per Quiz
              </span>
              <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Number of questions">
                {COUNT_OPTIONS.map((opt) => {
                  const active = config.count === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => onChangeConfig({ ...config, count: opt })}
                      className={`min-h-11 rounded-lg border text-sm font-semibold tabular-nums transition-colors cursor-pointer ${
                        active
                          ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-500 dark:text-slate-950'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {opt === 0 ? 'All' : opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                role="switch"
                aria-checked={config.shuffle}
                onClick={() => onChangeConfig({ ...config, shuffle: !config.shuffle })}
                className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                  <Shuffle className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                  <span>Shuffle Question Order</span>
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    config.shuffle
                      ? 'text-sky-700 dark:text-sky-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {config.shuffle ? 'On' : 'Off'}
                </span>
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={config.diagramsOnly}
                onClick={() => onChangeConfig({ ...config, diagramsOnly: !config.diagramsOnly })}
                className="w-full min-h-11 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200">
                  <ImageIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
                  <span>Diagram Problems Only</span>
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${
                    config.diagramsOnly
                      ? 'text-sky-700 dark:text-sky-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {config.diagramsOnly ? 'On' : 'Off'}
                </span>
              </button>
            </div>

            {/* Launch CTA */}
            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                disabled={effectiveCount === 0}
                onClick={onStartQuiz}
                className="w-full min-h-12 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-45 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>
                  {effectiveCount === 0
                    ? 'No Matching Questions'
                    : `Start Quiz (${effectiveCount} ${effectiveCount === 1 ? 'Question' : 'Questions'})`}
                </span>
                {effectiveCount > 0 && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
              </button>

              {effectiveCount === 0 && (
                <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
                  This topic has no diagram-only items. Turn off &ldquo;Diagram Problems Only&rdquo; or choose
                  Area &amp; Arc Length / Double Integrals.
                </p>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-3 pt-1">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Timed
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" /> Phased Solutions
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" aria-hidden="true" /> Review Mode
                </span>
              </p>
            </div>
          </div>

          {/* High Score Summary Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Saved Personal Best</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {history.length} {history.length === 1 ? 'run' : 'runs'}
              </span>
            </div>

            {overallBest ? (
              <div className="space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {overallBest.percentage}%
                  </span>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 tabular-nums">
                    {overallBest.score}/{overallBest.total} · {formatDuration(overallBest.elapsedSeconds)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                  {overallBest.topicLabel}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Complete any quiz session to record your high score and benchmark future runs.
              </p>
            )}
          </div>
        </aside>
      </section>

      {/* High Scores & Session Comparison Table */}
      <section
        aria-labelledby="high-scores-heading"
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <div>
              <h2 id="high-scores-heading" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                High Scores &amp; Session Comparison
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saved locally in your browser for offline comparison across study sessions.
              </p>
            </div>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              {confirmClear ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      onClearHistory();
                      setConfirmClear(false);
                    }}
                    className="min-h-11 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Confirm Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="min-h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex items-center gap-1.5 min-h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Clear History</span>
                </button>
              )}
            </div>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            No completed sessions yet. Start a quiz above to track your accuracy and speed.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 pr-4">Module</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 pl-3 text-right">Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {history.slice(0, 10).map((entry) => {
                  const isTopicBest =
                    topicBests[entry.topic]?.bestPercentage === entry.percentage &&
                    topicBests[entry.topic]?.fastestSecondsAtBest === entry.elapsedSeconds;

                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 pr-4 font-medium text-slate-900 dark:text-slate-100">
                        <span>{entry.topicLabel}</span>
                        {isTopicBest && (
                          <span className="ml-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                            · Best
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                        {entry.score}/{entry.total}
                      </td>
                      <td className="py-3 px-3 font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
                        {entry.percentage}%
                      </td>
                      <td className="py-3 px-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {formatDuration(entry.elapsedSeconds)}
                      </td>
                      <td className="py-3 pl-3 text-right text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(entry.completedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
