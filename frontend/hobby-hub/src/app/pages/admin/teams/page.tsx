"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeleteComment, GetAllComments } from "@/app/services/CommentService";
import { DeletePost, GetAllPosts } from "@/app/services/PostService";
import { Team } from "@/app/Models/team";
import { GetAllTeams } from "@/app/services/TeamService";

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (teamId: string) => {
    if (showConfirmation) {
      await DeletePost(teamId);
      window.location.reload();
      setShowConfirmation(false);
    } else {
      setShowConfirmation(true);
    }
  };

  // Function to fetch users from the backend API
  const fetchTeams = async () => {
    try {
      const response = await GetAllTeams();
      console.log(response);
      setTeams(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleEditTeam = (teamId: string) => {
    router.push(`/pages/admin/teams/editTeams/${teamId}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Team Page</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Owner ID</th>
            <th>Team ID</th>
            <th>Team Title</th>
            <th>Team Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.ownerId}>
              <td>{team.ownerId}</td>
              <td>{team.id}</td>
              <td>{team.title}</td>
              <td>{team.description}</td>

              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditTeam(team.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(team.id)}
                >
                  Delete
                </button>
                {showConfirmation && (
                  <div>
                    <p>Are you sure you want to delete this team?</p>
                    <button onClick={() => handleDelete(team.id)}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>
                      No
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsPage;
