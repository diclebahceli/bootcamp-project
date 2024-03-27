"use client";
import Card from "@/app/Components/card";
import { Team } from "@/app/Models/team";
import { GetAllTeams, GetTeamByUserId } from "@/app/services/TeamService";
import { useEffect, useState } from "react";

async function getTeams(): Promise<Team[]> {
  return await GetAllTeams();
}
const Home = () => {
  // Sample card data
  const [userTeams, setUserTeams] = useState<Team[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const userTeamsData = {};

  useEffect(() => {
    async function fetchData() {
      try {
        const userId = localStorage.getItem("userId");
        if (userId != null) {
          const userTeamsData = await GetTeamByUserId(userId);
          const teamsData = await GetAllTeams();
          setUserTeams(userTeamsData);
          setTeams(teamsData);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    fetchData();
    console.log(userTeams);
    console.log(teams);
  }, []);

  useEffect(() => {
    // Access updated state variables here
    teams.forEach((team) => {
      if (userTeams.some((userTeam) => userTeam.id === team.id)) {
        console.log("Team exists in userTeams");
      }
    });
  }, [userTeams]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1 className="my-4">Welcome to Hobby Hub</h1>
        <button
          className="btn btn-primary align-self-center"
          style={{ height: "3em" }}
        >
          Create
        </button>
      </div>

      <div className="row">
        {teams.map((team) => (
          <Card
            community={team}
            userJoined={userTeams.some((userTeam) => userTeam.id === team.id)}
            key={team.id}
            {...team}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
