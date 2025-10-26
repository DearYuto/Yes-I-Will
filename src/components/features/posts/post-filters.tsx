"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { POST_CATEGORIES } from "@/lib/constants/post-categories";

const SORT_OPTIONS = [
  { value: "createdAt", label: "작성일" },
  { value: "title", label: "제목" },
] as const;

const ORDER_OPTIONS = [
  { value: "desc", label: "내림차순" },
  { value: "asc", label: "오름차순" },
] as const;

export const PostFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "createdAt";
  const currentOrder = searchParams.get("order") || "desc";
  const currentCategory = searchParams.get("category") || "all";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("nextCursor");
    params.delete("prevCursor");

    router.push(`/posts?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Select
        value={currentCategory}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger className="w-[140px] shadow-none">
          <SelectValue placeholder="전체 카테고리" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {POST_CATEGORIES.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentSort}
        onValueChange={(value) => handleFilterChange("sort", value)}
      >
        <SelectTrigger className="w-[140px] shadow-none">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentOrder}
        onValueChange={(value) => handleFilterChange("order", value)}
      >
        <SelectTrigger className="w-[140px] shadow-none">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          {ORDER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
