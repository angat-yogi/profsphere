// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, orderBy, limit, getDocs, where,serverTimestamp } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Post } from '../models/post';
import { Timestamp } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private firestore: Firestore, private storage: Storage) {}

  async uploadImage(file: File): Promise<string> {
    const filePath = `posts/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef); // ✅ Return URL to save in Firestore
  }

  async addPost(post: Post, imageFile?: File) {
    let imageUrl = '';
    if (imageFile) {
      imageUrl = await this.uploadImage(imageFile);
    }

    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, {
      ...post,
      imageUrl,
      createdAt: Timestamp.fromDate(new Date()),
      likes: post.likes ?? 0,
    });
  }

  getRecentPosts(limitCount: number = 10) {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    return getDocs(q);
  }

  createPost(post: Post) {
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, post);
  }

  getPostsByUser(userId: string): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(
      postsRef,
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }
}