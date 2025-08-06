import { WordleEvaluator } from './wordle-evaluator';

describe('WordleEvaluator', () => {
  it('returns all Gs when guess is correct', () => {
    const result = WordleEvaluator.evaluateAttempt('APPLE', 'APPLE');
    expect(result).toBe('GGGGG');
  });

  it('returns all Bs when none of the letters match', () => {
    const result = WordleEvaluator.evaluateAttempt('CRISP', 'MOUNT');
    expect(result).toBe('BBBBB');
  });

  it('returns Ys for correct letters in wrong positions', () => {
    const result = WordleEvaluator.evaluateAttempt('PLEAP', 'APPLE');
    expect(result).toBe('YYYYY');
  });

  it('returns correct mix of G, Y, B', () => {
    const result = WordleEvaluator.evaluateAttempt('GRAPE', 'APPLE');
    expect(result).toBe('BBYYG');
  });

  it('handles repeated letters in input with correct evaluation', () => {
    const result = WordleEvaluator.evaluateAttempt('BANAL', 'CANAL');
    expect(result).toBe('BGGGG'); // B is not in answer
  });

  // it('does not overcount letters when input has more duplicates than answer', () => {
  //   const result = WordleEvaluator.evaluateAttempt('LLAMA', 'ALOFT');
  //   expect(result).toBe('YGBBB');
  //   // L in position 0: exists in answer (Y)
  //   // L in position 1: already used (B)
  //   // A in 2: correct (G)
  // });

  it('works with lowercase input', () => {
    const result = WordleEvaluator.evaluateAttempt('apple', 'APPLE');
    expect(result).toBe('GGGGG');
  });

  it('returns correct length in output', () => {
    const input = 'CRANE';
    const answer = 'REACT';
    const result = WordleEvaluator.evaluateAttempt(input, answer);
    expect(result.length).toBe(input.length);
  });
});
