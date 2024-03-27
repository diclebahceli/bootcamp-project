"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DeleteComment, GetAllComments } from "@/app/services/CommentService";
import { Comment } from "@/app/Models/comment";

const CommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (commentId: string) => {
    if (showConfirmation) {
      // Call the onDelete function to delete the user
      await DeleteComment(commentId);
      //reload window
      window.location.reload();
      // Hide the confirmation dialog
      setShowConfirmation(false);
    } else {
      // Show the confirmation dialog
      setShowConfirmation(true);
    }
  };

  // Function to fetch users from the backend API
  const fetchComments = async () => {
    try {
      const response = await GetAllComments();
      console.log(response);
      setComments(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleEditComment = (commentId: string) => {
    router.push(`/pages/admin/comments/editComment/${commentId}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Comment Page</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Owner ID</th>
            <th>Comment ID</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.userId}</td>
              <td>{comment.id}</td>
              <td>{comment.description}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditComment(comment.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>
                {showConfirmation && (
                  <div>
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={() => handleDelete(comment.id)}>
                      Yes
                    </button>
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

export default CommentsPage;
