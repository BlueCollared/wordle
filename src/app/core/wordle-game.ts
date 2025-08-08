import { computed, signal } from '@angular/core';
import { WordleEvaluator } from './wordle-evaluator';
import { GuessResult, RejectedGuess } from './wordle-types';

export class WordleGame {
  attempts(): string[] {
    return [...this._attempts]
  }
  
  private readonly answer: string;
  private readonly _maxAttempts: number = 6;
  public get maxAttempts(): number {
    return this._maxAttempts;
  }

  private _cntAttempts() {
    return this._attempts.length;
   }

  public isGameOver(): boolean {
    return this._cntAttempts() >= this.maxAttempts || this._attempts.includes(this.answer);
  }

  private _attempts:string[] = [];

  
  public get maxLength () : number {
    return this.answer.length;
  }  

  constructor(answer: string, maxAttempts: number) {
    this.answer = answer;
    this._maxAttempts = maxAttempts;
  }  
  
  makeGuess(input: string): GuessResult {
    if (this.isGameOver())
        return {reason: `Past max attempts`};

    if (input.length !== this.answer.length) {
      const rejection: RejectedGuess = {
        //kind: 'Rejected',
        reason: `Expected word of length ${this.answer.length}, got ${input.length}`
      };

      return rejection;
    }

    this._attempts.push(input);

    return WordleEvaluator.evaluateAttempt(input.toUpperCase(), this.answer);
  }
}