import { User } from "../Models/user";

const users: User[] = [
  {
    id: 1,
    name: "User 1",
    email: "",
    password: "",
    image: "",
  },
  {
    id: 2,
    name: "User 2",
    email: "",
    password: "",
    image: "",
  },
  {
    id: 3,
    name: "User 3",
    email: "",
    password: "",
    image: "",
  },
  {
    id: 4,
    name: "User 4",
    email: "",
    password: "",
    image: "",
  },
];

export async function GetAllUsers(): Promise<User[]> {
  return users;
}
