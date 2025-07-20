import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collectionData, collection, query, limit, startAfter } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  search = '';
  feeds: any[] = [];
  loading = false;
  lastVisible: any = null;
  firestore = inject(Firestore);

  ngOnInit() {
    this.loadInitialFeeds();
  }

  async loadInitialFeeds() {
    this.loading = true;
    const feedCollection = collection(this.firestore, 'popular_feeds');
    const q = query(feedCollection, limit(10));
    const snapshot = await collectionData(q, { idField: 'id' }).toPromise();
    if (snapshot) this.feeds = snapshot;
    this.loading = false;
  }

  async onScroll() {
    if (this.loading) return;
    this.loading = true;
    const feedCollection = collection(this.firestore, 'popular_feeds');
    const q = query(feedCollection, startAfter(this.lastVisible), limit(10));
    const snapshot = await collectionData(q, { idField: 'id' }).toPromise();
    if (snapshot?.length) this.feeds.push(...snapshot);
    this.loading = false;
  }
}