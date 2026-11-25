import { useState } from 'react';
import { Header } from './components/Header';
import { HomeSetup } from './components/HomeSetup';
import { QuizRunner } from './components/QuizRunner';
import { QuizSummary } from './components/QuizSummary';
import { QUESTIONS, TOPICS } from './data/questions';
import { useTheme } from './hooks/useTheme';
import type { AnswerRecord, HighScoreEntry, Question, QuizSessionConfig } from './types/quiz';
import { clearQuizHistory, loadQuizHistory, saveQuizAttempt } from './utils/storage';

type ViewMode = 'home' | 'quiz' | 'summary';

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestionOptions(question: Question): Question {
  const indices = shuffleArray([0, 1, 2, 3]);
  const nextOptions = indices.map((idx) => question.options[idx]) as [string, string, string, string];
  const nextCorrectIndex = indices.indexOf(question.correctIndex) as 0 | 1 | 2 | 3;
  return {
    ...question,
    options: nextOptions,
    correctIndex: nextCorrectIndex,
  };
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<ViewMode>('home');
  const [config, setConfig] = useState<QuizSessionConfig>({
    topic: 'all',
    count: 10,
    diagramsOnly: false,
    shuffle: true,
  });

  const [history, setHistory] = useState<HighScoreEntry[]>(() => loadQuizHistory());
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [sessionId, setSessionId] = useState(0);
  const [lastRecords, setLastRecords] = useState<AnswerRecord[]>([]);
  const [lastElapsed, setLastElapsed] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [previousBestPct, setPreviousBestPct] = useState<number | null>(null);
  const [activeTopicLabel, setActiveTopicLabel] = useState('All Course Modules');
  const [isRetryIncorrectRun, setIsRetryIncorrectRun] = useState(false);

  const startConfiguredQuiz = () => {
    const pool = QUESTIONS.filter((q) => {
      if (config.topic !== 'all' && q.topic !== config.topic) return false;
      if (config.diagramsOnly && !q.diagram) return false;
      return true;
    });

    if (pool.length === 0) return;

    const ordered = config.shuffle
      ? shuffleArray(pool).map(shuffleQuestionOptions)
      : pool;
    const selected = config.count === 0 ? ordered : ordered.slice(0, config.count);

    const label =
      config.topic === 'all'
        ? config.diagramsOnly
          ? 'All Modules (Diagrams)'
          : 'All Course Modules'
        : TOPICS.find((t) => t.id === config.topic)?.title ?? 'Selected Module';

    setActiveTopicLabel(label);
    setSessionQuestions(selected);
    setIsRetryIncorrectRun(false);
    setSessionId((prev) => prev + 1);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (records: AnswerRecord[], totalSeconds: number) => {
    const correctCount = records.filter((r) => r.isCorrect).length;
    const total = records.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    setLastRecords(records);
    setLastElapsed(totalSeconds);

    if (!isRetryIncorrectRun && total > 0) {
      const result = saveQuizAttempt({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        topic: config.topic,
        topicLabel: activeTopicLabel,
        score: correctCount,
        total,
        percentage,
        elapsedSeconds: totalSeconds,
        completedAt: new Date().toISOString(),
      });
      setHistory(result.history);
      setIsNewBest(result.isNewBest);
      setPreviousBestPct(result.previousBestPercentage);
    } else {
      setIsNewBest(false);
      setPreviousBestPct(null);
    }

    setView('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryIncorrect = (incorrectQuestions: Question[]) => {
    if (incorrectQuestions.length === 0) return;
    setSessionQuestions(incorrectQuestions);
    setActiveTopicLabel(`${activeTopicLabel} · Incorrect Review`);
    setIsRetryIncorrectRun(true);
    setSessionId((prev) => prev + 1);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    clearQuizHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        inSession={view !== 'home'}
        onExitSession={() => setView('home')}
      />

      <main className="flex-1">
        {view === 'home' && (
          <HomeSetup
            config={config}
            onChangeConfig={setConfig}
            onStartQuiz={startConfiguredQuiz}
            history={history}
            onClearHistory={handleClearHistory}
          />
        )}

        {view === 'quiz' && (
          <QuizRunner
            key={sessionId}
            questions={sessionQuestions}
            onFinish={handleFinishQuiz}
          />
        )}

        {view === 'summary' && (
          <QuizSummary
            questions={sessionQuestions}
            records={lastRecords}
            elapsedSeconds={lastElapsed}
            topicLabel={activeTopicLabel}
            isNewBest={isNewBest}
            previousBestPercentage={previousBestPct}
            onRetryAll={startConfiguredQuiz}
            onRetryIncorrect={handleRetryIncorrect}
            onBackHome={() => setView('home')}
          />
        )}
      </main>
    </div>
  );
}
