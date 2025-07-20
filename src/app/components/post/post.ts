import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.html',
  styleUrls: ['./post.css'],
})
export class PostComponent {
  @Input() post!: Post;

  showAllImages = false;

  toggleImages() {
    this.showAllImages = !this.showAllImages;
  }

  visibleImages(): string[] {
    return this.showAllImages
      ? this.post.images ?? []
      : (this.post.images ?? []).slice(0, 2);
  }

  remainingImageCount(): number {
    return (this.post.images?.length ?? 0) - 2;
  }
}