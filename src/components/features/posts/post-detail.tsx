"use client";

import { useState } from "react";
import { Post } from "@/lib/types/post";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { POST_CATEGORIES } from "@/lib/constants/post-categories";
import { ArrowLeftIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import postService from "@/lib/services/post-service";
import PageContainer from "@/components/common/page-container";

interface PostDetailProps {
  post: Post;
}

export const PostDetail = ({ post }: PostDetailProps) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getCategoryStyle = (category: string) => {
    const styles = {
      NOTICE: "bg-gray-900 text-white hover:bg-gray-800",
      QNA: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      FREE: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    };

    return styles[category as keyof typeof styles] || styles.FREE;
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabel = POST_CATEGORIES.find(
      (c) => c.value === category
    )?.label;
    return categoryLabel || category;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEdit = () => {
    router.push(`/posts/${post.id}/edit`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await postService.delete(post.id);
      router.push("/posts");
    } catch (error) {
      console.error("게시글 삭제 실패", error);
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <PageContainer>
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <Badge className={getCategoryStyle(post.category)}>
                {getCategoryLabel(post.category)}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">
                {post.title}
              </h1>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="shadow-none"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                수정
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="shadow-none text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                삭제
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">{post.userId}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        <div className="p-6">
          {post.body ? (
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.body}
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">내용이 없습니다.</p>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="px-6 pb-6">
            <Separator className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/posts")}
          className="shadow-none"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          목록으로
        </Button>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제한 게시글은 다시 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
};
