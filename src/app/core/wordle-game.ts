import { computed, signal } from '@angular/core';
import { WordleEvaluator } from './wordle-evaluator';
import { GuessResult, RejectedGuess } from './wordle-types';

export class WordleGame {
  
  private readonly answer: string;
  private readonly maxAttempts: number;

  private _cntAttempts = signal(0);
  cntAttempts = this._cntAttempts.asReadonly();
  gameOver = computed(() => this._cntAttempts() >= this.maxAttempts || this._attempts().includes(this.answer));
  private _attempts = signal<string[]>([]);
  public attempts = this._attempts.asReadonly(); 

  constructor(answer: string, maxAttempts: number) {
    this.answer = answer;
    this.maxAttempts = maxAttempts;
  }  
  
  makeGuess(input: string): GuessResult {
    if (this.gameOver())
        return {reason: `Past max attempts`};

    if (input.length !== this.answer.length) {
      const rejection: RejectedGuess = {
        //kind: 'Rejected',
        reason: `Expected word of length ${this.answer.length}, got ${input.length}`
      };

      return rejection;
    }

    this._cntAttempts.update(x => x + 1);
    this._attempts.update(attempts => [...attempts, input]);

    return WordleEvaluator.evaluateAttempt(input.toUpperCase(), this.answer);
  }
}