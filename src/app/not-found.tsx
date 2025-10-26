import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            페이지를 찾을 수 없습니다.
          </h2>
          <p className="text-gray-600">요청하신 페이지가 존재하지 않습니다.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild className="shadow-none">
            <Link href="/posts">게시판으로</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
