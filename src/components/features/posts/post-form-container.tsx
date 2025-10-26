"use client";

import PostForm from "./post-form";
import { PostFormStrategies } from "@/lib/strategies/post-form.strategies";
import PageContainer from "@/components/common/page-container";

interface PostFormContainerProps {
  mode: "create" | "update";
  id?: number;
  title: string;
  description?: string;
}

const PostFormContainer = ({
  mode,
  id,
  title,
  description,
}: PostFormContainerProps) => {
  if (mode === "update" && !id) {
    throw new Error("ID is required for update mode");
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

      <PostForm strategy={strategy} />
    </PageContainer>
  );
};

export default PostFormContainer;
