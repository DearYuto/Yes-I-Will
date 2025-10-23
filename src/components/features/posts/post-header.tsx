import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PostHeaderProps {
	title?: string;
	totalCount?: number;
}

const PostHeader = ({ title = "게시판", totalCount = 0 }: PostHeaderProps) => {
	return (
		<div className="flex justify-between items-center mb-6">
			<div>
				<h1 className="text-3xl font-bold">{title}</h1>
				{totalCount > 0 && (
					<p className="text-muted-foreground mt-1">
						총 {totalCount}개의 게시글
					</p>
				)}
			</div>
			<Button asChild>
				<Link href="/posts/new">글쓰기</Link>
			</Button>
		</div>
	);
};

export default PostHeader;
