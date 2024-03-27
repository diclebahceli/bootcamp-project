import { Comment } from "./comment";
import { Like } from "./like";

export interface PostModel {
  id: string;
  description: string;
  image?: string;
  teamId: string;
  userId: string;
  comments?: Comment[] | null;
  likes?: Like[] | null;
}
