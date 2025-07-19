import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('profsphere');
}