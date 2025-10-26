import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PostHeader from "@/components/features/posts/post-header";
import PostTableRow from "@/components/features/posts/post-table-row";
import { CursorPagination } from "@/components/features/posts/post-cursor-pagination";
import postService from "@/lib/services/post-service";
import { PostSearchParams } from "@/lib/types/post";
import PageContainer from "@/components/common/page-container";

interface PostsPageProps {
  searchParams: Promise<PostSearchParams>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;

  const limit = params.limit || 10;
  const sort = params.sort || "createdAt";
  const order = params.order || "desc";

  const posts = await postService.get({
    limit,
    sort,
    order,
    nextCursor: params.nextCursor,
    prevCursor: params.prevCursor,
    category: params.category,
    from: params.from,
    to: params.to,
    search: params.search,
  });

  return (
    <PageContainer>
      <PostHeader title="게시판" />

      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="flex flex-col h-[600px]">
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10">
                <TableRow className="border-b border-gray-200 bg-white hover:bg-white">
                  <TableHead className="w-[100px] h-11 pl-6 font-semibold text-gray-900 bg-white">
                    카테고리
                  </TableHead>
                  <TableHead className="h-11 font-semibold text-gray-900 bg-white">
                    제목
                  </TableHead>
                  <TableHead className="w-[120px] h-11 font-semibold text-gray-900 text-center bg-white">
                    작성자
                  </TableHead>
                  <TableHead className="w-[100px] h-11 pr-6 font-semibold text-gray-900 text-center bg-white">
                    작성일
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.items.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={4}
                      className="text-center py-16 text-gray-400 h-[600px] border-b-0"
                    >
                      게시글이 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {posts.items.map((post) => (
                      <PostTableRow key={post.id} {...post} />
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/30 py-4 shrink-0">
            <CursorPagination
              nextCursor={posts.nextCursor}
              prevCursor={posts.prevCursor}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
