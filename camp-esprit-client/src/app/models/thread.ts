export interface Thread {
  id: number;
  user: string;
  avatarUrl: string;
  content: string;
  imageUrl?: string; // Optional image URL
  likes: number;
  comments: Comment[];
}


export interface Comment {
  user: string;
  content: string;
}
