import axios from "axios";
import { User } from "../Models/user";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../utils/config";

export async function GetAllUsers(): Promise<User[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/User/GetAllUsers`
    );
    const responseData = response.data;

    const usersData = responseData.users;

    const users = usersData.map((userData: any): User => {
      return {
        id: userData.id,
        name: userData.fullName,
        email: userData.email,
        image: userData.image,
      };
    });

    // Return the array of teams
    return users;
  } catch (error) {
    console.error("Error fetching teams from backend:", error);
    throw error;
  }
}

export async function CreateUser(user: User): Promise<User> {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/User/CreateUser`,
      user
    );
    const responseData = response.data;
    return {
      id: responseData.user.id,
      name: responseData.user.fullName,
      email: responseData.user.email,
      image: responseData.user.image,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
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
