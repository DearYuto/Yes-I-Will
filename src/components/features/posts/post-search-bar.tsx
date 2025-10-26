"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export const PostSearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    params.delete("nextCursor");
    params.delete("prevCursor");

    router.push(`/posts?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="검색"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1 shadow-none"
      />
      <Button type="submit" size="icon" className="shadow-none">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};
