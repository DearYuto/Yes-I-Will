export const POST_CATEGORIES = [
  { value: "NOTICE", label: "공지" },
  { value: "QNA", label: "Q&A" },
  { value: "FREE", label: "자유" },
] as const;

export type PostCategoryValue = (typeof POST_CATEGORIES)[number]["value"];
