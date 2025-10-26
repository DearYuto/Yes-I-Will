"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SearchBarSkeleton = () => (
  <div className="flex gap-2 w-full max-w-md">
    <Skeleton className="flex-1 h-9" />
    <Skeleton className="w-9 h-9" />
  </div>
);

const FiltersSkeleton = () => (
  <div className="flex gap-2 flex-wrap">
    <Skeleton className="w-[140px] h-9" />
    <Skeleton className="w-[140px] h-9" />
    <Skeleton className="w-[140px] h-9" />
  </div>
);

const PostSearchBar = dynamic(
  () =>
    import("./post-search-bar").then((mod) => ({ default: mod.PostSearchBar })),
  {
    ssr: false,
    loading: () => <SearchBarSkeleton />,
  }
);

const PostFilters = dynamic(
  () => import("./post-filters").then((mod) => ({ default: mod.PostFilters })),
  {
    ssr: false,
    loading: () => <FiltersSkeleton />,
  }
);

export const PostToolbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <PostSearchBar />
      <PostFilters />
    </div>
  );
};
