import PostDetailsAndComments from "@/app/Components/comments";
import { Comment } from "@/app/Models/comment";
import { Post } from "@/app/Models/post";
import { GetPostById } from "@/app/services/PostService";
import { GetUserById } from "@/app/services/UserService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post({ postId }: { postId: number }) {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const post = await GetPostById(postId);
      setPost(post);
      const user = await GetUserById(post.userId);
      setUser(user);
      const comments = await GetCommentsByPostId(postId);
      setComments(comments);
    };
    fetchData();
  }, [postId]);

  return (
    <div className="col-md-12 mb-4">
      <div className="card">
        <img src={post?.Image} className="card-img-top" alt={user?.name} />
        <div className="card-body">
          <h5 className="card-title">{user?.name}</h5>
          <p className="card-text">{post?.Description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-outline-primary mr-2">
                <FaThumbsUp />
                {post?.likeCount} Like
              </button>
              <button className="btn btn-outline-primary">
                <FaComments /> Comment
              </button>
            </div>
            {/* Add additional buttons or actions here */}
          </div>
        </div>
      </div>
      <PostDetailsAndComments comments={comments} />
    </div>
  );
}
