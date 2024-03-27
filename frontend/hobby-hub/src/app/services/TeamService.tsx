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

    const teams = teamsData.map((teamData: any) => ({
      id: teamData.id,
      title: teamData.title,
      description: teamData.description,
      startDate: teamData.startDate,
      image: teamData.image,
    }));

    // Return the array of teams
    return teams;
  } catch (error) {
    console.error("Error fetching teams from backend:", error);
    throw error;
  }
}

export async function GetTeamById(id: number): Promise<Team> {
  // console.log(typeof(id));
  // console.log(typeof(competitions[0].id));
  const team = await teams.find((comp) => comp.id == id);
  if (team) {
    return team;
  }
  throw new Error(`Team with id ${id} not found`);
}

export async function GetTeamByUserId(id: string): Promise<Team[]> {
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

    // Return the array of teams
    return teams;
  } catch (error) {
    console.error("Error fetching teams from backend:", error);
    throw error;
  }
}

export async function GetTeamByTitle(title: string): Promise<Team> {
  const team = await teams.find((comp) => comp.title == title);
  if (team) {
    return team;
  }
  throw new Error(`Competition with id ${title} not found`);
}

export async function AddTeam(team: Team): Promise<Team> {
  teams.push(team);
  return team;
}

export async function UpdateTeam(team: Team): Promise<Team> {
  const index = teams.findIndex((comp) => comp.id == team.id);
  if (index != -1) {
    teams[index] = team;
    return team;
  }
  throw new Error(`Team with id ${team.id} not found

`);
}

export async function DeleteTeam(id: number): Promise<void> {
  const index = teams.findIndex((comp) => comp.id == id);
  if (index != -1) {
    teams.splice(index, 1);
    return;
  }
  throw new Error(`Team with id ${id} not found`);
}

// Path: hobby-hub/src/app/services/TeamService.tsx
