// src/app/models/comment.model.ts
export interface Comment {
  id: number;
  content: string;
  userId: string;
  threadId: number;
}
