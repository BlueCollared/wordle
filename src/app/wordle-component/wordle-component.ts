import { Component } from '@angular/core';
import { WordleGame } from '../core/wordle-game';
import { max } from 'rxjs';
import { GuessResult } from '../core/wordle-types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordle-component',
  imports: [FormsModule],
  templateUrl: './wordle-component.html',
  styleUrl: './wordle-component.scss'
})
export class WordleComponent{

  readonly maxAttempts = 6;
game = new WordleGame('APPLE', this.maxAttempts);
attempts: string[] = [];
currentGuess: string = '';

  guessFeedback: GuessResult | null = null;

  submitGuess() {
    if (this.game.gameOver()) return;

    const result: GuessResult = this.game.makeGuess(this.currentGuess.toUpperCase());

    if (typeof result === 'string') {      
      this.guessFeedback = null;
    } else {
      this.guessFeedback = result.reason;
    }

    this.currentGuess = '';
  }
}
