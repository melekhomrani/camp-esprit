import { User } from './User';
import { Tag } from './Tag';

export interface ForumThread {
  id: number;
  title: string;
  content: string;
  createdBy: User;
  tags: Tag[];
}
