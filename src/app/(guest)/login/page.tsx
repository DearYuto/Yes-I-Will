"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import loginService from "@/lib/services/login-service";
import { FileTextIcon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setError("");

      try {
        const response = await loginService.login(value.email, value.password);

        document.cookie = `token=${response.token}; path=/; max-age=86400`;
        router.push("/posts");
      } catch (err) {
        console.error("로그인 실패:", err);
        setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-none border-gray-200">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white">
              <FileTextIcon className="h-6 w-6" />
            </div>
          </div>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold">유토 대시보드</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) {
                    return "이메일을 입력해주세요.";
                  }
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "올바른 이메일 형식이 아닙니다.";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="yuto@email.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isSubmitting}
                    aria-invalid={!!field.state.meta.errors.length}
                    className="shadow-none"
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value.trim()) {
                    return "비밀번호를 입력해주세요.";
                  }
                  if (value.length < 4) {
                    return "비밀번호는 최소 4자 이상이어야 합니다.";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    disabled={isSubmitting}
                    aria-invalid={!!field.state.meta.errors.length}
                    className="shadow-none"
                  />
                  {field.state.meta.errors[0] && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {(state) => (
                <Button
                  type="submit"
                  className="w-full shadow-none"
                  disabled={!state.canSubmit || isSubmitting}
                >
                  {isSubmitting ? "로그인 중..." : "로그인"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>테스트 계정: alice@example.com / alice1234</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
