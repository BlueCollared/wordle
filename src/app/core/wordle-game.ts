// wordle-game.ts

import { WordleEvaluator } from './wordle-evaluator';
import { GuessResult, RejectedGuess } from './wordle-types';

export class WordleGame {
  private readonly answer: string;
  private readonly maxAttempts: number;

  private _cntAttempts = 0;
  

  constructor(answer: string, maxAttempts: number) {
    this.answer = answer;
    this.maxAttempts = maxAttempts;
  }

  get cntAttempts(): number {
    return this._cntAttempts;
  }

  makeGuess(input: string): GuessResult {
    if (this._cntAttempts >= this.maxAttempts)
        return {reason: `Past max attempts`};

    if (input.length !== this.answer.length) {
      const rejection: RejectedGuess = {
        //kind: 'Rejected',
        reason: `Expected word of length ${this.answer.length}, got ${input.length}`
      };
      return rejection;
    }

    this._cntAttempts++;
    return WordleEvaluator.evaluateAttempt(input.toUpperCase(), this.answer);
  }
}
