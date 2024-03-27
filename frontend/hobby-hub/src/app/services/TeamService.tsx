import axios from "axios";
import { Team } from "../Models/team";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../utils/config";

export async function GetAllTeams(): Promise<Team[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Team/GetAllTeams`
    );
    const responseData = response.data;

    const teamsData = responseData.teams;

    const teams = teamsData.map(
      (teamData: any): Team => ({
        id: teamData.id,
        title: teamData.title,
        description: teamData.description,
        ownerId: teamData.ownerId,
        image: teamData.image,
      })
    );

    // Return the array of teams
    return teams;
  } catch (error) {
    console.error("Error fetching teams from backend:", error);
    throw error;
  }
}

export async function GetTeamById(id: number): Promise<Team> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Team/GetTeamById?Id=${id}`
    );
    const teamData = response.data.team;
    const posts = response.data.posts;
    const users = response.data.users;

    const team: Team = {
      id: teamData.id,
      title: teamData.title,
      description: teamData.description,
      ownerId: teamData.ownerId,
      image: teamData.image,
      users: users,
      posts: posts,
    };
    return team;
  } catch (error: Error | any) {
    throw new Error("Error fetching team from backend ", error);
  }
}

export async function GetTeamsByUserId(id: string): Promise<Team[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Team/GetTeamsByUserId?UserId=${id}`
    );
    const responseData = response.data;

    const teamsData = responseData.teams;

    const teams = teamsData.map((teamData: any) => ({
      id: teamData.id,
      title: teamData.title,
      description: teamData.description,
      startDate: teamData.startDate,
      image: teamData.image,
    }));

    return teams;
  } catch (error: Error | any) {
    throw new Error("Error fetching teams from backend:", error);
  }
}

export async function AddTeam(team: Team): Promise<Team> {
  const { title, description, ownerId, image } = team;
  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Team/CreateTeam`,
    {
      title: title,
      description: description,
      ownerId: ownerId,
      image: image,
    }
  );
  const teamData = response.data.team;
  const newTeam: Team = {
    id: teamData.id,
    title: teamData.title,
    description: teamData.description,
    ownerId: teamData.ownerId,
    image: teamData.image,
  };
  return newTeam;
}

export async function UpdateTeam(team: Team): Promise<Team> {
  const { id, title, description, image } = team;
  const response = await axios.put(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Team/UpdateTeam`,
    {
      id: id,
      title: title,
      description: description,
      image: image,
    }
  );
  const teamData = response.data.team;
  const updatedTeam: Team = {
    id: teamData.id,
    title: teamData.title,
    description: teamData.description,
    ownerId: teamData.ownerId,
    image: teamData.image,
  };
  return updatedTeam;
}

export async function DeleteTeam(id: number): Promise<void> {
  await axios.delete(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Team/DeleteTeam?Id=${id}`
  );
}

// Path: hobby-hub/src/app/services/TeamService.tsx
