import PostFormContainer from "@/components/features/posts/post-form-container";

export default async function NewPostPage() {
  return (
    <PostFormContainer
      mode="create"
      title="새 게시글 작성"
      description="게시글의 제목, 내용, 카테고리를 입력하세요"
    />
  );
}
