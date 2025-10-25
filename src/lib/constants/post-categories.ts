export const POST_CATEGORIES = [
  { value: "NOTICE", label: "공지사항" },
  { value: "QNA", label: "Q&A" },
  { value: "FREE", label: "자유게시판" },
] as const;

export type PostCategoryValue = (typeof POST_CATEGORIES)[number]["value"];
