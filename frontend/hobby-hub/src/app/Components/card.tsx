import { useRouter } from "next/navigation";
import React from "react";
import { Team } from "../Models/team";
import { AddUserToTeam } from "../services/UserService";

// Card component
export default function Card({
  community,
  userJoined,
}: {
  community: Team;
  userJoined?: boolean;
}) {
  const router = useRouter();

  const handleDetailsClick = () => {
    //add the competition id to the route
    router.push(`/pages/community/${community.id}`);
  };

  async function handleJoin(teamId: string) {
    // Add logic to handle joining a team
    try {
      const userId = localStorage.getItem("userId");
      if (userId != null) {
        await AddUserToTeam(userId, teamId);
        //reload window
        window.location.reload();
        console.log("Joining team");
      }
    } catch (error) {
      console.error("Error joining team:", error);
    }
  }

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src={community.image}
          className="card-img-top"
          alt={community.title}
        />
        <div className="card-body">
          <h5 className="card-title">{community.title}</h5>
          {userJoined ? (
            <button onClick={handleDetailsClick} className="btn btn-primary">
              Open
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => handleJoin(community.id)}
            >
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
