"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                예상치 못한 오류가 발생했습니다.
              </h2>
              <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
            </div>

            {process.env.NODE_ENV === "development" && error.message && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <p className="text-sm font-mono text-red-800 break-words">
                  {error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} className="shadow-none">
                다시 시도
              </Button>
              <Button variant="outline" asChild className="shadow-none">
                <Link href="/">홈으로</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
