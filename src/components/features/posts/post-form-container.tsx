"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card className="w-full max-w-3xl shadow-none">
        <CardHeader className="border-b-0">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <PostForm strategy={strategy} />
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default PostFormContainer;
