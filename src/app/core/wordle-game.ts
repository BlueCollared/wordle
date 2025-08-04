// wordle-game.ts

import { WordleEvaluator } from './wordle-evaluator';
import { GuessResult, RejectedGuess } from './wordle-types';

export class WordleGame {
  private readonly answer: string;
  private _cntAttempts = 0;

  constructor(answer: string) {
    this.answer = answer;
  }

  get cntAttempts(): number {
    return this._cntAttempts;
  }

  makeGuess(input: string): GuessResult {
    if (input.length !== this.answer.length) {
      const rejection: RejectedGuess = {
        kind: 'Rejected',
        reason: `Expected word of length ${this.answer.length}, got ${input.length}`
      };
      return rejection;
    }

    this._cntAttempts++;
    return WordleEvaluator.evaluateAttempt(input.toUpperCase(), this.answer);
  }
}
