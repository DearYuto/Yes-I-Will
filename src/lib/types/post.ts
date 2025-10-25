import { Tag } from "./tag";

export type PostCategory = "NOTICE" | "QNA" | "FREE";

export interface Post {
  id: number;
  userId: string;
  title: string;
  body?: string;
  category: PostCategory;
  tags?: Tag[];
  createdAt: string;
}

export interface PostFormData {
  id: number;
  title: string;
  content: string;
  category: PostCategory;
  tags?: Tag[];
}
