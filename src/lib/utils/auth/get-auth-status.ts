import { NextRequest } from "next/server";

export function getAuthStatus(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = !!token;

  return {
    token,
    isAuthenticated,
  };
}
