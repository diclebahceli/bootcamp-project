import axios from "axios";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../utils/config";
import { PostModel } from "../Models/post";
import { Comment } from "../Models/comment";
import { Like } from "../Models/like";

export async function GetAllComments(): Promise<Comment[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Comment/GetAllComments`
    );
    const responseData = response.data;

    const CommentsData = responseData.comments;

    const Comments = CommentsData.map(
      (CommentData: any): Comment => ({
        id: CommentData.id,
        description: CommentData.description,
        userId: CommentData.userId,
        postId: CommentData.postId,
      })
    );

    return Comments;
  } catch (error) {
    console.error("Error fetching Comments from backend:", error);
    throw error;
  }
}

export async function GetCommentById(id: string): Promise<Comment> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Comment/GetCommentById?CommentId=${id}`
    );
    const CommentData = response.data.comment;

    const newComment: Comment = {
      id: CommentData.id,
      description: CommentData.description,
      userId: CommentData.userId,
      postId: CommentData.postId,
    };
    return newComment;
  } catch (error: Error | any) {
    throw new Error("Error fetching Comment from backend ", error);
  }
}

export async function GetCommentsByPostId(id: string): Promise<Comment[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Comment/GetCommentsByTeamId?id=${id}`
    );
    const responseData = response.data;

    const CommentsData = responseData.comments;

    const Comments = CommentsData.map(
      (CommentData: any): Comment => ({
        id: CommentData.id,
        description: CommentData.description,
        userId: CommentData.userId,
        postId: CommentData.postId,
      })
    );

    return Comments;
  } catch (error: Error | any) {
    throw new Error("Error fetching Comments from backend:", error);
  }
}

export async function AddComment(Comment: Comment): Promise<Comment> {
  const { postId, description, userId } = Comment;
  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Comment/CreateComment`,
    {
      description: description,
      userId: userId,
      postId: postId,
    }
  );
  const CommentData = response.data.Comment;
  const newComment: Comment = {
    id: CommentData.id,
    userId: CommentData.userId,
    description: CommentData.description,
    postId: CommentData.postId,
  };
  return newComment;
}

export async function UpdateComment(Comment: Comment): Promise<Comment> {
  const { id, description } = Comment;
  const response = await axios.put(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Comment/UpdateComment`,
    {
      id: id,
      description: description,
    }
  );
  const CommentData = response.data.comment;
  const updatedComment: Comment = {
    id: CommentData.id,
    userId: CommentData.userId,
    description: CommentData.description,
    postId: CommentData.postId,
  };
  return updatedComment;
}

export async function DeleteComment(id: string): Promise<void> {
  await axios.delete(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Comment/DeleteComment?Id=${id}`
  );
}
