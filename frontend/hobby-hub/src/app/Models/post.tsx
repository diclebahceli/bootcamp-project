import { Comment } from "./comment";
import { Like } from "./like";

export interface Post {
  id: string;
  description: string;
  image?: string;
  communityId: number;
  userId: number;
  comments?: Comment[] | null;
  likes?: Like[] | null;
}
