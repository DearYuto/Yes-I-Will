"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PostFormStrategy } from "@/lib/strategies/post-form.strategies";
import { PostFormData } from "@/lib/types/post";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostForm = ({ strategy }: { strategy: PostFormStrategy }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "FREE",
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
        {/* 제목 필드 */}
        <form.Field
          name="title"
          validators={{
            onChange: ({ value }) => {
              if (!value || value.trim().length === 0) {
                return "제목을 입력해주세요";
              }
              if (value.length < 2) {
                return "제목은 최소 2자 이상이어야 합니다";
              }
              if (value.length > 100) {
                return "제목은 최대 100자까지 입력 가능합니다";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                placeholder="게시글 제목을 입력하세요"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!!field.state.meta.errors.length}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* 카테고리 필드 */}
        <form.Field
          name="category"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "카테고리를 선택해주세요";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select
                value={field.state.value}
                onValueChange={field.handleChange}
              >
                <SelectTrigger
                  id="category"
                  aria-invalid={!!field.state.meta.errors.length}
                >
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NOTICE">공지사항</SelectItem>
                  <SelectItem value="QNA">Q&A</SelectItem>
                  <SelectItem value="FREE">자유게시판</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* 내용 필드 */}
        <form.Field
          name="content"
          validators={{
            onChange: ({ value }) => {
              if (!value || value.trim().length === 0) {
                return "내용을 입력해주세요";
              }
              if (value.length < 10) {
                return "내용은 최소 10자 이상이어야 합니다";
              }
              if (value.length > 5000) {
                return "내용은 최대 5000자까지 입력 가능합니다";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="게시글 내용을 입력하세요"
                rows={10}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={!!field.state.meta.errors.length}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 mt-4">
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
              {isSubmitting ? "작성 중..." : "작성하기"}
            </Button>
          )}
        </form.Subscribe>
      </CardFooter>
    </form>
  );
};

export default PostForm;
