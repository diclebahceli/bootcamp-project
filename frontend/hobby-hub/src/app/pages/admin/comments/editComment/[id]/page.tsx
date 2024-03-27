"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Comment } from "@/app/Models/comment";
import { GetCommentById, UpdateComment } from "@/app/services/CommentService";

const EditCommentPage = ({ params }: { params: { id: string } }) => {
  const [commentData, setCommentData] = useState<Comment>({} as Comment);
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchComment = async (commentId: string) => {
      try {
        const comment = await GetCommentById(commentId);
        setCommentData(comment);
        console.log("COMMENT", comment);
        setContent(comment.description);
      } catch (error: Error | any) {
        throw new Error("Error fetching user from backend", error);
      }
    };
    fetchComment(params.id);
  }, []);

  const handleSave = async () => {
    try {
      const newComment: Comment = {
        id: commentData.id,
        description: content,
        userId: commentData.userId,
        postId: commentData.postId,
      };
      console.log("NEW COMMENT", newComment);
      const updatedComment = await UpdateComment(newComment);
      router.back();
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Comment</h1>
      <div className="form-group">
        <label htmlFor="fullName">Comment Content</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
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

export default EditCommentPage;
