export type TopicId =
  | 'all'
  | 'table-integration'
  | 'integration-by-parts'
  | 'partial-fractions'
  | 'substitution'
  | 'definite-applications'
  | 'double-integrals'
  | 'ode-foundations'
  | 'first-order-odes'
  | 'laplace-transforms';

export interface TopicMeta {
  id: Exclude<TopicId, 'all'>;
  title: string;
  shortTitle: string;
  lectureRef: string;
  summary: string;
}

export type Difficulty = 'Core' | 'Intermediate' | 'Challenge';

export interface SolutionPhase {
  title: string;
  explanation: string;
  formula?: string;
}

export interface QuestionDiagram {
  src: string;
  alt: string;
  caption: string;
}

export interface Question {
  id: string;
  topic: Exclude<TopicId, 'all'>;
  difficulty: Difficulty;
  sourceRef: string;
  prompt: string;
  diagram?: QuestionDiagram;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanationSummary: string;
  phases: SolutionPhase[];
}

export interface QuizSessionConfig {
  topic: TopicId;
  count: number; // 0 means all matching questions
  diagramsOnly: boolean;
  shuffle: boolean;
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface HighScoreEntry {
  id: string;
  topic: TopicId;
  topicLabel: string;
  score: number;
  total: number;
  percentage: number;
  elapsedSeconds: number;
  completedAt: string;
}

export interface TopicBestRecord {
  topic: TopicId;
  bestPercentage: number;
  bestScore: number;
  bestTotal: number;
  fastestSecondsAtBest: number;
  attempts: number;
}
