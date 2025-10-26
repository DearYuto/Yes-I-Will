"use client";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/page-container";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            게시글을 불러올 수 없습니다
          </h2>
          <p className="text-gray-600 mb-6">
            요청한 게시글을 찾을 수 없거나 오류가 발생했습니다.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="shadow-none"
            >
              이전 페이지로
            </Button>
            <Button onClick={reset} className="shadow-none">
              다시 시도
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
