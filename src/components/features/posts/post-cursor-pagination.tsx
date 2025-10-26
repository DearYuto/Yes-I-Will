"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Direction = "next" | "prev";

interface CursorPaginationProps {
  nextCursor: string | null;
  prevCursor: string | null;
}

export const CursorPagination = ({
  nextCursor,
  prevCursor,
}: CursorPaginationProps) => {
  const searchParams = useSearchParams();

  const buildUrl = (cursor: string | null, direction: "next" | "prev") => {
    if (!cursor) return "#";

    const params = new URLSearchParams(searchParams.toString());

    params.delete("nextCursor");
    params.delete("prevCursor");
    params.set(`${direction}Cursor`, cursor);

    return `/posts?${params.toString()}`;
  };

  const hasPrev = !!prevCursor;
  const hasNext = !!nextCursor;

  if (!hasPrev && !hasNext) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PrevPaginationItems
          buildUrl={buildUrl}
          hasPrev={hasPrev}
          prevCursor={prevCursor}
        />
        <NextPaginationItems
          buildUrl={buildUrl}
          hasNext={hasNext}
          nextCursor={nextCursor}
        />
      </PaginationContent>
    </Pagination>
  );
};

interface PrevPaginationItemsProps {
  buildUrl: (cursor: string | null, direction: Direction) => string;
  hasPrev: boolean;
  prevCursor: string | null;
}

const PrevPaginationItems = ({
  buildUrl,
  hasPrev,
  prevCursor,
}: PrevPaginationItemsProps) => {
  return (
    <PaginationItem>
      {hasPrev ? (
        <PaginationPrevious href={buildUrl(prevCursor, "prev")} />
      ) : (
        <PaginationPrevious
          href="#"
          className="pointer-events-none opacity-50"
          aria-disabled="true"
        />
      )}
    </PaginationItem>
  );
};

interface NextPaginationItemsProps {
  buildUrl: (cursor: string | null, direction: Direction) => string;
  hasNext: boolean;
  nextCursor: string | null;
}
const NextPaginationItems = ({
  buildUrl,
  hasNext,
  nextCursor,
}: NextPaginationItemsProps) => {
  return (
    <PaginationItem>
      {hasNext ? (
        <PaginationNext href={buildUrl(nextCursor, "next")} />
      ) : (
        <PaginationNext
          href="#"
          className="pointer-events-none opacity-50"
          aria-disabled="true"
        />
      )}
    </PaginationItem>
  );
};
