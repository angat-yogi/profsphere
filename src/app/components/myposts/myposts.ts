// src/app/components/my-posts/my-posts.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '@auth0/auth0-angular';
import { PostComponent } from '../post/post';
import { Router } from '@angular/router'; // 👈 Add this

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './myposts.html',
  styleUrls: ['./myposts.css']
})
export class MyPosts implements OnInit {
  posts: Post[] = [];
  loading = true;
  userId = '';
  private router = inject(Router); // 👈 Inject Angular Router

  private postService = inject(PostService);
  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user?.sub) {
        this.userId = user.sub;
        this.loadPosts();
      }
    });
  }

  loadPosts(): void {
    this.postService.getPostsByUser(this.userId).subscribe((posts) => {
      this.posts = posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      this.loading = false;
    });
  }

  onAddPost(): void {
    this.router.navigate(['/add-post']); // 👈 Navigate smoothly
  }
}
