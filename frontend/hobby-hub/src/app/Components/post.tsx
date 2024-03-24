"use client";
import React from "react";
import { useState } from "react";
import { Post } from "../Models/post";
import { GetUserById } from "../services/UserService";
import { FaThumbsUp, FaComments } from "react-icons/fa";
import { User } from "../Models/user";

export default function Post({ post, user }: { post: Post; user: User }) {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };
  return (
    <div className="col-md-12 mb-4">
      <div className="card">
        <img src={post.Image} className="card-img-top" alt={user.name} />
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text">{post.Description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="btn btn-outline-primary mr-2"
                onClick={handleLikeClick}
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
