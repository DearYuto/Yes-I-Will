import postService from "@/lib/services/post-service";
import { PostFormData } from "@/lib/types/post";

export interface PostFormStrategy {
  submit: (data: PostFormData) => Promise<void>;
  onSuccess?: (callback: () => void) => void;
  onError?: (error: Error) => void;
  getSuccessMessage?: () => string;
  getErrorMessage?: (error: Error) => string;
}

const createPostStrategy = () => {
  return {
    submit: async (data: PostFormData) => {
      await postService.create(data);
    },
    onSuccess: (callback: () => void) => callback(),
    onError: (error: Error) => {
      throw error;
    },
    getSuccessMessage: () => "게시글이 생성되었습니다.",
    getErrorMessage: () => "게시글 작성에 실패했습니다.",
  };
};

const updatePostStrategy = (id: number) => {
  return {
    submit: async (data: PostFormData) => {
      await postService.update(id, data);
    },
    onSuccess: (callback: () => void) => callback(),
    onError: (error: Error) => {
      throw error;
    },
    getSuccessMessage: () => "게시글이 수정되었습니다.",
    getErrorMessage: () => "게시글 수정에 실패했습니다.",
  };
};

export const PostFormStrategies = {
  create: createPostStrategy,
  update: updatePostStrategy,
};
