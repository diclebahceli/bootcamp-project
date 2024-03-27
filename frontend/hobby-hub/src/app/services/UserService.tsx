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

export async function GetUserById(id: string): Promise<User> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/User/GetUserById?Id=${id}`
    );
    const userData = response.data.user;
    return {
      id: userData.id,
      name: userData.fullName,
      email: userData.email,
      image: userData.image,
    };
  } catch (error: Error | any) {
    throw new Error("Error fetching user from backend ", error);
  }
}

export async function DeleteUser(id: string): Promise<void> {
  await axios.delete(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/User/DeleteUser?Id=${id}`
  );
}

export async function UpdateUser(user: User): Promise<void> {
  const { id, email, name } = user;
  const response = await axios.put(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/User/UpdateUser`,
    {
      id: id,
      email: email,
      fullname: name,
    }
  );
}

export async function AddUserToTeam(
  userId: string,
  teamId: string
): Promise<void> {
  await axios.put(`${NEXT_PUBLIC_BACKEND_API_URL}/api/User/AddUserToTeam`, {
    userId: userId,
    teamId: teamId,
  });
}

export async function RemoveUserFromTeam(
  userId: string,
  teamId: string
): Promise<void> {
  await axios.put(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/User/RemoveUserFromTeam`,
    {
      userId: userId,
      teamId: teamId,
    }
  );
}
