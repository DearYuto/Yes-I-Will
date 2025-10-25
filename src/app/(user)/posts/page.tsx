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
import postService from "@/lib/services/post-service";

export default async function PostsPage() {
  const posts = await postService.get({
    limit: 10,
    prevCursor: undefined,
    nextCursor: undefined,
    sort: undefined,
    order: undefined,
    category: undefined,
    from: undefined,
    to: undefined,
    search: undefined,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <PostHeader title="게시판" totalCount={posts.items.length} />

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">카테고리</TableHead>
              <TableHead className="w-[200px]">제목</TableHead>
              <TableHead className="w-[120px]">작성자</TableHead>
              <TableHead className="w-[120px]">작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  게시글이 없습니다
                </TableCell>
              </TableRow>
            ) : (
              posts.items.map((post) => (
                <PostTableRow key={post.id} {...post} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
