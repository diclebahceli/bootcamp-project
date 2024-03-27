"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { PostModel } from "../Models/post";
import { GetUserById } from "../services/UserService";
import { FaThumbsUp, FaComments } from "react-icons/fa";
import { User } from "../Models/user";
import { GetPostById, LikePost } from "../services/PostService";
import { Like } from "../Models/like";

export default function Post({ post, user }: { post: PostModel; user: User }) {
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setlikes] = useState<Like[]>([]);
  const [tempLikeCount, setTempLikeCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const like: Like = {
          postId: post.id,
          userId: user.id,
        };
        await LikePost(like);
        const likeCount = await GetPostById(post.id);

        setlikes(likeCount.likes || []);
        setLikeCount(likes.length);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    }
    fetchData();
  }, [tempLikeCount]);

  return (
    <div className="col-md-12 mb-4">
      <div className="card">
        <img className="card-img-top" alt={user.name} />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{post.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="btn btn-outline-primary mr-2"
                onClick={() => setTempLikeCount(likeCount + 1)}
              >
                <FaThumbsUp />
                {likeCount} Like
              </button>
              <button className="btn btn-outline-primary">
                <FaComments /> Comment
              </button>
            </div>
            {/* Add additional buttons or actions here */}
          </div>
        </div>
      </div>
    </div>
  );
}
