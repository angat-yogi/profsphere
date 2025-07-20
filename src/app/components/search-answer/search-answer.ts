import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-search-answer',
  standalone: true,
  templateUrl: './search-answer.html',
  styleUrls: ['./search-answer.css'],
  imports: [CommonModule, FormsModule]
})
export class SearchAnswer {
  search = '';
  matches: any[] = [];
  loading = false;
  noResults = false;

  constructor(private firestore: Firestore) {}

  async onSearch() {
    this.loading = true;
    this.matches = [];

    const q = query(
      collection(this.firestore, 'answers'),
      where('keywords', 'array-contains', this.search.toLowerCase())
    );

    const snap = await getDocs(q);
    this.matches = snap.docs.map(doc => doc.data());
    this.noResults = this.matches.length === 0;

    this.loading = false;
  }
}