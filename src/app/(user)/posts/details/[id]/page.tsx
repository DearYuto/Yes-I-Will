import { notFound } from "next/navigation";
import postService from "@/lib/services/post-service";
import PageContainer from "@/components/common/page-container";
import { PostDetail } from "@/components/features/posts/post-detail";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = await postService.getById(id);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <PostDetail post={post} />
    </PageContainer>
  );
}
