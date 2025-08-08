import { Component } from '@angular/core';
import { WordleGame } from '../core/wordle-game';
import { GuessResult } from '../core/wordle-types';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'wordle-component',
  imports: [FormsModule],
  templateUrl: './wordle-component.html',
  styleUrl: './wordle-component.scss'
})
export class WordleComponent{

  // maxAttempts = 6;
game = new WordleGame('APPLE', 6);
attempts: string[] = [];
currentGuessId = 0;

  guessFeedback: GuessResult | null = null;
  maxLength: number;
  isGameOver:boolean = false;

  /**
   *
   */
  constructor() {
    //this.attempts = Array(this.maxAttempts).fill('');
    this.maxLength = this.game.maxLength;
    for (let i = 0; i < this.game.attempts().length; i++) {
      this.attempts.push(this.game.attempts()[i]);
    }
    for (let i = this.game.attempts().length; i<this.game.maxAttempts; i++) {
      this.attempts.push('');
    }
    this.currentGuessId = this.game.attempts().length;
  }

  submitGuess() {
    if (this.game.isGameOver()) return;

    let currentGuess = this.attempts[this.currentGuessId];
    const result: GuessResult = this.game.makeGuess(currentGuess.toUpperCase());

    if (typeof result === 'string') {      
      this.guessFeedback = null;
      this.currentGuessId++;
      this.isGameOver = this.game.isGameOver();      
    } else {
      this.guessFeedback = result.reason;
      this.attempts[this.currentGuessId] = '';
    }    
  }
}
