import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/page-container";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            게시글을 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-6">
            요청하신 게시글이 존재하지 않거나 삭제되었습니다.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="shadow-none"
              asChild
            >
              <Link href="/posts">게시판으로</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
