import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async as loggedIn">
      <button mat-raised-button color="primary" *ngIf="!loggedIn" (click)="auth.loginWithRedirect()">Sign In</button>
      <button mat-raised-button color="warn" *ngIf="loggedIn" (click)="logout()">Sign Out</button>
    </ng-container>
  `,
})
export class AuthButtonComponent {
  returnTo = window.location.origin;

  constructor(public auth: AuthService) {}

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.returnTo } });
  }
}