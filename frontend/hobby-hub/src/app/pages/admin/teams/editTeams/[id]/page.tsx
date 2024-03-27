"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostModel } from "@/app/Models/post";
import { GetPostById, UpdatePost } from "@/app/services/PostService";
import { Team } from "@/app/Models/team";
import { GetTeamById, UpdateTeam } from "@/app/services/TeamService";

const EditTeamPage = ({ params }: { params: { id: string } }) => {
  const [teamData, setTeamData] = useState<Team>({} as Team);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchPost = async (teamId: string) => {
      try {
        const team = await GetTeamById(teamId);
        setTeamData(team);
        console.log("TEAM", team);
        setContent(team.description);
        setTitle(team.title);
      } catch (error: Error | any) {
        throw new Error("Error fetching user from backend", error);
      }
    };
    fetchPost(params.id);
  }, []);

  const handleSave = async () => {
    try {
      const newTeam: Team = {
        id: teamData.id,
        title: title,
        description: content,
        ownerId: teamData.ownerId,
      };
      console.log("NEW team", newTeam);
      const updatedTeam = await UpdateTeam(newTeam);
      router.back();
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Team</h1>

      <div className="form-group">
        <label htmlFor="fullName">Team Title</label>
        <input
          type="text"
          className="form-control"
          id="content"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fullName">Team Description</label>
        <input
          type="text"
          className="form-control"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditTeamPage;
