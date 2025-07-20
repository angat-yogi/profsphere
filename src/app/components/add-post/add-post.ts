import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css'],
})
export class AddPost {
  content = '';
  tags = '';
  images: string[] = [];
  previewImages: string[] = [];
  visibility: 'public' | 'private' | 'followers' = 'public';
  status = '';
  authorId = '';
  authorName = '';

  constructor(private postService: PostService, private auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.authorId = user.sub || '';
        this.authorName = user.name || '';
      }
    });
  }

  handleImageUpload(event: any) {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const result = e.target.result;
        this.images.push(result);
        this.previewImages.push(result);
      };
      reader.readAsDataURL(file);
    });
  }
  async submitPost() {
    if (!this.content.trim()) {
      this.status = 'Post content is required.';
      return;
    }
  
    try {
      this.status = 'Uploading...';
  
      const uploadedImageUrls: string[] = [];
  
      for (let img of this.previewImages) {
        const blob = await fetch(img).then(res => res.blob());
        const file = new File([blob], `image_${Date.now()}.png`, { type: blob.type });
        const url = await this.postService.uploadImage(file);
        uploadedImageUrls.push(url);
      }
  
      await this.postService.createPost({
        authorId: this.authorId,
        authorName: this.authorName,
        content: this.content,
        createdAt: new Date(),
        tags: this.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        images: uploadedImageUrls,
        visibility: this.visibility,
        likes: 0,
        edited: false,
        comments: []
      });
  
      this.status = '✅ Post submitted!';
      this.content = '';
      this.tags = '';
      this.previewImages = [];
    } catch (err) {
      console.error(err);
      this.status = '❌ Failed to submit post.';
    }
  }

}