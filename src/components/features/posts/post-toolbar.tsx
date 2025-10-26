"use client";

import { PostSearchBar } from "./post-search-bar";
import { PostFilters } from "./post-filters";

export const PostToolbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <PostSearchBar />
      <PostFilters />
    </div>
  );
};
