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

export async function AddUser(user: User): Promise<User> {
  users.push(user);
  return user;
}

export async function GetUserByEmail(email: string): Promise<User> {
  const user = await users.find((usr) => usr.email == email);
  if (user) {
    return user;
  }
  throw new Error(`User with id ${email} not found`);
}

export async function DeleteUser(id: number): Promise<User[]> {
  const user = await users.filter((usr) => usr.id != id);
  if (user) {
    return user;
  }
  throw new Error(`User with id ${id} not found`);
}

export async function UpdateUser(user: User): Promise<User> {
  const userIndex = users.findIndex((usr) => usr.id == user.id);
  if (userIndex !== -1) {
    users[userIndex] = user;
    return user;
  }
  throw new Error(`User with id ${user.id} not found`);
}

export async function GetUserByCommunityId(
  communityId: number
): Promise<User[]> {
  const user = await users.filter((usr) => usr.id == communityId);

  if (user) {
    return user;
  }
  throw new Error(`User with id ${communityId} not found`);
}

export async function GetUserByPostId(postId: number): Promise<User[]> {
  const user = await users.filter((usr) => usr.id == postId);

  if (user) {
    return user;
  }
  throw new Error(`User with id ${postId} not found`);
}

export async function GetUserByCommentId(commentId: number): Promise<User[]> {
  const user = await users.filter((usr) => usr.id == commentId);

  if (user) {
    return user;
  }
  throw new Error(`User with id ${commentId} not found`);
}
