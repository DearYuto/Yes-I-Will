import { TableCell, TableRow } from "@/components/ui/table";
import { Post } from "@/lib/types/post";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { POST_CATEGORIES } from "@/lib/constants/post-categories";

const PostTableRow = ({ id, title, category, userId, createdAt }: Post) => {
  const postURL = `/posts/${id}`;

  const getCategoryStyle = (category: string) => {
    const styles = {
      NOTICE: "bg-gray-900 text-white hover:bg-gray-800",
      QNA: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      FREE: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    };
    return styles[category as keyof typeof styles] || styles.FREE;
  };

  const getCategoryLabel = (category: string) => {
    const categoryLabel = POST_CATEGORIES.find(
      (c) => c.value === category
    )?.label;

    return categoryLabel || category;
  };

  return (
    <TableRow className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <TableCell className="py-3 pl-6">
        <Badge className={getCategoryStyle(category)}>
          {getCategoryLabel(category)}
        </Badge>
      </TableCell>
      <TableCell className="py-3">
        <Link
          href={postURL}
          className="font-medium text-gray-900 hover:text-black hover:underline underline-offset-4 transition-colors line-clamp-1"
        >
          {title}
        </Link>
      </TableCell>
      <TableCell className="py-3 text-center text-sm text-gray-600">
        {userId}
      </TableCell>
      <TableCell className="py-3 pr-6 text-center text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString("ko-KR", {
          month: "2-digit",
          day: "2-digit",
        })}
      </TableCell>
    </TableRow>
  );
};

export default PostTableRow;
