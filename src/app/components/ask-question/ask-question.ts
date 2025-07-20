import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ask-question',
  standalone: true,
  templateUrl: './ask-question.html',
  styleUrls: ['./ask-question.css'],
  imports: [CommonModule, FormsModule,],

})
export class AskQuestion {
  question = '';
  answer = '';
  loading = false;

  constructor(private openai: OpenaiService) {}

  ask() {
    this.loading = true;
    this.openai.askQuestion(this.question).subscribe({
      next: (res) => {
        this.answer = res.choices[0].message.content;
        console.log('AI Response:', this.answer);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching AI response', err);
        this.answer = 'Something went wrong.';
        this.loading = false;
      },
    });
  }
}