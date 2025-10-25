import { apiClient } from "@/lib/client/api-client";
import { Post, PostCategory } from "@/lib/types/post";
import { QueryValue } from "../utils/query-string";

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
  body: string;
  category: PostCategory;
}

interface PostsResponse {
  items: Post[];
  prevCursor: string | null;
  nextCursor: string | null;
}

const POSTS_ENDPOINT = "/posts";

const postService = {
  get: (params: GetPostsParams): Promise<PostsResponse> =>
    apiClient.get<PostsResponse>(
      POSTS_ENDPOINT,
      params as Record<string, QueryValue>
    ),
  getById: (id: number): Promise<Post> =>
    apiClient.get<Post>(`${POSTS_ENDPOINT}/${id}`),
  create: (data: CreatePostData): Promise<Post> =>
    apiClient.post<Post>(POSTS_ENDPOINT, data),
  update: (id: number, data: Partial<CreatePostData>): Promise<Post> =>
    apiClient.put<Post>(`${POSTS_ENDPOINT}/${id}`, data),
  delete: (id: number): Promise<void> =>
    apiClient.delete<void>(`${POSTS_ENDPOINT}/${id}`),
};

export default postService;
