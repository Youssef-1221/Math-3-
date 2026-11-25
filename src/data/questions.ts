import type { Question, TopicMeta } from '../types/quiz';

export const TOPICS: TopicMeta[] = [
  {
    id: 'table-integration',
    title: 'Table Integration & Basic Rules',
    shortTitle: 'Table Rules',
    lectureRef: 'Lecture 1',
    summary: 'Power, exponential, trigonometric, hyperbolic, inverse forms, and f\'/f patterns.',
  },
  {
    id: 'integration-by-parts',
    title: 'Integration by Parts',
    shortTitle: 'By Parts',
    lectureRef: 'Lecture 2',
    summary: 'LIATE selection, cyclic integrals, and tabular integration for repeated products.',
  },
  {
    id: 'partial-fractions',
    title: 'Partial Fractions & Quadratics',
    shortTitle: 'Partial Fractions',
    lectureRef: 'Lecture 3',
    summary: 'Long division, linear/repeated/quadratic factors, and completing the square.',
  },
  {
    id: 'substitution',
    title: 'Algebraic & Trig Substitution',
    shortTitle: 'Substitution',
    lectureRef: 'Lecture 4',
    summary: 'Root substitutions and trigonometric substitutions for radical expressions.',
  },
  {
    id: 'definite-applications',
    title: 'Definite Integrals, Area & Arc Length',
    shortTitle: 'Area & Arc Length',
    lectureRef: 'Lecture 5',
    summary: 'Even/odd symmetry, bounded planar areas, and curve arc length calculations.',
  },
  {
    id: 'double-integrals',
    title: 'Double Integrals Over Regions',
    shortTitle: 'Double Integrals',
    lectureRef: 'Lecture 6',
    summary: 'Iterated integrals over general regions D, dx dy vs dy dx, and region splitting.',
  },
  {
    id: 'ode-foundations',
    title: 'ODE Foundations & Boundary Value',
    shortTitle: 'ODE Foundations',
    lectureRef: 'Lecture 7 & Lec 1',
    summary: 'Order, degree, ODE vs PDE, eliminating constants, and steady-state heat rod.',
  },
  {
    id: 'first-order-odes',
    title: 'First-Order Differential Equations',
    shortTitle: '1st-Order ODEs',
    lectureRef: 'Lectures 7–9, Lec 2 & 4',
    summary: 'Separable, linear-substitution, homogeneous, exact, and integrating-factor ODEs.',
  },
  {
    id: 'laplace-transforms',
    title: 'Laplace Transforms',
    shortTitle: 'Laplace',
    lectureRef: 'Math 3 Lec 5',
    summary: 'Definition, linearity, elementary transforms, and t·f(t) derivative property.',
  },
];

