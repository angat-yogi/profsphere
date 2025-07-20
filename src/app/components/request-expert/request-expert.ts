import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { ExpertRequestService } from '../../services/expert-request.service';

@Component({
  selector: 'app-request-expert',
  standalone: true,
  templateUrl: './request-expert.html',
  styleUrls: ['./request-expert.css'],
  imports: [CommonModule, FormsModule],
})
export class RequestExpert {
  bio = '';
  status = '';
  userId = '';
  name = '';
  email = '';

  constructor(
    private expertService: ExpertRequestService,
    private auth: AuthService
  ) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub ?? '';
        this.name = user.name ?? '';
        this.email = user.email ?? '';
    
        // ✅ Add this:
        console.log('Authenticated user:', {
          sub: user.sub,
          name: user.name,
          email: user.email,
        });
      } else {
        console.warn('User is not authenticated');
      }
    });
  }

  submitRequest() {
    if (!this.bio.trim()) {
      this.status = 'Please describe your expertise before submitting.';
      return;
    }

    this.expertService
      .requestExpertStatus({
        userId: this.userId,
        name: this.name,
        email: this.email,
        expertise: [this.bio],
      })
      .then(() => {
        this.status = '✅ Request submitted. We’ll notify you after review.';
        this.bio = '';
      })
      .catch((err) => {
        console.error('Error submitting request:', err);
        this.status = '❌ Failed to submit request. Please try again.';
      });
  }
}