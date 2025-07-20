import { Component, inject, effect } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private auth = inject(AuthService);
  title = 'Profsphere';
  constructor() {
    
    effect(() => {
      this.auth.isAuthenticated$.subscribe((loggedIn) => {
        if (!loggedIn) {
          this.auth.loginWithRedirect(); // 👈 automatic redirect to Auth0
        }
      });
    });
  }
}