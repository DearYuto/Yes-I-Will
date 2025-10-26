export type PostCategory = "NOTICE" | "QNA" | "FREE";

export interface Post {
  id: number;
  userId: string;
  title: string;
  body?: string;
  category: PostCategory;
  tags?: string[];
  createdAt: string;
}

export interface PostFormData {
  id?: number;
  title: string;
  body: string;
  category: PostCategory;
  tags: string[];
}

export interface PostSearchParams {
  limit?: number;
  prevCursor?: string;
  nextCursor?: string;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
  category?: PostCategory;
  from?: string;
  to?: string;
  search?: string;
}
