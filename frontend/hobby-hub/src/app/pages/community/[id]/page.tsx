"use client";
import Post from "@/app/Components/post";
import { PostModel } from "@/app/Models/post";
import { User } from "@/app/Models/user";
import { GetAllPosts, GetPostsByTeamId } from "@/app/services/PostService";
import { GetUserById } from "@/app/services/UserService";
import { useEffect, useState } from "react";

export default function Community({ params }: { params: { id: string } }) {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const userTeamsData = await GetPostsByTeamId(params.id);
        console.log("DATA", userTeamsData);
        userTeamsData.forEach(async (post) => {
          let user = await GetUserById(post.userId);
          setUsers([...users, user]);
        });
        setPosts(userTeamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Communication Detail Page</h1>
      {posts.map((post) => (
        <div className="row" key={post.id}>
          <Post
            post={post}
            user={users.find((user) => user.id === post.userId) || ({} as User)}
            key={post.id}
            {...post}
          />
        </div>
      ))}
    </div>
  );
}
