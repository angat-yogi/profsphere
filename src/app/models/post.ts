export interface Post {
    id?: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: Date;
    tags?: string[];
    likes?: number;
    images?: string[];
    comments?: { userId: string; comment: string; timestamp: Date }[];
    visibility?: 'public' | 'private' | 'followers';
    edited?: boolean;
  }