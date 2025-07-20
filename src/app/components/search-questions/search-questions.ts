import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-questions',
  standalone: true,
  templateUrl: './search-questions.html',
  styleUrls: ['./search-questions.css'],
  imports: [CommonModule, FormsModule],
})
export class SearchQuestions {
  searchQuery = '';
  results: string[] = [];
  subscribedExperts = ['Expert AI', 'Dr. Math', 'Jane the Coder'];

  pastAnswers = [
    'Nepal is a landlocked country...',
    'You can calculate tax by...',
    'In Angular, use signals like this...'
  ];

  search() {
    const query = this.searchQuery.toLowerCase();
    this.results = this.pastAnswers.filter(ans => ans.toLowerCase().includes(query));
  }

  askAI() {
    console.log('Redirecting to ask AI with:', this.searchQuery);
    // route to ask page with query
  }

  askExpert(name: string) {
    console.log(`Redirecting to ask ${name} with:`, this.searchQuery);
    // future implementation: open a chat or expert-specific request
  }
}