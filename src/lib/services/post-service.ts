import { apiClient } from "@/lib/client/api-client";
import { Post, PostCategory } from "@/lib/types/post";

interface GetPostsParams {
  limit?: number;
  prevCursor?: string;
  nextCursor?: string;
  from?: string;
  to?: string;
  category?: PostCategory;
  search?: string;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
}

interface CreatePostData {
  title: string;
  content: string;
  category: PostCategory;
}

interface PostsResponse {
  items: Post[];
  prevCursor: string | null;
  nextCursor: string | null;
}

const POSTS_ENDPOINT = "/posts";

const postService = {
  get: (params: GetPostsParams) => apiClient.get(POSTS_ENDPOINT, { params }),
  getById: (id: number) => apiClient.get<Post>(`${POSTS_ENDPOINT}/${id}`),
  create: (data: CreatePostData) => apiClient.post<Post>(POSTS_ENDPOINT, data),
  update: (id: number, data: Partial<CreatePostData>) =>
    apiClient.put<Post>(`${POSTS_ENDPOINT}/${id}`, data),
  delete: (id: number) => apiClient.delete<void>(`${POSTS_ENDPOINT}/${id}`),
};

export default postService;
