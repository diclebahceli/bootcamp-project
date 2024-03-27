import { User } from "./user";

export interface Team {
  id: string;
  title: string;
  description: string;
  image: string;
  users: User[] | undefined;
}
