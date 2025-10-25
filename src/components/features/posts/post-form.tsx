"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { PostFormStrategy } from "@/lib/strategies/post-form.strategies";
import { PostFormData } from "@/lib/types/post";
import {
  PostTitleField,
  PostCategoryField,
  PostContentField,
  titleFieldConfig,
  categoryFieldConfig,
  contentFieldConfig,
} from "./form-fields";
import { PostTagsField, tagFieldConfig } from "./form-fields/post-tags-field";

const PostForm = ({ strategy }: { strategy: PostFormStrategy }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
      category: "FREE",
      tags: [],
    } as PostFormData,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        await strategy.submit(value);
        strategy.onSuccess?.(() => router.push("/posts"));
        strategy.getSuccessMessage?.();
      } catch (error) {
        strategy.onError?.(error as Error);
        strategy.getErrorMessage?.(error as Error);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <CardContent className="space-y-6">
        <form.Field {...titleFieldConfig}>
          {(field) => <PostTitleField field={field} />}
        </form.Field>

        <form.Field {...categoryFieldConfig}>
          {(field) => <PostCategoryField field={field} />}
        </form.Field>

        <form.Field {...contentFieldConfig}>
          {(field) => <PostContentField field={field} />}
        </form.Field>

        <form.Field {...tagFieldConfig}>
          {(field) => <PostTagsField field={field} />}
        </form.Field>
      </CardContent>

      <CardFooter className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/posts")}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {(state) => (
            <Button type="submit" disabled={!state.canSubmit || isSubmitting}>
              {isSubmitting ? "업로드 중.." : "작성하기"}
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </form>
  );
};

export default PostForm;
