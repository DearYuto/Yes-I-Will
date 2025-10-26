import { notFound } from "next/navigation";
import postService from "@/lib/services/post-service";
import PostFormContainer from "@/components/features/posts/post-form-container";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await postService.getById(id);

  if (!post) {
    notFound();
  }

  return (
    <PostFormContainer
      mode="update"
      id={post.id}
      title="게시글 수정"
      description="게시글의 제목, 내용, 카테고리, 태그를 수정하세요."
      initialValues={{
        title: post.title,
        body: post.body || "",
        category: post.category,
        tags: post.tags || [],
      }}
    />
  );
}
