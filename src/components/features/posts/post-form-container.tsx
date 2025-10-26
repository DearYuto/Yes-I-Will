"use client";

import PostForm from "./post-form";
import { PostFormStrategies } from "@/lib/strategies/post-form.strategies";
import PageContainer from "@/components/common/page-container";
import { PostFormData } from "@/lib/types/post";

interface PostFormContainerProps {
  mode: "create" | "update";
  id?: number;
  title: string;
  description?: string;
  initialValues?: Partial<PostFormData>;
}

const PostFormContainer = ({
  mode,
  id,
  title,
  description,
  initialValues,
}: PostFormContainerProps) => {
  if (mode === "update" && !id) {
    throw new Error("게시글 ID가 필요합니다.");
  }

  const strategy =
    mode === "create"
      ? PostFormStrategies.create()
      : PostFormStrategies.update(id!);

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </div>

      <PostForm strategy={strategy} initialValues={initialValues} />
    </PageContainer>
  );
};

export default PostFormContainer;
