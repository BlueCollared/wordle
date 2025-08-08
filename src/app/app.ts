import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordleComponent } from "./wordle-component/wordle-component";

@Component({
  standalone: true,
  selector: 'app-root',  
  imports: [RouterOutlet, WordleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wordle');
}
