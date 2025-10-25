import { TableCell, TableRow } from "@/components/ui/table";
import { Post } from "@/lib/types/post";
import Link from "next/link";

const PostTableRow = ({ id, title, category, userId, createdAt }: Post) => {
  const postURL = `/posts/${id}`;

  return (
    <TableRow>
      <TableCell>{category}</TableCell>
      <TableCell>
        <Link href={postURL} className="hover:underline hover:text-primary">
          {title}
        </Link>
      </TableCell>
      <TableCell>{userId}</TableCell>
      <TableCell className="text-muted-foreground">{createdAt}</TableCell>
    </TableRow>
  );
};

export default PostTableRow;
