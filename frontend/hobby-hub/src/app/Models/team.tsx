import { Post } from "./post";
import { User } from "./user";

export interface Team {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  image: string;
  users?: User[] | null;
  posts?: Post[] | null;
}
