import katex from 'katex';
import { Fragment, useMemo } from 'react';

interface MathTextProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface Segment {
  type: 'text' | 'inline' | 'block';
  content: string;
}

function parseMathSegments(input: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: input.slice(lastIndex, match.index),
      });
    }
    if (match[1] !== undefined) {
      segments.push({ type: 'block', content: match[1].trim() });
    } else if (match[2] !== undefined) {
      segments.push({ type: 'inline', content: match[2].trim() });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    segments.push({
      type: 'text',
      content: input.slice(lastIndex),
    });
  }

  return segments;
}

export function MathText({ text, size = 'md', className = '' }: MathTextProps) {
  const segments = useMemo(() => parseMathSegments(text), [text]);

  const sizeClass =
    size === 'lg'
      ? 'math-expression-lg text-lg sm:text-xl leading-relaxed'
      : size === 'sm'
        ? 'text-sm sm:text-base leading-relaxed'
        : 'math-expression text-base sm:text-lg leading-relaxed';

  return (
    <span className={`${sizeClass} ${className}`}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return <Fragment key={idx}>{seg.content}</Fragment>;
        }

        const isBlock = seg.type === 'block';
        let html = '';
        try {
          html = katex.renderToString(seg.content, {
            displayMode: isBlock,
            throwOnError: false,
            strict: false,
          });
        } catch {
          return <code key={idx}>{seg.content}</code>;
        }

        if (isBlock) {
          return (
            <span
              key={idx}
              className="math-block-wrap block w-full my-2 text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={idx}
            className="inline-block align-baseline max-w-full overflow-x-auto align-middle"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
}
