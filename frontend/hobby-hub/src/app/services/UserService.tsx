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

export async function GetUserById(id: number): Promise<User> {
  // console.log(typeof(id));
  // console.log(typeof(competitions[0].id));
  const user = await users.find((usr) => usr.id == id);
  if (user) {
    return user;
  }
  throw new Error(`User with id ${id} not found`);
}
