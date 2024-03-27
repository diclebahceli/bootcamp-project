"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeleteComment, GetAllComments } from "@/app/services/CommentService";
import { PostModel } from "@/app/Models/post";
import { DeletePost, GetAllPosts } from "@/app/services/PostService";

const PostsPage = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (postId: string) => {
    if (showConfirmation) {
      await DeletePost(postId);
      window.location.reload();
      setShowConfirmation(false);
    } else {
      setShowConfirmation(true);
    }
  };

  // Function to fetch users from the backend API
  const fetchPosts = async () => {
    try {
      const response = await GetAllPosts();
      console.log(response);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditPost = (postId: string) => {
    router.push(`/pages/admin/posts/editPost/${postId}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Post Page</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Owner ID</th>
            <th>Team ID</th>
            <th>Post ID</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.userId}>
              <td>{post.userId}</td>
              <td>{post.teamId}</td>
              <td>{post.id}</td>
              <td>{post.description}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditPost(post.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
                {showConfirmation && (
                  <div>
                    <p>Are you sure you want to delete this post?</p>
                    <button onClick={() => handleDelete(post.id)}>Yes</button>
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

export default PostsPage;