export const QUESTIONS: Question[] = [
  // ======================== 1. TABLE INTEGRATION ========================
  {
    id: 'tab-1',
    topic: 'table-integration',
    difficulty: 'Core',
    sourceRef: 'Lecture 1 · Standard Forms',
    prompt: 'Evaluate the indefinite integral: $$\\int \\frac{x^2}{\\sqrt{3 - x^6}}\\,dx$$',
    options: [
      '$\\frac{1}{\\sqrt{3}}\\sin^{-1}\\left(\\frac{x^3}{3}\\right) + C$',
      '$\\frac{1}{3}\\sin^{-1}\\left(\\frac{x^3}{\\sqrt{3}}\\right) + C$',
      '$\\frac{1}{3}\\sinh^{-1}\\left(\\frac{x^3}{\\sqrt{3}}\\right) + C$',
      '$\\sin^{-1}\\left(\\frac{x^3}{\\sqrt{3}}\\right) + C$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Substituting $u = x^3$ converts the integral into the standard $\\int \\frac{du}{\\sqrt{a^2 - u^2}} = \\sin^{-1}(u/a) + C$ form with $a = \\sqrt{3}$.',
    phases: [
      {
        title: 'Phase 1 · Match the inner function and its derivative',
        explanation:
          'Notice $x^6 = (x^3)^2$, and the numerator contains $x^2\\,dx$, which is proportional to the derivative of $x^3$. Let $u = x^3$.',
        formula: 'u = x^3 \\implies du = 3x^2\\,dx \\implies x^2\\,dx = \\frac{1}{3}\\,du',
      },
      {
        title: 'Phase 2 · Apply the inverse sine table formula',
        explanation:
          'Rewrite $3$ as $(\\sqrt{3})^2$ so the denominator matches $\\sqrt{a^2 - u^2}$ with $a = \\sqrt{3}$.',
        formula:
          '\\frac{1}{3}\\int \\frac{du}{\\sqrt{(\\sqrt{3})^2 - u^2}} = \\frac{1}{3}\\sin^{-1}\\left(\\frac{u}{\\sqrt{3}}\\right) + C = \\frac{1}{3}\\sin^{-1}\\left(\\frac{x^3}{\\sqrt{3}}\\right) + C',
      },
    ],
  },
  {
    id: 'tab-2',
    topic: 'table-integration',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 1 · Inverse Secant Form',
    prompt: 'Evaluate the indefinite integral (for $\\sin x > 5$ in the domain of the integrand, or standard table antiderivative): $$\\int \\frac{\\cos x}{\\sin x\\sqrt{\\sin^2 x - 25}}\\,dx$$',
    options: [
      '$-\\frac{1}{5}\\operatorname{sech}^{-1}\\left(\\frac{\\sin x}{5}\\right) + C$',
      '$\\frac{1}{25}\\sec^{-1}\\left(\\frac{\\sin x}{5}\\right) + C$',
      '$\\frac{1}{5}\\tan^{-1}\\left(\\frac{\\sin x}{5}\\right) + C$',
      '$\\frac{1}{5}\\sec^{-1}\\left(\\frac{\\sin x}{5}\\right) + C$',
    ],
    correctIndex: 3,
    explanationSummary:
      'With $u = \\sin x$ and $a = 5$, the integrand matches $\\int \\frac{du}{u\\sqrt{u^2 - a^2}} = \\frac{1}{a}\\sec^{-1}(|u|/a) + C$.',
    phases: [
      {
        title: 'Phase 1 · Identify the substitution',
        explanation:
          'Let $u = \\sin x$. Then $du = \\cos x\\,dx$, which appears directly in the numerator.',
        formula: '\\int \\frac{\\cos x}{\\sin x\\sqrt{\\sin^2 x - 25}}\\,dx = \\int \\frac{du}{u\\sqrt{u^2 - 5^2}}',
      },
      {
        title: 'Phase 2 · Apply the inverse secant rule',
        explanation:
          'Distinguish carefully between $\\int \\frac{du}{u\\sqrt{u^2 - a^2}} = \\frac{1}{a}\\sec^{-1}\\left(\\frac{u}{a}\\right) + C$ and the hyperbolic $\\operatorname{sech}^{-1}$ form, which has $\\sqrt{a^2 - u^2}$ inside the radical instead of $\\sqrt{u^2 - a^2}$.',
        formula: '\\int \\frac{du}{u\\sqrt{u^2 - 5^2}} = \\frac{1}{5}\\sec^{-1}\\left(\\frac{\\sin x}{5}\\right) + C',
      },
    ],
  },
  {
    id: 'tab-3',
    topic: 'table-integration',
    difficulty: 'Core',
    sourceRef: 'Lecture 1 · Logarithmic f\'/f Pattern',
    prompt: 'What is the value of the indefinite integral $$\\int \\frac{e^{2x}}{e^{2x} + 4}\\,dx\\,?$$',
    options: [
      '$\\frac{1}{2}\\ln(e^{2x} + 4) + C$',
      '$2\\ln(e^{2x} + 4) + C$',
      '$\\ln(e^{2x} + 4) + C$',
      '$\\frac{1}{2}\\tan^{-1}\\left(\\frac{e^x}{2}\\right) + C$',
    ],
    correctIndex: 0,
    explanationSummary:
      'Because $\\frac{d}{dx}(e^{2x} + 4) = 2e^{2x}$, multiplying and dividing by $2$ gives the $\\int \\frac{f\'(x)}{f(x)}\\,dx = \\ln|f(x)| + C$ form.',
    phases: [
      {
        title: 'Phase 1 · Differentiate the denominator',
        explanation: 'Set $f(x) = e^{2x} + 4$. Its derivative is $f\'(x) = 2e^{2x}$.',
        formula: 'f\'(x) = 2e^{2x}',
      },
      {
        title: 'Phase 2 · Balance the missing factor of 2',
        explanation:
          'Insert $2$ inside the integral and $\\frac{1}{2}$ outside, then integrate using the logarithmic derivative rule.',
        formula: '\\frac{1}{2}\\int \\frac{2e^{2x}}{e^{2x} + 4}\\,dx = \\frac{1}{2}\\ln(e^{2x} + 4) + C',
      },
    ],
  },
  {
    id: 'tab-4',
    topic: 'table-integration',
    difficulty: 'Core',
    sourceRef: 'Lecture 1 · Power of Function f^n f\'',
    prompt: 'Evaluate $$\\int \\tan^3 x\\,\\sec^2 x\\,dx$$',
    options: [
      '$\\frac{1}{3}\\sec^3 x + C$',
      '$3\\tan^2 x\\,\\sec^2 x + C$',
      '$\\frac{1}{4}\\tan^4 x + C$',
      '$\\frac{1}{4}\\sec^4 x + C$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Since $\\frac{d}{dx}(\\tan x) = \\sec^2 x$, the integral is directly of the form $\\int [f(x)]^n f\'(x)\\,dx = \\frac{[f(x)]^{n+1}}{n+1} + C$.',
    phases: [
      {
        title: 'Phase 1 · Recognize f(x) and f\'(x)',
        explanation: 'Take $f(x) = \\tan x$ and $n = 3$. Note that $f\'(x) = \\sec^2 x$ is already present.',
        formula: 'u = \\tan x \\implies du = \\sec^2 x\\,dx',
      },
      {
        title: 'Phase 2 · Apply the generalized power rule',
        explanation: 'Increase the exponent from $3$ to $4$ and divide by $4$.',
        formula: '\\int u^3\\,du = \\frac{u^4}{4} + C = \\frac{1}{4}\\tan^4 x + C',
      },
    ],
  },
  {
    id: 'tab-5',
    topic: 'table-integration',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 1 · Hyperbolic Table Forms',
    prompt: 'Evaluate the integral $$\\int \\frac{1}{\\sqrt{9x^2 + 16}}\\,dx$$',
    options: [
      '$\\frac{1}{4}\\sinh^{-1}\\left(\\frac{3x}{4}\\right) + C$',
      '$\\frac{1}{3}\\sinh^{-1}\\left(\\frac{3x}{4}\\right) + C$',
      '$\\frac{1}{3}\\sin^{-1}\\left(\\frac{3x}{4}\\right) + C$',
      '$\\frac{1}{12}\\tan^{-1}\\left(\\frac{3x}{4}\\right) + C$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Rewriting $9x^2 + 16 = (3x)^2 + 4^2$ with $u = 3x$ yields $\\frac{1}{3}\\int \\frac{du}{\\sqrt{u^2 + 4^2}} = \\frac{1}{3}\\sinh^{-1}\\left(\\frac{3x}{4}\\right) + C$.',
    phases: [
      {
        title: 'Phase 1 · Express inside the square root as u^2 + a^2',
        explanation: 'Write $9x^2 = (3x)^2$ and $16 = 4^2$. Set $u = 3x$, so $du = 3\\,dx$.',
        formula: '\\int \\frac{dx}{\\sqrt{(3x)^2 + 4^2}} = \\frac{1}{3}\\int \\frac{du}{\\sqrt{u^2 + 4^2}}',
      },
      {
        title: 'Phase 2 · Apply the inverse hyperbolic sine formula',
        explanation: 'Use $\\int \\frac{du}{\\sqrt{u^2 + a^2}} = \\sinh^{-1}(u/a) + C$ with $a = 4$.',
        formula: '\\frac{1}{3}\\sinh^{-1}\\left(\\frac{3x}{4}\\right) + C',
      },
    ],
  },

  // ======================== 2. INTEGRATION BY PARTS ========================
  {
    id: 'ibp-1',
    topic: 'integration-by-parts',
    difficulty: 'Core',
    sourceRef: 'Lecture 2 · LIATE & Basic Parts',
    prompt: 'Evaluate $$\\int x\\ln x\\,dx$$',
    options: [
      '$\\frac{x^2}{2}\\ln x - \\frac{x^2}{2} + C$',
      '$x\\ln x - x + C$',
      '$\\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C$',
      '$\\frac{x^2}{2}\\ln x + \\frac{x^2}{4} + C$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Choose $u = \\ln x$ (Logarithmic before Algebraic in LIATE) and $dv = x\\,dx$, then apply $\\int u\\,dv = uv - \\int v\\,du$.',
    phases: [
      {
        title: 'Phase 1 · Choose u and dv via LIATE',
        explanation: 'Since Logarithmic precedes Algebraic, set $u = \\ln x$ and $dv = x\\,dx$.',
        formula: 'u = \\ln x \\implies du = \\frac{1}{x}\\,dx,\\qquad dv = x\\,dx \\implies v = \\frac{x^2}{2}',
      },
      {
        title: 'Phase 2 · Apply integration by parts formula',
        explanation: 'Substitute $u, v, du$ into $uv - \\int v\\,du$ and simplify the remaining integrand.',
        formula:
          '\\frac{x^2}{2}\\ln x - \\int \\frac{x^2}{2}\\cdot\\frac{1}{x}\\,dx = \\frac{x^2}{2}\\ln x - \\frac{1}{2}\\int x\\,dx = \\frac{x^2}{2}\\ln x - \\frac{x^2}{4} + C',
      },
    ],
  },
  {
    id: 'ibp-2',
    topic: 'integration-by-parts',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 2 · Tabular Method',
    prompt: 'Using the tabular method (repeated integration by parts), evaluate $$\\int x^2 e^{3x}\\,dx$$',
    options: [
      '$e^{3x}\\left(\\frac{x^2}{3} - \\frac{2x}{9} + \\frac{2}{27}\\right) + C$',
      '$e^{3x}\\left(\\frac{x^2}{3} + \\frac{2x}{9} + \\frac{2}{27}\\right) + C$',
      '$e^{3x}\\left(3x^2 - 6x + 6\\right) + C$',
      '$e^{3x}\\left(\\frac{x^2}{3} - \\frac{2x}{3} + \\frac{2}{9}\\right) + C$',
    ],
    correctIndex: 0,
    explanationSummary:
      'Differentiating $x^2 \\to 2x \\to 2 \\to 0$ and integrating $e^{3x} \\to \\frac{1}{3}e^{3x} \\to \\frac{1}{9}e^{3x} \\to \\frac{1}{27}e^{3x}$ with alternating signs ($+, -, +$) produces the result.',
    phases: [
      {
        title: 'Phase 1 · Build derivative (D) and integral (I) columns',
        explanation: 'Differentiate $u = x^2$ until reaching $0$, and integrate $dv = e^{3x}\\,dx$ the same number of times.',
        formula:
          'D:\\; x^2,\\; 2x,\\; 2,\\; 0 \\qquad I:\\; e^{3x},\\; \\frac{1}{3}e^{3x},\\; \\frac{1}{9}e^{3x},\\; \\frac{1}{27}e^{3x}',
      },
      {
        title: 'Phase 2 · Multiply diagonally with alternating signs',
        explanation: 'Pair each $D$ entry with the next $I$ entry down using signs $+, -, +$.',
        formula:
          '+x^2\\left(\\frac{e^{3x}}{3}\\right) - 2x\\left(\\frac{e^{3x}}{9}\\right) + 2\\left(\\frac{e^{3x}}{27}\\right) + C = e^{3x}\\left(\\frac{x^2}{3} - \\frac{2x}{9} + \\frac{2}{27}\\right) + C',
      },
    ],
  },
  {
    id: 'ibp-3',
    topic: 'integration-by-parts',
    difficulty: 'Challenge',
    sourceRef: 'Lecture 2 · Half-Angle + Tabular',
    prompt: 'Evaluate $$\\int x^2 \\cos^2 x\\,dx$$',
    options: [
      '$\\frac{1}{2}\\left(\\frac{x^2}{2}\\sin 2x - \\frac{x}{2}\\cos 2x + \\frac{1}{4}\\sin 2x\\right) + C$',
      '$\\frac{x^3}{3} + \\frac{x^2}{2}\\sin 2x + \\frac{x}{2}\\cos 2x + C$',
      '$\\frac{x^3}{6} + \\frac{x^2}{2}\\sin 2x - \\frac{x}{2}\\cos 2x + \\frac{1}{4}\\sin 2x + C$',
      '$\\frac{x^3}{6} + \\frac{1}{2}\\left(\\frac{x^2}{2}\\sin 2x + \\frac{x}{2}\\cos 2x - \\frac{1}{4}\\sin 2x\\right) + C$',
    ],
    correctIndex: 3,
    explanationSummary:
      'First use $\\cos^2 x = \\frac{1 + \\cos 2x}{2}$ to split the integral into $\\frac{1}{2}\\int x^2\\,dx + \\frac{1}{2}\\int x^2\\cos 2x\\,dx$, then apply the tabular method to the second term.',
    phases: [
      {
        title: 'Phase 1 · Apply the double-angle identity',
        explanation: 'Replace $\\cos^2 x$ by $\\frac{1 + \\cos 2x}{2}$ and separate into two integrals.',
        formula: '\\int x^2 \\cos^2 x\\,dx = \\frac{1}{2}\\int x^2\\,dx + \\frac{1}{2}\\int x^2\\cos 2x\\,dx',
      },
      {
        title: 'Phase 2 · Evaluate the polynomial term',
        explanation: 'Integrate $\\frac{1}{2}\\int x^2\\,dx$ directly.',
        formula: '\\frac{1}{2}\\cdot\\frac{x^3}{3} = \\frac{x^3}{6}',
      },
      {
        title: 'Phase 3 · Apply tabular method to ∫ x² cos(2x) dx',
        explanation:
          'Differentiate $x^2 \\to 2x \\to 2 \\to 0$ and integrate $\\cos 2x \\to \\frac{1}{2}\\sin 2x \\to -\\frac{1}{4}\\cos 2x \\to -\\frac{1}{8}\\sin 2x$ with alternating signs $+, -, +$.',
        formula:
          '\\int x^2\\cos 2x\\,dx = \\frac{x^2}{2}\\sin 2x - (2x)\\left(-\\frac{1}{4}\\cos 2x\\right) + 2\\left(-\\frac{1}{8}\\sin 2x\\right) = \\frac{x^2}{2}\\sin 2x + \\frac{x}{2}\\cos 2x - \\frac{1}{4}\\sin 2x',
      },
      {
        title: 'Phase 4 · Combine both pieces',
        explanation: 'Multiply the tabular result by $\\frac{1}{2}$ and add $\\frac{x^3}{6} + C$.',
        formula: '\\frac{x^3}{6} + \\frac{1}{2}\\left(\\frac{x^2}{2}\\sin 2x + \\frac{x}{2}\\cos 2x - \\frac{1}{4}\\sin 2x\\right) + C',
      },
    ],
  },
  {
    id: 'ibp-4',
    topic: 'integration-by-parts',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 2 · Inverse Trig by Parts',
    prompt: 'Evaluate $$\\int \\tan^{-1} x\\,dx$$',
    options: [
      '$x\\tan^{-1} x + \\frac{1}{2}\\ln(1 + x^2) + C$',
      '$x\\tan^{-1} x - \\frac{1}{2}\\ln(1 + x^2) + C$',
      '$x\\tan^{-1} x - \\ln(1 + x^2) + C$',
      '$\\frac{1}{1 + x^2} + C$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Set $u = \\tan^{-1} x$ and $dv = dx$. After applying $uv - \\int v\\,du$, integrate $\\int \\frac{x}{1+x^2}\\,dx = \\frac{1}{2}\\ln(1+x^2)$.',
    phases: [
      {
        title: 'Phase 1 · Assign u and dv',
        explanation: 'Take $u = \\tan^{-1} x$ (Inverse trig comes first in LIATE) and $dv = 1\\,dx$.',
        formula: 'du = \\frac{1}{1 + x^2}\\,dx, \\qquad v = x',
      },
      {
        title: 'Phase 2 · Integrate the resulting rational function',
        explanation: 'Use the $f\'/f$ pattern on $\\int \\frac{x}{1+x^2}\\,dx$ by inserting a factor of $2$.',
        formula:
          'x\\tan^{-1} x - \\frac{1}{2}\\int \\frac{2x}{1 + x^2}\\,dx = x\\tan^{-1} x - \\frac{1}{2}\\ln(1 + x^2) + C',
      },
    ],
  },

  // ======================== 3. PARTIAL FRACTIONS ========================
  {
    id: 'pf-1',
    topic: 'partial-fractions',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 3 · Completing the Square',
    prompt: 'Evaluate $$\\int \\frac{2x - 1}{x^2 - 6x + 13}\\,dx$$',
    options: [
      '$\\ln(x^2 - 6x + 13) + \\frac{1}{2}\\tan^{-1}\\left(\\frac{x - 3}{2}\\right) + C$',
      '$\\ln(x^2 - 6x + 13) - \\frac{5}{2}\\tan^{-1}\\left(\\frac{x - 3}{2}\\right) + C$',
      '$2\\ln(x^2 - 6x + 13) + \\frac{5}{4}\\tan^{-1}\\left(\\frac{x - 3}{2}\\right) + C$',
      '$\\ln(x^2 - 6x + 13) + \\frac{5}{2}\\tan^{-1}\\left(\\frac{x - 3}{2}\\right) + C$',
    ],
    correctIndex: 3,
    explanationSummary:
      'Rewrite the numerator as $(2x - 6) + 5$ to match the derivative of $x^2 - 6x + 13$, then complete the square in the denominator for the remaining constant term.',
    phases: [
      {
        title: 'Phase 1 · Split numerator using denominator derivative',
        explanation:
          'Since $\\frac{d}{dx}(x^2 - 6x + 13) = 2x - 6$, rewrite $2x - 1 = (2x - 6) + 5$ and split the fraction.',
        formula: '\\int \\frac{2x - 6}{x^2 - 6x + 13}\\,dx + 5\\int \\frac{1}{x^2 - 6x + 13}\\,dx',
      },
      {
        title: 'Phase 2 · Integrate the logarithmic part',
        explanation: 'The first integral is directly $\\int \\frac{f\'(x)}{f(x)}\\,dx$.',
        formula: '\\int \\frac{2x - 6}{x^2 - 6x + 13}\\,dx = \\ln(x^2 - 6x + 13)',
      },
      {
        title: 'Phase 3 · Complete the square for the second integral',
        explanation:
          'Write $x^2 - 6x + 13 = (x - 3)^2 + 4 = (x - 3)^2 + 2^2$ and integrate using $\\frac{1}{a}\\tan^{-1}(u/a)$.',
        formula:
          '5\\int \\frac{dx}{(x - 3)^2 + 2^2} = \\frac{5}{2}\\tan^{-1}\\left(\\frac{x - 3}{2}\\right)',
      },
      {
        title: 'Phase 4 · Combine terms',
        explanation: 'Add both results plus the constant of integration $C$.',
        formula: '\\ln(x^2 - 6x + 13) + \\frac{5}{2}\\tan^{-1}\\left(\\frac{x - 3}{2}\\right) + C',
      },
    ],
  },
  {
    id: 'pf-2',
    topic: 'partial-fractions',
    difficulty: 'Core',
    sourceRef: 'Lecture 3 · Distinct Linear Factors',
    prompt: 'Decompose and integrate: $$\\int \\frac{5x - 1}{x^2 - x - 2}\\,dx$$',
    options: [
      '$2\\ln|x - 2| + 3\\ln|x + 1| + C$',
      '$3\\ln|x - 2| + 2\\ln|x + 1| + C$',
      '$3\\ln|x - 2| - 2\\ln|x + 1| + C$',
      '$\\ln|x^2 - x - 2| + C$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Factor $x^2 - x - 2 = (x - 2)(x + 1)$ and solve $\\frac{5x - 1}{(x-2)(x+1)} = \\frac{A}{x-2} + \\frac{B}{x+1}$ to get $A = 3$ and $B = 2$.',
    phases: [
      {
        title: 'Phase 1 · Factor the denominator',
        explanation: 'Factor $x^2 - x - 2$ into distinct linear factors and set up partial fractions.',
        formula: '\\frac{5x - 1}{(x - 2)(x + 1)} = \\frac{A}{x - 2} + \\frac{B}{x + 1}',
      },
      {
        title: 'Phase 2 · Solve for A and B',
        explanation:
          'Multiply both sides by $(x - 2)(x + 1)$ to obtain $5x - 1 = A(x + 1) + B(x - 2)$. Substitute $x = 2$ and $x = -1$.',
        formula: 'x = 2 \\implies 9 = 3A \\implies A = 3; \\qquad x = -1 \\implies -6 = -3B \\implies B = 2',
      },
      {
        title: 'Phase 3 · Integrate term by term',
        explanation: 'Integrate each simple linear fraction.',
        formula: '\\int \\left(\\frac{3}{x - 2} + \\frac{2}{x + 1}\\right)\\,dx = 3\\ln|x - 2| + 2\\ln|x + 1| + C',
      },
    ],
  },
  {
    id: 'pf-3',
    topic: 'partial-fractions',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 3 · Repeated Linear Factors',
    prompt: 'Which partial fraction decomposition template is correct for $$\\frac{x^2 + 3}{(x - 1)(x + 2)^2}\\,?$$',
    options: [
      '$\\frac{A}{x - 1} + \\frac{Bx + C}{(x + 2)^2}$',
      '$\\frac{A}{x - 1} + \\frac{B}{x + 2} + \\frac{Cx + D}{(x + 2)^2}$',
      '$\\frac{A}{x - 1} + \\frac{B}{x + 2} + \\frac{C}{(x + 2)^2}$',
      '$\\frac{A}{x - 1} + \\frac{B}{(x + 2)^2}$',
    ],
    correctIndex: 2,
    explanationSummary:
      'A repeated linear factor $(x + 2)^2$ requires one constant-numerator term for every power from $1$ up to its multiplicity $2$.',
    phases: [
      {
        title: 'Phase 1 · Check fraction properness',
        explanation:
          'The numerator has degree $2$ while the denominator has degree $3$, so the rational expression is already proper.',
      },
      {
        title: 'Phase 2 · Assign terms by factor type',
        explanation:
          'The distinct linear factor $(x - 1)$ gets $\\frac{A}{x - 1}$, and the repeated linear factor $(x + 2)^2$ gets both $\\frac{B}{x + 2}$ and $\\frac{C}{(x + 2)^2}$.',
        formula: '\\frac{x^2 + 3}{(x - 1)(x + 2)^2} = \\frac{A}{x - 1} + \\frac{B}{x + 2} + \\frac{C}{(x + 2)^2}',
      },
    ],
  },
  {
    id: 'pf-4',
    topic: 'partial-fractions',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 3 · Improper Rational Function',
    prompt: 'Evaluate the improper rational integral $$\\int \\frac{x^2 + 1}{x - 1}\\,dx$$',
    options: [
      '$\\frac{x^2}{2} + x + 2\\ln|x - 1| + C$',
      '$\\frac{x^2}{2} - x + 2\\ln|x - 1| + C$',
      '$\\frac{x^2}{2} + x + \\ln|x - 1| + C$',
      '$x + 2\\ln|x - 1| + C$',
    ],
    correctIndex: 0,
    explanationSummary:
      'Because $\\deg(\\text{numerator}) \\ge \\deg(\\text{denominator})$, perform polynomial division first: $\\frac{x^2+1}{x-1} = x + 1 + \\frac{2}{x-1}$.',
    phases: [
      {
        title: 'Phase 1 · Perform polynomial long division',
        explanation: 'Divide $x^2 + 1$ by $x - 1$ (or write $x^2 + 1 = (x^2 - 1) + 2$).',
        formula: '\\frac{x^2 + 1}{x - 1} = \\frac{(x - 1)(x + 1) + 2}{x - 1} = x + 1 + \\frac{2}{x - 1}',
      },
      {
        title: 'Phase 2 · Integrate the quotient and remainder',
        explanation: 'Integrate each term cleanly.',
        formula: '\\int \\left(x + 1 + \\frac{2}{x - 1}\\right)\\,dx = \\frac{x^2}{2} + x + 2\\ln|x - 1| + C',
      },
    ],
  },

  // ======================== 4. SUBSTITUTION & TRIG SUB ========================
  {
    id: 'sub-1',
    topic: 'substitution',
    difficulty: 'Core',
    sourceRef: 'Lecture 4 · Algebraic Root Substitution',
    prompt: 'Evaluate $$\\int x\\sqrt{x + 2}\\,dx$$ using the substitution $u^2 = x + 2$.',
    options: [
      '$\\frac{2}{5}(x + 2)^{5/2} + \\frac{4}{3}(x + 2)^{3/2} + C$',
      '$\\frac{1}{5}(x + 2)^{5/2} - \\frac{2}{3}(x + 2)^{3/2} + C$',
      '$\\frac{2}{5}(x + 2)^{5/2} - \\frac{4}{3}(x + 2)^{3/2} + C$',
      '$\\frac{2}{3}(x + 2)^{3/2} - 2(x + 2)^{1/2} + C$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Setting $u^2 = x + 2$ gives $x = u^2 - 2$ and $dx = 2u\\,du$, eliminating the square root completely.',
    phases: [
      {
        title: 'Phase 1 · Express x and dx in terms of u',
        explanation: 'Let $u = \\sqrt{x + 2}$, so $u^2 = x + 2$.',
        formula: 'x = u^2 - 2, \\qquad dx = 2u\\,du',
      },
      {
        title: 'Phase 2 · Expand and integrate polynomial in u',
        explanation: 'Substitute into the integral and distribute $u^2$.',
        formula:
          '\\int (u^2 - 2)\\cdot u \\cdot 2u\\,du = 2\\int (u^4 - 2u^2)\\,du = \\frac{2}{5}u^5 - \\frac{4}{3}u^3 + C',
      },
      {
        title: 'Phase 3 · Back-substitute u = (x + 2)^{1/2}',
        explanation: 'Replace $u$ with $(x+2)^{1/2}$.',
        formula: '\\frac{2}{5}(x + 2)^{5/2} - \\frac{4}{3}(x + 2)^{3/2} + C',
      },
    ],
  },
  {
    id: 'sub-2',
    topic: 'substitution',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 4 · Trig Sub √(a² - x²)',
    prompt: 'For the integral $$\\int \\frac{\\sqrt{9 - x^2}}{x^2}\\,dx\\quad (0 < x < 3),$$ which trigonometric substitution and simplified result are correct?',
    options: [
      '$x = 3\\sec\\theta \\implies -\\frac{\\sqrt{9 - x^2}}{x} + \\sin^{-1}\\left(\\frac{x}{3}\\right) + C$',
      '$x = 3\\tan\\theta \\implies \\frac{\\sqrt{9 - x^2}}{x} - \\sin^{-1}\\left(\\frac{x}{3}\\right) + C$',
      '$x = 3\\sin\\theta \\implies \\frac{\\sqrt{9 - x^2}}{x} - \\sin^{-1}\\left(\\frac{x}{3}\\right) + C$',
      '$x = 3\\sin\\theta \\implies -\\frac{\\sqrt{9 - x^2}}{x} - \\sin^{-1}\\left(\\frac{x}{3}\\right) + C$',
    ],
    correctIndex: 3,
    explanationSummary:
      'For $\\sqrt{a^2 - x^2}$ with $a = 3$, use $x = 3\\sin\\theta$, which turns the integral into $\\int \\cot^2\\theta\\,d\\theta = -\\cot\\theta - \\theta + C$.',
    phases: [
      {
        title: 'Phase 1 · Substitute x = 3 sin θ',
        explanation: 'Since the radical has the form $\\sqrt{3^2 - x^2}$, choose $x = 3\\sin\\theta$ with $dx = 3\\cos\\theta\\,d\\theta$.',
        formula: '\\sqrt{9 - x^2} = 3\\cos\\theta \\implies \\int \\frac{3\\cos\\theta}{9\\sin^2\\theta}(3\\cos\\theta\\,d\\theta) = \\int \\cot^2\\theta\\,d\\theta',
      },
      {
        title: 'Phase 2 · Integrate cot² θ',
        explanation: 'Use $\\cot^2\\theta = \\csc^2\\theta - 1$.',
        formula: '\\int (\\csc^2\\theta - 1)\\,d\\theta = -\\cot\\theta - \\theta + C',
      },
      {
        title: 'Phase 3 · Convert back via the right triangle',
        explanation: 'From $\\sin\\theta = \\frac{x}{3}$, we have $\\cot\\theta = \\frac{\\sqrt{9 - x^2}}{x}$ and $\\theta = \\sin^{-1}(x/3)$.',
        formula: '-\\frac{\\sqrt{9 - x^2}}{x} - \\sin^{-1}\\left(\\frac{x}{3}\\right) + C',
      },
    ],
  },
  {
    id: 'sub-3',
    topic: 'substitution',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 4 · Trig Sub √(x² + a²)',
    prompt: 'Evaluate $$\\int \\frac{dx}{(x^2 + 4)^{3/2}}$$',
    options: [
      '$\\frac{x}{2\\sqrt{x^2 + 4}} + C$',
      '$\\frac{x}{4\\sqrt{x^2 + 4}} + C$',
      '$-\\frac{1}{2\\sqrt{x^2 + 4}} + C$',
      '$\\frac{1}{4}\\tan^{-1}\\left(\\frac{x}{2}\\right) + C$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Let $x = 2\\tan\\theta$ so $dx = 2\\sec^2\\theta\\,d\\theta$ and $(x^2+4)^{3/2} = 8\\sec^3\\theta$, simplifying the integral to $\\frac{1}{4}\\int \\cos\\theta\\,d\\theta = \\frac{1}{4}\\sin\\theta + C$.',
    phases: [
      {
        title: 'Phase 1 · Choose x = 2 tan θ',
        explanation: 'Because the expression involves $x^2 + 2^2$, substitute $x = 2\\tan\\theta$.',
        formula: 'dx = 2\\sec^2\\theta\\,d\\theta,\\qquad (x^2 + 4)^{3/2} = (4\\sec^2\\theta)^{3/2} = 8\\sec^3\\theta',
      },
      {
        title: 'Phase 2 · Simplify and integrate',
        explanation: 'Cancel $\\sec^2\\theta$ and use $\\frac{1}{\\sec\\theta} = \\cos\\theta$.',
        formula: '\\int \\frac{2\\sec^2\\theta}{8\\sec^3\\theta}\\,d\\theta = \\frac{1}{4}\\int \\cos\\theta\\,d\\theta = \\frac{1}{4}\\sin\\theta + C',
      },
      {
        title: 'Phase 3 · Back-substitute using the triangle',
        explanation: 'Since $\\tan\\theta = \\frac{x}{2}$, the hypotenuse is $\\sqrt{x^2 + 4}$ and $\\sin\\theta = \\frac{x}{\\sqrt{x^2+4}}$.',
        formula: '\\frac{x}{4\\sqrt{x^2 + 4}} + C',
      },
    ],
  },
  {
    id: 'sub-4',
    topic: 'substitution',
    difficulty: 'Core',
    sourceRef: 'Lecture 4 · Trig Sub √(x² - a²)',
    prompt: 'Which trigonometric substitution simplifies an integral containing $\\sqrt{x^2 - 16}$ (for $x > 4$)?',
    options: [
      '$x = 4\\sec\\theta$, using $\\sec^2\\theta - 1 = \\tan^2\\theta$',
      '$x = 4\\sin\\theta$, using $1 - \\sin^2\\theta = \\cos^2\\theta$',
      '$x = 4\\tan\\theta$, using $\\tan^2\\theta + 1 = \\sec^2\\theta$',
      '$x = 16\\sec\\theta$, using $\\sec^2\\theta - 1 = \\tan^2\\theta$',
    ],
    correctIndex: 0,
    explanationSummary:
      'For $\\sqrt{x^2 - a^2}$ with $a = 4$, setting $x = 4\\sec\\theta$ transforms the radical into $4\\tan\\theta$ via $\\sec^2\\theta - 1 = \\tan^2\\theta$.',
    phases: [
      {
        title: 'Phase 1 · Match the radical pattern',
        explanation: 'Compare $\\sqrt{x^2 - 16}$ against $\\sqrt{x^2 - a^2}$ to identify $a = 4$.',
      },
      {
        title: 'Phase 2 · Verify the Pythagorean identity',
        explanation: 'Substituting $x = 4\\sec\\theta$ gives $\\sqrt{16\\sec^2\\theta - 16} = 4\\sqrt{\\sec^2\\theta - 1} = 4\\tan\\theta$ (for $x > 4$, $0 < \\theta < \\pi/2$).',
        formula: 'x = 4\\sec\\theta \\implies \\sqrt{x^2 - 16} = 4\\tan\\theta',
      },
    ],
  },

  // ======================== 5. DEFINITE INTEGRALS, AREA & ARC LENGTH ========================
  {
    id: 'app-1',
    topic: 'definite-applications',
    difficulty: 'Core',
    sourceRef: 'Lecture 5 · Bounded Area (Diagram)',
    prompt: 'Find the area of the shaded region bounded by the parabola $y = x^2$, the $x$-axis ($y = 0$), and the vertical lines $x = 1$ and $x = 3$, as shown in the figure.',
    diagram: {
      src: './diagrams/area_parabola_x2.png',
      alt: 'Graph of y = x^2 with the region above the x-axis between x = 1 and x = 3 shaded.',
      caption: 'Lecture 5 · Region bounded by y = x², y = 0, x = 1, and x = 3',
    },
    options: [
      '$\\frac{28}{3}$',
      '$\\frac{26}{3}$',
      '$9$',
      '$\\frac{8}{3}$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Integrating $y = x^2$ with respect to $x$ from $1$ to $3$ gives $\\left[\\frac{x^3}{3}\\right]_1^3 = \\frac{27 - 1}{3} = \\frac{26}{3}$.',
    phases: [
      {
        title: 'Phase 1 · Set up the area integral from the diagram',
        explanation: 'From the figure, the region lies above $y = 0$ and below $y = x^2$ on the interval $1 \\le x \\le 3$.',
        formula: 'A = \\int_1^3 x^2\\,dx',
      },
      {
        title: 'Phase 2 · Evaluate the definite integral',
        explanation: 'Find the antiderivative $\\frac{x^3}{3}$ and apply the limits $x=3$ and $x=1$.',
        formula: 'A = \\left[\\frac{x^3}{3}\\right]_1^3 = \\frac{3^3}{3} - \\frac{1^3}{3} = 9 - \\frac{1}{3} = \\frac{26}{3}',
      },
    ],
  },
  {
    id: 'app-2',
    topic: 'definite-applications',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 5 · Area Along y-Axis (Diagram)',
    prompt: 'Find the area of the green shaded region bounded by the curve $y = \\tan^{-1} x$, the $y$-axis ($x = 0$), and the horizontal line $y = \\frac{\\pi}{4}$, as illustrated.',
    diagram: {
      src: './diagrams/area_arctan_y_axis.png',
      alt: 'Graph of y = arctan(x) with the region bounded by the y-axis, the curve, and y = pi/4 shaded in green.',
      caption: 'Lecture 5 · Region bounded by y = tan⁻¹(x), x = 0, and y = π/4',
    },
    options: [
      '$\\ln 2$',
      '$\\frac{\\pi}{4} - \\frac{1}{2}\\ln 2$',
      '$\\frac{1}{2}\\ln 2$',
      '$1 - \\frac{\\pi}{4}$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Invert the curve to $x = \\tan y$ and integrate horizontally with respect to $y$ from $0$ to $\\pi/4$: $\\int_0^{\\pi/4} \\tan y\\,dy = \\frac{1}{2}\\ln 2$.',
    phases: [
      {
        title: 'Phase 1 · Express x as a function of y',
        explanation:
          'Because the shaded region touches the $y$-axis from $y = 0$ up to $y = \\frac{\\pi}{4}$, using horizontal strips ($dy$) is cleanest. Solve $y = \\tan^{-1} x$ for $x$.',
        formula: 'x = \\tan y, \\qquad 0 \\le y \\le \\frac{\\pi}{4}',
      },
      {
        title: 'Phase 2 · Set up and integrate ∫ tan(y) dy',
        explanation: 'Write $\\tan y = \\frac{\\sin y}{\\cos y}$ and integrate.',
        formula: 'A = \\int_0^{\\pi/4} \\tan y\\,dy = \\Big[-\\ln|\\cos y|\\Big]_0^{\\pi/4}',
      },
      {
        title: 'Phase 3 · Simplify the logarithmic result',
        explanation: 'Substitute $\\cos(\\pi/4) = \\frac{1}{\\sqrt{2}} = 2^{-1/2}$ and $\\cos(0) = 1$.',
        formula: 'A = -\\ln\\left(2^{-1/2}\\right) - (-\\ln 1) = \\frac{1}{2}\\ln 2',
      },
    ],
  },
  {
    id: 'app-3',
    topic: 'definite-applications',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 5 · Arc Length in x (Diagram)',
    prompt: 'Calculate the arc length $L$ of the red curve segment $y = \\ln(\\cos x)$ from $x = 0$ to $x = \\frac{\\pi}{4}$, shown in the figure.',
    diagram: {
      src: './diagrams/arc_ln_cosx.png',
      alt: 'Graph of y = ln(cos x) highlighting the red arc between (0,0) and x = pi/4.',
      caption: 'Lecture 5 · Arc length of y = ln(cos x) on [0, π/4]',
    },
    options: [
      '$\\ln(\\sqrt{2} + 1)$',
      '$\\ln(\\sqrt{2} - 1)$',
      '$\\sqrt{2} - 1$',
      '$\\frac{1}{2}\\ln(\\sqrt{2} + 1)$',
    ],
    correctIndex: 0,
    explanationSummary:
      'With $y\' = -\\tan x$, $\\sqrt{1 + (y\')^2} = \\sec x$ on $[0, \\pi/4]$, and $\\int_0^{\\pi/4} \\sec x\\,dx = \\ln(\\sqrt{2} + 1)$.',
    phases: [
      {
        title: 'Phase 1 · Differentiate y = ln(cos x)',
        explanation: 'Apply the chain rule to compute $y\' = \\frac{dy}{dx}$.',
        formula: 'y\' = \\frac{-\\sin x}{\\cos x} = -\\tan x',
      },
      {
        title: 'Phase 2 · Simplify the arc length radical',
        explanation: 'Use $1 + \\tan^2 x = \\sec^2 x$. On $[0, \\pi/4]$, $\\sec x > 0$.',
        formula: '\\sqrt{1 + (y\')^2} = \\sqrt{1 + \\tan^2 x} = \\sqrt{\\sec^2 x} = \\sec x',
      },
      {
        title: 'Phase 3 · Evaluate the definite integral',
        explanation: 'Recall $\\int \\sec x\\,dx = \\ln|\\sec x + \\tan x| + C$, and plug in $\\sec(\\pi/4)=\\sqrt{2}, \\tan(\\pi/4)=1$.',
        formula: 'L = \\int_0^{\\pi/4} \\sec x\\,dx = \\Big[\\ln|\\sec x + \\tan x|\\Big]_0^{\\pi/4} = \\ln(\\sqrt{2} + 1) - \\ln(1) = \\ln(\\sqrt{2} + 1)',
      },
    ],
  },
  {
    id: 'app-4',
    topic: 'definite-applications',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 5 · Arc Length in y (Diagram)',
    prompt: 'Find the arc length $L$ of the curve $x = \\frac{2}{3} y^{3/2}$ from $y = 0$ to $y = 1$, as shown in the diagram.',
    diagram: {
      src: './diagrams/arc_x_2y32.png',
      alt: 'Curve x = (2/3)y^(3/2) plotted between y = 0 and y = 1.',
      caption: 'Lecture 5 · Arc length of x = (2/3)y^(3/2) from y = 0 to y = 1',
    },
    options: [
      '$\\frac{2}{3}(2\\sqrt{2} + 1)$',
      '$2\\sqrt{2} - 1$',
      '$\\frac{4}{3}(\\sqrt{2} - 1)$',
      '$\\frac{2}{3}(2\\sqrt{2} - 1)$',
    ],
    correctIndex: 3,
    explanationSummary:
      'Since $x$ is given as a function of $y$, $\\frac{dx}{dy} = y^{1/2}$ gives $L = \\int_0^1 \\sqrt{1 + y}\\,dy = \\frac{2}{3}(2\\sqrt{2} - 1)$.',
    phases: [
      {
        title: 'Phase 1 · Compute dx/dy',
        explanation: 'Differentiate $x = \\frac{2}{3} y^{3/2}$ with respect to $y$.',
        formula: '\\frac{dx}{dy} = \\frac{2}{3}\\cdot\\frac{3}{2}y^{1/2} = \\sqrt{y}',
      },
      {
        title: 'Phase 2 · Set up the arc length integral in y',
        explanation: 'Square the derivative to simplify $\\sqrt{1 + (dx/dy)^2}$.',
        formula: 'L = \\int_0^1 \\sqrt{1 + (\\sqrt{y})^2}\\,dy = \\int_0^1 (1 + y)^{1/2}\\,dy',
      },
      {
        title: 'Phase 3 · Evaluate at y = 1 and y = 0',
        explanation: 'Integrate $(1+y)^{1/2}$ to $\\frac{2}{3}(1+y)^{3/2}$ and evaluate.',
        formula: 'L = \\left[\\frac{2}{3}(1 + y)^{3/2}\\right]_0^1 = \\frac{2}{3}\\left(2^{3/2} - 1^{3/2}\\right) = \\frac{2}{3}(2\\sqrt{2} - 1)',
      },
    ],
  },
  {
    id: 'app-5',
    topic: 'definite-applications',
    difficulty: 'Core',
    sourceRef: 'Lecture 5 · Even & Odd Symmetry',
    prompt: 'Using symmetry properties on a symmetric interval, evaluate $$\\int_{-\\pi/3}^{\\pi/3} \\left(x^3 \\cos x + \\sin^5 x + 4\\right)\\,dx$$',
    options: [
      '$0$',
      '$\\frac{4\\pi}{3}$',
      '$\\frac{8\\pi}{3}$',
      '$\\frac{8\\pi}{3} + 2$',
    ],
    correctIndex: 2,
    explanationSummary:
      '$x^3 \\cos x$ and $\\sin^5 x$ are both odd functions, so their integrals over $[-\\pi/3, \\pi/3]$ vanish, leaving $\\int_{-\\pi/3}^{\\pi/3} 4\\,dx = \\frac{8\\pi}{3}$.',
    phases: [
      {
        title: 'Phase 1 · Classify each term as even or odd',
        explanation:
          'Check $f(-x)$: $(-x)^3\\cos(-x) = -x^3\\cos x$ (odd), $\\sin^5(-x) = -\\sin^5 x$ (odd), and $4$ is constant (even).',
        formula: '\\int_{-a}^a \\text{odd}(x)\\,dx = 0, \\qquad \\int_{-a}^a \\text{even}(x)\\,dx = 2\\int_0^a \\text{even}(x)\\,dx',
      },
      {
        title: 'Phase 2 · Evaluate the remaining even integral',
        explanation: 'Only the constant term $4$ contributes.',
        formula: '2\\int_0^{\\pi/3} 4\\,dx = 8 \\cdot \\frac{\\pi}{3} = \\frac{8\\pi}{3}',
      },
    ],
  },
  {
    id: 'app-6',
    topic: 'definite-applications',
    difficulty: 'Challenge',
    sourceRef: 'Lecture 5 · Recovering Curve from Arc Length',
    prompt: 'The arc length of a smooth curve passing through $(1, 2)$ is given by $L = \\int_1^4 \\sqrt{1 + 9x}\\,dx$. What is the equation of the curve $y(x)$ (with $y\' > 0$)?',
    options: [
      '$y = \\frac{2}{3}x^{3/2} + \\frac{4}{3}$',
      '$y = 2x^{3/2}$',
      '$y = 3x^{3/2} - 1$',
      '$y = 2x^{3/2} + 2$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Matching $\\sqrt{1 + (y\')^2} = \\sqrt{1 + 9x}$ gives $y\' = 3\\sqrt{x}$. Integrating and applying $y(1) = 2$ yields $y = 2x^{3/2}$.',
    phases: [
      {
        title: 'Phase 1 · Extract y\'(x) from the arc length integrand',
        explanation: 'Equate $1 + (y\')^2 = 1 + 9x$. Since $y\' > 0$, take the positive square root.',
        formula: '(y\')^2 = 9x \\implies y\' = 3x^{1/2}',
      },
      {
        title: 'Phase 2 · Integrate and use the point (1, 2)',
        explanation: 'Integrate $y\' = 3x^{1/2}$ and solve for $C$ using $y(1) = 2$.',
        formula: 'y = 3\\cdot\\frac{2}{3}x^{3/2} + C = 2x^{3/2} + C; \\qquad 2 = 2(1)^{3/2} + C \\implies C = 0 \\implies y = 2x^{3/2}',
      },
    ],
  },

  // ======================== 6. DOUBLE INTEGRALS ========================
  {
    id: 'dbl-1',
    topic: 'double-integrals',
    difficulty: 'Core',
    sourceRef: 'Lecture 6 · Rectangular Region (Diagram)',
    prompt: 'Evaluate the double integral $$\\iint_D (x + 2y)\\,dA$$ over the rectangular region $D$ shown in the figure.',
    diagram: {
      src: './diagrams/double_rect_D.png',
      alt: 'Rectangular region D bounded by x = 0, x = 2, y = 0, and y = 4.',
      caption: 'Lecture 6 · Rectangular region D: 0 ≤ x ≤ 2, 0 ≤ y ≤ 4',
    },
    options: [
      '$24$',
      '$32$',
      '$48$',
      '$40$',
    ],
    correctIndex: 3,
    explanationSummary:
      'Integrating over $0 \\le x \\le 2$ and $0 \\le y \\le 4$: $\\int_0^2 \\int_0^4 (x + 2y)\\,dy\\,dx = \\int_0^2 (4x + 16)\\,dx = 40$.',
    phases: [
      {
        title: 'Phase 1 · Read limits of D from the diagram',
        explanation: 'The rectangle spans $0 \\le x \\le 2$ and $0 \\le y \\le 4$.',
        formula: '\\iint_D (x + 2y)\\,dA = \\int_0^2 \\int_0^4 (x + 2y)\\,dy\\,dx',
      },
      {
        title: 'Phase 2 · Evaluate the inner integral in y',
        explanation: 'Treat $x$ as constant while integrating with respect to $y$ from $0$ to $4$.',
        formula: '\\int_0^4 (x + 2y)\\,dy = \\Big[xy + y^2\\Big]_0^4 = 4x + 16',
      },
      {
        title: 'Phase 3 · Evaluate the outer integral in x',
        explanation: 'Integrate $4x + 16$ from $x = 0$ to $x = 2$.',
        formula: '\\int_0^2 (4x + 16)\\,dx = \\Big[2x^2 + 16x\\Big]_0^2 = 8 + 32 = 40',
      },
    ],
  },
  {
    id: 'dbl-2',
    topic: 'double-integrals',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 6 · Triangular Region (Diagram)',
    prompt: 'Compute $$\\iint_D (x + y)\\,dA$$ over the triangular region $D$ bounded by $y = 0$, $y = x$, and $x = 2$, shown in the figure.',
    diagram: {
      src: './diagrams/double_tri_yx.png',
      alt: 'Triangular region D bounded by y = 0, y = x, and x = 2 with top vertex (2,2).',
      caption: 'Lecture 6 · Triangular region D bounded by y = 0, y = x, and x = 2',
    },
    options: [
      '$4$',
      '$2$',
      '$\\frac{8}{3}$',
      '$6$',
    ],
    correctIndex: 0,
    explanationSummary:
      'Using vertical strips ($0 \\le x \\le 2$, $0 \\le y \\le x$), the inner integral yields $\\frac{3}{2}x^2$, and $\\int_0^2 \\frac{3}{2}x^2\\,dx = 4$.',
    phases: [
      {
        title: 'Phase 1 · Set up vertical-strip limits',
        explanation: 'For each $x \\in [0, 2]$, $y$ runs from the bottom boundary $y = 0$ to the top line $y = x$.',
        formula: '\\iint_D (x + y)\\,dA = \\int_0^2 \\int_0^x (x + y)\\,dy\\,dx',
      },
      {
        title: 'Phase 2 · Integrate with respect to y',
        explanation: 'Evaluate $[xy + \\frac{1}{2}y^2]_0^x$.',
        formula: '\\int_0^x (x + y)\\,dy = x^2 + \\frac{1}{2}x^2 = \\frac{3}{2}x^2',
      },
      {
        title: 'Phase 3 · Integrate with respect to x',
        explanation: 'Integrate $\\frac{3}{2}x^2$ from $0$ to $2$.',
        formula: '\\int_0^2 \\frac{3}{2}x^2\\,dx = \\left[\\frac{x^3}{2}\\right]_0^2 = 4',
      },
    ],
  },
  {
    id: 'dbl-3',
    topic: 'double-integrals',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 6 · Choosing Integration Order (Diagram)',
    prompt: 'For the triangular region $D$ bounded by $y = 0$, $y = x$, and $3x + 2y = 10$ (meeting at $(2,2)$), which single iterated integral represents $\\iint_D f(x,y)\\,dA$ without splitting into two integrals?',
    diagram: {
      src: './diagrams/double_tri_3x2y10.png',
      alt: 'Triangle D bounded by y = 0, y = x, and 3x + 2y = 10 with apex at (2,2) and x-intercept at 10/3.',
      caption: 'Lecture 6 · Region D bounded by y = 0, y = x, and 3x + 2y = 10',
    },
    options: [
      '$\\int_0^{10/3} \\int_y^{(10 - 2y)/3} f(x,y)\\,dx\\,dy$',
      '$\\int_0^2 \\int_x^{(10 - 3x)/2} f(x,y)\\,dy\\,dx$',
      '$\\int_0^2 \\int_y^{(10 - 2y)/3} f(x,y)\\,dx\\,dy$',
      '$\\int_0^2 \\int_0^{(10 - 2y)/3} f(x,y)\\,dx\\,dy$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Vertical strips ($dy\\,dx$) require splitting at $x=2$, whereas horizontal strips ($dx\\,dy$) cover $D$ in one integral from $x=y$ to $x=(10-2y)/3$ for $0 \\le y \\le 2$.',
    phases: [
      {
        title: 'Phase 1 · Compare dy dx vs dx dy',
        explanation:
          'Along $x$, the upper boundary changes from $y = x$ (for $0 \\le x \\le 2$) to $3x + 2y = 10$ (for $2 \\le x \\le 10/3$). Along $y$, however, the left boundary is always $x = y$ and the right boundary is always $3x + 2y = 10$.',
      },
      {
        title: 'Phase 2 · Solve boundaries for x and find y-range',
        explanation:
          'From $y = 0$ up to the apex $(2, 2)$, $y$ ranges from $0$ to $2$, and $x$ runs from $y$ to $\\frac{10 - 2y}{3}$.',
        formula: '\\iint_D f(x,y)\\,dA = \\int_0^2 \\int_y^{(10 - 2y)/3} f(x,y)\\,dx\\,dy',
      },
    ],
  },
  {
    id: 'dbl-4',
    topic: 'double-integrals',
    difficulty: 'Challenge',
    sourceRef: 'Lecture 6 · Split Square Region (Diagram)',
    prompt: 'Let $D$ be the region inside the unit square $[0,1]\\times[0,1]$ lying above the line $x + y = \\frac{1}{2}$ (so $x + y \\ge \\frac{1}{2}$), as illustrated. Evaluate $$\\iint_D xy\\,dA$$',
    diagram: {
      src: './diagrams/double_square_cut.png',
      alt: 'Unit square [0,1]x[0,1] cut by the line x + y = 1/2.',
      caption: 'Lecture 6 · Unit square cut by x + y = 1/2 (region D above the diagonal)',
    },
    options: [
      '$\\frac{1}{4}$',
      '$\\frac{95}{384}$',
      '$\\frac{23}{384}$',
      '$\\frac{71}{384}$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Using $\\iint_D xy\\,dA = \\iint_{[0,1]^2} xy\\,dA - \\iint_{T} xy\\,dA$ (or splitting $I_1 + I_2$) yields $\\frac{1}{4} - \\frac{1}{384} = \\frac{95}{384}$.',
    phases: [
      {
        title: 'Phase 1 · Split D into vertical regions I₁ and I₂ (or use complement)',
        explanation:
          'Splitting at $x = \\frac{1}{2}$ gives $I_1$ ($0 \\le x \\le \\frac{1}{2}$, $\\frac{1}{2}-x \\le y \\le 1$) and $I_2$ ($\\frac{1}{2} \\le x \\le 1$, $0 \\le y \\le 1$). Equivalently, subtract the lower-left corner triangle $T$ from the unit square.',
        formula: '\\iint_{[0,1]^2} xy\\,dA = \\left(\\int_0^1 x\\,dx\\right)\\left(\\int_0^1 y\\,dy\\right) = \\frac{1}{2}\\cdot\\frac{1}{2} = \\frac{1}{4}',
      },
      {
        title: 'Phase 2 · Integrate over the cut-off corner triangle T',
        explanation: 'On $T$, $0 \\le x \\le \\frac{1}{2}$ and $0 \\le y \\le \\frac{1}{2} - x$.',
        formula:
          '\\int_0^{1/2} x\\left(\\int_0^{1/2 - x} y\\,dy\\right)dx = \\frac{1}{2}\\int_0^{1/2} x\\left(\\frac{1}{4} - x + x^2\\right)dx = \\frac{1}{2}\\left[\\frac{x^2}{8} - \\frac{x^3}{3} + \\frac{x^4}{4}\\right]_0^{1/2} = \\frac{1}{384}',
      },
      {
        title: 'Phase 3 · Subtract to obtain the integral over D',
        explanation: 'Compute $\\frac{1}{4} - \\frac{1}{384}$.',
        formula: '\\iint_D xy\\,dA = \\frac{96}{384} - \\frac{1}{384} = \\frac{95}{384}',
      },
    ],
  },
  {
    id: 'dbl-5',
    topic: 'double-integrals',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 6 · Parabola & Line Region (Diagram)',
    prompt: 'Using double integration ($\\iint_D 1\\,dA$), find the area of the region $D$ bounded by $x = 0$, $y = x$, and $y = x^2 - 2$ in the right half-plane ($x \\ge 0$), as shown.',
    diagram: {
      src: './diagrams/double_parabola_line.png',
      alt: 'Region D bounded on the left by x = 0, above by y = x, and below by y = x^2 - 2.',
      caption: 'Lecture 6 · Region D bounded by x = 0, y = x, and y = x² − 2 (x ≥ 0)',
    },
    options: [
      '$\\frac{8}{3}$',
      '$\\frac{14}{3}$',
      '$4$',
      '$\\frac{10}{3}$',
    ],
    correctIndex: 3,
    explanationSummary:
      'Setting $x^2 - 2 = x$ gives the right intersection at $x = 2$. Integrating $1$ from $y = x^2 - 2$ to $y = x$ over $0 \\le x \\le 2$ gives $\\frac{10}{3}$.',
    phases: [
      {
        title: 'Phase 1 · Find the intersection point for x ≥ 0',
        explanation: 'Solve $x^2 - 2 = x$, i.e., $x^2 - x - 2 = (x - 2)(x + 1) = 0$. Since $x \\ge 0$, the intersection is at $(2, 2)$.',
        formula: '0 \\le x \\le 2, \\qquad x^2 - 2 \\le y \\le x',
      },
      {
        title: 'Phase 2 · Set up and evaluate the double integral',
        explanation: 'Integrate $1\\,dy$ first, then integrate with respect to $x$.',
        formula:
          'A = \\int_0^2 \\int_{x^2 - 2}^x 1\\,dy\\,dx = \\int_0^2 (x - x^2 + 2)\\,dx = \\left[\\frac{x^2}{2} - \\frac{x^3}{3} + 2x\\right]_0^2 = 2 - \\frac{8}{3} + 4 = \\frac{10}{3}',
      },
    ],
  },

  // ======================== 7. ODE FOUNDATIONS ========================
  {
    id: 'ode-1',
    topic: 'ode-foundations',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 7 · Copper Rod Heat Flow (Diagram)',
    prompt: 'Steady-state temperature $T(x)$ along a $1\\text{ m}$ copper rod satisfies $\\frac{d^2 T}{dx^2} = 0$ with boundary conditions $T(0) = 100$ and $T(1) = 2$, as shown. Find the temperature profile $T(x)$.',
    diagram: {
      src: './diagrams/ode_copper_rod.png',
      alt: '1-meter copper rod showing heat flow from T(0) = 100 at x = 0 to T(1) = 2 at x = 1.',
      caption: 'Lecture 7 · 1 m copper rod with boundary temperatures T(0) = 100 and T(1) = 2',
    },
    options: [
      '$T(x) = 100 + 98x$',
      '$T(x) = 2 + 98x$',
      '$T(x) = 100 - 98x$',
      '$T(x) = 100e^{-98x}$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Integrating $\\frac{d^2T}{dx^2} = 0$ twice yields $T(x) = C_1 x + C_2$. Applying $T(0) = 100$ and $T(1) = 2$ gives $C_2 = 100$ and $C_1 = -98$.',
    phases: [
      {
        title: 'Phase 1 · Integrate twice to find the general solution',
        explanation: 'Integrate $\\frac{d^2 T}{dx^2} = 0$ once to get a constant slope $C_1$, then integrate again.',
        formula: '\\frac{dT}{dx} = C_1 \\implies T(x) = C_1 x + C_2',
      },
      {
        title: 'Phase 2 · Apply boundary conditions T(0) = 100 and T(1) = 2',
        explanation: 'Plug in $x = 0$ first to find $C_2$, then plug in $x = 1$ to solve for $C_1$.',
        formula: 'T(0) = C_2 = 100; \\qquad T(1) = C_1(1) + 100 = 2 \\implies C_1 = -98',
      },
      {
        title: 'Phase 3 · Write the particular temperature profile',
        explanation: 'Substitute $C_1$ and $C_2$ back into $T(x)$.',
        formula: 'T(x) = 100 - 98x',
      },
    ],
  },
  {
    id: 'ode-2',
    topic: 'ode-foundations',
    difficulty: 'Core',
    sourceRef: 'Math 3 Lec 1 · Order and Degree',
    prompt: 'Determine the order and degree of the differential equation $$\\left(\\frac{d^3 y}{dx^3}\\right)^2 + \\left(\\frac{dy}{dx}\\right)^4 + y = \\sin x$$',
    options: [
      'Order $2$, Degree $3$',
      'Order $3$, Degree $2$',
      'Order $3$, Degree $4$',
      'Order $4$, Degree $3$',
    ],
    correctIndex: 1,
    explanationSummary:
      'The highest derivative present is $d^3 y/dx^3$ (Order $3$), and its exponent in polynomial form is $2$ (Degree $2$).',
    phases: [
      {
        title: 'Phase 1 · Identify the order',
        explanation:
          'The order is the order of the highest derivative appearing in the equation. Here, $y\'\'\' = \\frac{d^3y}{dx^3}$ is higher than $y\'$.',
        formula: '\\text{Order} = 3',
      },
      {
        title: 'Phase 2 · Identify the degree',
        explanation:
          'The equation is already a polynomial in derivatives (no fractional powers or roots of derivatives). The highest-order derivative $\\frac{d^3 y}{dx^3}$ is raised to power $2$ (ignore the $4$ on the lower-order $dy/dx$).',
        formula: '\\text{Degree} = 2',
      },
    ],
  },
  {
    id: 'ode-3',
    topic: 'ode-foundations',
    difficulty: 'Intermediate',
    sourceRef: 'Math 3 Lec 1 · Degree with Radicals',
    prompt: 'What are the order and degree of $$\\frac{d^2 y}{dx^2} = \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^3}\\,?$$',
    options: [
      'Order $2$, Degree $1$',
      'Order $2$, Degree $3$',
      'Order $3$, Degree $2$',
      'Order $2$, Degree $2$',
    ],
    correctIndex: 3,
    explanationSummary:
      'Squaring both sides clears the radical to produce $(y\'\')^2 = 1 + (y\')^3$, which has order $2$ and degree $2$.',
    phases: [
      {
        title: 'Phase 1 · Clear fractional powers/radicals from derivatives',
        explanation: 'Before reading the degree, derivatives must be free of radicals. Square both sides.',
        formula: '\\left(\\frac{d^2 y}{dx^2}\\right)^2 = 1 + \\left(\\frac{dy}{dx}\\right)^3',
      },
      {
        title: 'Phase 2 · Read order and degree',
        explanation: 'The highest derivative is $\\frac{d^2y}{dx^2}$ (order $2$), and its exponent is $2$ (degree $2$).',
        formula: '\\text{Order} = 2, \\quad \\text{Degree} = 2',
      },
    ],
  },
  {
    id: 'ode-4',
    topic: 'ode-foundations',
    difficulty: 'Intermediate',
    sourceRef: 'Math 3 Lec 1 · Eliminating Arbitrary Constants',
    prompt: 'Form the differential equation by eliminating the arbitrary constants $A$ and $B$ from $$y = A\\cos(3x) + B\\sin(3x)$$',
    options: [
      '$y\'\' + 9y = 0$',
      '$y\'\' - 9y = 0$',
      '$y\'\' + 3y = 0$',
      '$y\' + 9y = 0$',
    ],
    correctIndex: 0,
    explanationSummary:
      'With $2$ arbitrary constants, differentiate twice: $y\'\' = -9A\\cos(3x) - 9B\\sin(3x) = -9y$, so $y\'\' + 9y = 0$.',
    phases: [
      {
        title: 'Phase 1 · Compute the first and second derivatives',
        explanation: 'Two independent constants require a second-order ODE.',
        formula: 'y\' = -3A\\sin(3x) + 3B\\cos(3x) \\implies y\'\' = -9A\\cos(3x) - 9B\\sin(3x)',
      },
      {
        title: 'Phase 2 · Eliminate A and B',
        explanation: 'Factor out $-9$ from $y\'\'$ to recognize the original function $y$.',
        formula: 'y\'\' = -9\\big(A\\cos(3x) + B\\sin(3x)\\big) = -9y \\implies y\'\' + 9y = 0',
      },
    ],
  },
  {
    id: 'ode-5',
    topic: 'ode-foundations',
    difficulty: 'Core',
    sourceRef: 'Math 3 Lec 1 · ODE vs PDE & Solution Check',
    prompt: 'For what value(s) of $m$ is $y = e^{mx}$ a solution of the ODE $y\'\' - 5y\' + 6y = 0$?',
    options: [
      '$m = -2$ or $m = -3$',
      '$m = 1$ or $m = 6$',
      '$m = 2$ or $m = 3$',
      '$m = -1$ or $m = 6$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Substituting $y = e^{mx}$, $y\' = me^{mx}$, and $y\'\' = m^2e^{mx}$ yields $(m^2 - 5m + 6)e^{mx} = 0$, giving $m = 2, 3$.',
    phases: [
      {
        title: 'Phase 1 · Differentiate y = e^(mx)',
        explanation: 'Compute $y\'$ and $y\'\'$ and substitute into the ODE.',
        formula: '(m^2 - 5m + 6)e^{mx} = 0',
      },
      {
        title: 'Phase 2 · Solve the characteristic quadratic',
        explanation: 'Since $e^{mx} \\ne 0$, set the quadratic factor to zero and factor.',
        formula: '(m - 2)(m - 3) = 0 \\implies m = 2 \\text{ or } m = 3',
      },
    ],
  },

  // ======================== 8. FIRST-ORDER ODES ========================
  {
    id: 'fo-1',
    topic: 'first-order-odes',
    difficulty: 'Core',
    sourceRef: 'Lecture 7 · Separable ODE',
    prompt: 'Solve the separable differential equation $$\\frac{dy}{dx} = \\frac{x^2}{y^4 + 1}$$',
    options: [
      '$\\frac{y^4}{4} + y = \\frac{x^3}{3} + C$',
      '$\\frac{y^5}{5} + y = \\frac{x^3}{3} + C$',
      '$\\frac{y^5}{5} + 1 = \\frac{x^3}{3} + C$',
      '$y^5 + y = x^3 + C$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Separating variables gives $(y^4 + 1)\\,dy = x^2\\,dx$; integrating term-by-term yields $\\frac{y^5}{5} + y = \\frac{x^3}{3} + C$.',
    phases: [
      {
        title: 'Phase 1 · Separate the variables',
        explanation: 'Multiply both sides by $(y^4 + 1)\\,dx$.',
        formula: '(y^4 + 1)\\,dy = x^2\\,dx',
      },
      {
        title: 'Phase 2 · Integrate both sides carefully',
        explanation: 'Apply the power rule to $y^4$ (giving $\\frac{y^5}{5}$) and $x^2$ (giving $\\frac{x^3}{3}$).',
        formula: '\\int (y^4 + 1)\\,dy = \\int x^2\\,dx \\implies \\frac{y^5}{5} + y = \\frac{x^3}{3} + C',
      },
    ],
  },
  {
    id: 'fo-2',
    topic: 'first-order-odes',
    difficulty: 'Intermediate',
    sourceRef: 'Math 3 Lec 2 · Special Substitution y\' = f(ax+by+c)',
    prompt: 'Solve the differential equation $$\\frac{dy}{dx} = (x + y)^2$$ using $z = x + y$.',
    options: [
      '$\\tan(x + y) = x + C$',
      '$\\ln|1 + (x + y)^2| = 2x + C$',
      '$-\\frac{1}{x + y} = x + C$',
      '$\\tan^{-1}(x + y) = x + C$',
    ],
    correctIndex: 3,
    explanationSummary:
      'With $z = x + y$, $\\frac{dz}{dx} = 1 + \\frac{dy}{dx} = 1 + z^2$, which separates to $\\int \\frac{dz}{1+z^2} = \\int dx$, giving $\\tan^{-1}(x+y) = x + C$.',
    phases: [
      {
        title: 'Phase 1 · Differentiate z = x + y',
        explanation: 'Find $\\frac{dz}{dx}$ and substitute $\\frac{dy}{dx} = z^2$.',
        formula: '\\frac{dz}{dx} = 1 + \\frac{dy}{dx} = 1 + z^2',
      },
      {
        title: 'Phase 2 · Separate variables and integrate',
        explanation: 'Divide by $1 + z^2$ and integrate both sides.',
        formula: '\\int \\frac{dz}{1 + z^2} = \\int dx \\implies \\tan^{-1}(z) = x + C \\implies \\tan^{-1}(x + y) = x + C',
      },
    ],
  },
  {
    id: 'fo-3',
    topic: 'first-order-odes',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 7 & Lec 2 · Homogeneous ODE',
    prompt: 'Using the homogeneous substitution $y = vx$, solve $$x\\frac{dy}{dx} = y + x e^{y/x}$$ (for $x > 0$).',
    options: [
      '$e^{y/x} = \\ln x + C$',
      '$e^{-y/x} = \\ln x + C$',
      '$-e^{-y/x} = \\ln x + C$',
      '$y = x\\ln(\\ln x + C)$',
    ],
    correctIndex: 2,
    explanationSummary:
      'Dividing by $x$ gives $y\' = \\frac{y}{x} + e^{y/x}$. Substituting $y = vx$ reduces the equation to $x\\frac{dv}{dx} = e^v$, whose integral is $-e^{-y/x} = \\ln x + C$.',
    phases: [
      {
        title: 'Phase 1 · Rewrite in terms of y/x and substitute y = vx',
        explanation: 'Divide by $x$ and replace $y/x = v$ and $\\frac{dy}{dx} = v + x\\frac{dv}{dx}$.',
        formula: 'v + x\\frac{dv}{dx} = v + e^v \\implies x\\frac{dv}{dx} = e^v',
      },
      {
        title: 'Phase 2 · Separate variables and back-substitute',
        explanation: 'Move $e^v$ to the left and $dx/x$ to the right, integrate, then replace $v = y/x$.',
        formula: '\\int e^{-v}\\,dv = \\int \\frac{dx}{x} \\implies -e^{-v} = \\ln x + C \\implies -e^{-y/x} = \\ln x + C',
      },
    ],
  },
  {
    id: 'fo-4',
    topic: 'first-order-odes',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 8 & Lec 4 · Exact ODE',
    prompt: 'Verify exactness and find the general solution of $$(x^2 + y^2)\\,dx + 2xy\\,dy = 0$$',
    options: [
      '$\\frac{x^3}{3} + xy^2 = C$',
      '$\\frac{x^3}{3} + 2xy^2 = C$',
      '$x^2y + \\frac{y^3}{3} = C$',
      '$\\frac{x^3}{3} + x^2y = C$',
    ],
    correctIndex: 0,
    explanationSummary:
      'Here $M_y = 2y = N_x$, confirming exactness. Integrating $M$ in $x$ and matching $\\partial f/\\partial y = 2xy$ yields $f(x,y) = \\frac{x^3}{3} + xy^2 = C$.',
    phases: [
      {
        title: 'Phase 1 · Check the exactness condition M_y = N_x',
        explanation: 'Identify $M(x,y) = x^2 + y^2$ and $N(x,y) = 2xy$.',
        formula: '\\frac{\\partial M}{\\partial y} = 2y, \\qquad \\frac{\\partial N}{\\partial x} = 2y \\implies \\text{Exact!}',
      },
      {
        title: 'Phase 2 · Integrate M with respect to x',
        explanation: 'Find $f(x,y) = \\int M\\,dx + g(y)$.',
        formula: 'f(x,y) = \\int (x^2 + y^2)\\,dx = \\frac{x^3}{3} + xy^2 + g(y)',
      },
      {
        title: 'Phase 3 · Match ∂f/∂y to N(x,y)',
        explanation: 'Differentiate $f$ in $y$ and compare to $N = 2xy$.',
        formula: '\\frac{\\partial f}{\\partial y} = 2xy + g\'(y) = 2xy \\implies g\'(y) = 0 \\implies \\frac{x^3}{3} + xy^2 = C',
      },
    ],
  },
  {
    id: 'fo-5',
    topic: 'first-order-odes',
    difficulty: 'Intermediate',
    sourceRef: 'Lecture 9 · Linear First-Order ODE',
    prompt: 'Find the general solution of the linear differential equation $$\\frac{dy}{dx} + \\frac{2}{x}y = x^2 \\quad (x > 0)$$',
    options: [
      '$y = \\frac{x^3}{3} + \\frac{C}{x^2}$',
      '$y = \\frac{x^3}{5} + \\frac{C}{x^2}$',
      '$y = \\frac{x^5}{5} + C x^2$',
      '$y = \\frac{x^3}{5} + C x^2$',
    ],
    correctIndex: 1,
    explanationSummary:
      'The integrating factor is $I(x) = e^{\\int (2/x)\\,dx} = x^2$. Multiplying through gives $(x^2 y)\' = x^4$, so $x^2 y = \\frac{x^5}{5} + C$.',
    phases: [
      {
        title: 'Phase 1 · Compute the integrating factor I(x)',
        explanation: 'In standard form $y\' + P(x)y = Q(x)$, we have $P(x) = \\frac{2}{x}$ and $Q(x) = x^2$.',
        formula: 'I(x) = e^{\\int \\frac{2}{x}\\,dx} = e^{2\\ln x} = x^2',
      },
      {
        title: 'Phase 2 · Multiply and integrate (I·y)\' = I·Q',
        explanation: 'Integrate $x^2 \\cdot x^2 = x^4$ with respect to $x$.',
        formula: 'x^2 y = \\int x^4\\,dx = \\frac{x^5}{5} + C',
      },
      {
        title: 'Phase 3 · Solve explicitly for y',
        explanation: 'Divide both sides by $x^2$.',
        formula: 'y = \\frac{x^3}{5} + \\frac{C}{x^2}',
      },
    ],
  },

  // ======================== 9. LAPLACE TRANSFORMS ========================
  {
    id: 'lap-1',
    topic: 'laplace-transforms',
    difficulty: 'Core',
    sourceRef: 'Math 3 Lec 5 · Definition & Exponential',
    prompt: 'Using the definition $\\mathcal{L}\\{f(t)\\} = \\int_0^{\\infty} e^{-st}f(t)\\,dt$, find $\\mathcal{L}\\{5e^{3t} - 4\\}$ for $s > 3$.',
    options: [
      '$\\frac{5}{s + 3} - \\frac{4}{s}$',
      '$\\frac{15}{s - 3} - \\frac{4}{s}$',
      '$\\frac{5}{s - 3} - \\frac{4}{s}$',
      '$\\frac{5}{s - 3} - 4$',
    ],
    correctIndex: 2,
    explanationSummary:
      'By linearity, $\\mathcal{L}\\{e^{kt}\\} = \\frac{1}{s-k}$ ($s>k$) and $\\mathcal{L}\\{a\\} = \\frac{a}{s}$ ($s>0$), giving $\\frac{5}{s-3} - \\frac{4}{s}$.',
    phases: [
      {
        title: 'Phase 1 · Apply linearity of the Laplace transform',
        explanation: 'Pull constants out of $\\mathcal{L}$ across sums and differences.',
        formula: '\\mathcal{L}\\{5e^{3t} - 4\\} = 5\\mathcal{L}\\{e^{3t}\\} - \\mathcal{L}\\{4\\}',
      },
      {
        title: 'Phase 2 · Substitute the elementary transforms',
        explanation: 'Use $\\mathcal{L}\\{e^{kt}\\} = \\frac{1}{s-k}$ with $k=3$ and $\\mathcal{L}\\{4\\} = \\frac{4}{s}$.',
        formula: '\\frac{5}{s - 3} - \\frac{4}{s} \\quad (s > 3)',
      },
    ],
  },
  {
    id: 'lap-2',
    topic: 'laplace-transforms',
    difficulty: 'Core',
    sourceRef: 'Math 3 Lec 5 · Trigonometric Transforms',
    prompt: 'Evaluate the Laplace transform $$\\mathcal{L}\\{\\cos(4t) + 2\\sin(4t)\\} \\quad (s > 0)$$',
    options: [
      '$\\frac{s + 8}{s^2 + 16}$',
      '$\\frac{4 + 2s}{s^2 + 16}$',
      '$\\frac{s + 8}{s^2 - 16}$',
      '$\\frac{s + 2}{s^2 + 16}$',
    ],
    correctIndex: 0,
    explanationSummary:
      'Using $\\mathcal{L}\\{\\cos kt\\} = \\frac{s}{s^2+k^2}$ and $\\mathcal{L}\\{\\sin kt\\} = \\frac{k}{s^2+k^2}$ with $k=4$ yields $\\frac{s}{s^2+16} + 2\\cdot\\frac{4}{s^2+16} = \\frac{s+8}{s^2+16}$.',
    phases: [
      {
        title: 'Phase 1 · Apply sine and cosine Laplace formulas',
        explanation: 'With $k = 4$, $\\mathcal{L}\\{\\cos 4t\\} = \\frac{s}{s^2 + 16}$ and $\\mathcal{L}\\{\\sin 4t\\} = \\frac{4}{s^2 + 16}$.',
        formula: '\\mathcal{L}\\{\\cos 4t\\} + 2\\mathcal{L}\\{\\sin 4t\\} = \\frac{s}{s^2 + 16} + 2\\left(\\frac{4}{s^2 + 16}\\right)',
      },
      {
        title: 'Phase 2 · Combine over the common denominator',
        explanation: 'Add the numerators directly.',
        formula: '\\frac{s + 8}{s^2 + 16}',
      },
    ],
  },
  {
    id: 'lap-3',
    topic: 'laplace-transforms',
    difficulty: 'Intermediate',
    sourceRef: 'Math 3 Lec 5 · Frequency Differentiation',
    prompt: 'Using $\\mathcal{L}\\{t f(t)\\} = -\\frac{d}{ds}F(s)$, find $\\mathcal{L}\\{t \\sin(kt)\\}$ for $s > 0$.',
    options: [
      '$\\frac{s^2 - k^2}{(s^2 + k^2)^2}$',
      '$-\\frac{2ks}{(s^2 + k^2)^2}$',
      '$\\frac{k}{(s^2 + k^2)^2}$',
      '$\\frac{2ks}{(s^2 + k^2)^2}$',
    ],
    correctIndex: 3,
    explanationSummary:
      'Start with $F(s) = \\mathcal{L}\\{\\sin kt\\} = \\frac{k}{s^2 + k^2}$, differentiate with respect to $s$, and negate: $-\\frac{-2ks}{(s^2+k^2)^2} = \\frac{2ks}{(s^2+k^2)^2}$.',
    phases: [
      {
        title: 'Phase 1 · Find F(s) = L{sin(kt)}',
        explanation: 'Take $f(t) = \\sin(kt)$, whose Laplace transform is $F(s) = \\frac{k}{s^2 + k^2}$.',
        formula: 'F(s) = k(s^2 + k^2)^{-1}',
      },
      {
        title: 'Phase 2 · Differentiate F(s) and negate',
        explanation: 'Apply the chain rule to $(s^2 + k^2)^{-1}$ and multiply by $-1$.',
        formula:
          '\\mathcal{L}\\{t\\sin(kt)\\} = -\\frac{d}{ds}\\left[k(s^2 + k^2)^{-1}\\right] = -\\left(-k(s^2 + k^2)^{-2}\\cdot 2s\\right) = \\frac{2ks}{(s^2 + k^2)^2}',
      },
    ],
  },
  {
    id: 'lap-4',
    topic: 'laplace-transforms',
    difficulty: 'Intermediate',
    sourceRef: 'Math 3 Lec 5 · L{t e^(kt)}',
    prompt: 'Evaluate $\\mathcal{L}\\{t e^{2t}\\}$ for $s > 2$.',
    options: [
      '$-\\frac{1}{(s - 2)^2}$',
      '$\\frac{1}{(s - 2)^2}$',
      '$\\frac{2}{(s - 2)^2}$',
      '$\\frac{1}{s^2(s - 2)}$',
    ],
    correctIndex: 1,
    explanationSummary:
      'Since $\\mathcal{L}\\{e^{2t}\\} = \\frac{1}{s - 2}$, applying $\\mathcal{L}\\{t f(t)\\} = -F\'(s)$ gives $-\\left(-\\frac{1}{(s-2)^2}\\right) = \\frac{1}{(s - 2)^2}$.',
    phases: [
      {
        title: 'Phase 1 · Identify F(s) for e^(2t)',
        explanation: 'Let $f(t) = e^{2t}$, so $F(s) = (s - 2)^{-1}$.',
      },
      {
        title: 'Phase 2 · Apply -F\'(s)',
        explanation: 'Differentiate $(s - 2)^{-1}$ with respect to $s$ and negate.',
        formula: '\\mathcal{L}\\{t e^{2t}\\} = -\\frac{d}{ds}\\left[(s - 2)^{-1}\\right] = \\frac{1}{(s - 2)^2}',
      },
    ],
  },
];

export function getTopicMeta(id: TopicMeta['id']): TopicMeta {
  return TOPICS.find((t) => t.id === id) ?? TOPICS[0];
}
