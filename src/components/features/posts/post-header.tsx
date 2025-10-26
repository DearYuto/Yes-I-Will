import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PostHeaderProps {
  title?: string;
}

const PostHeader = ({ title = "게시판" }: PostHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <Button asChild>
        <Link href="/posts/new">글쓰기</Link>
      </Button>
    </div>
  );
};

export default PostHeader;
