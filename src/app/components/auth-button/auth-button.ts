import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './auth-button.html',
  styleUrls: ['./auth-button.css'],
})
export class AuthButton {
  returnTo = window.location.origin;

  constructor(public auth: AuthService) {
    this.auth.isLoading$.subscribe(val => console.log('⏳ isLoading$', val));
    this.auth.isAuthenticated$.subscribe(val => console.log('✅ isAuthenticated$', val));
    this.auth.error$.subscribe(err => {
      if (err) console.error('❌ Auth0 Error:', err);
    });
  }
  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.returnTo } });
  }
}