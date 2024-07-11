// src/app/models/comment.model.ts
export interface Comment {
  id: number;
  content: string;
  commentedBy: {
    id: number;
    username: string;
  };
  threadId: number;
}
