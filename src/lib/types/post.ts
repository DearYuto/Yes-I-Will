import { Tag } from "./tag";

export type PostCategory = "NOTICE" | "QNA" | "FREE";

export interface Post {
	id: number;
	title: string;
	content?: string;
	category: PostCategory;
	author: string;
	createdAt: string;
	tags?: Tag[];
}
