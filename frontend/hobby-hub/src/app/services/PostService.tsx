import axios from "axios";
import { NEXT_PUBLIC_BACKEND_API_URL } from "../utils/config";
import { Post } from "../Models/post";
import { Comment } from "../Models/comment";
import { Like } from "../Models/like";

export async function GetAllPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/GetAllPosts`
    );
    const responseData = response.data;

    const postsData = responseData.posts;

    const Posts = postsData.map(
      (PostData: any): Post => ({
        id: PostData.id,
        communityId: PostData.teamId,
        description: PostData.description,
        userId: PostData.userId,
        image: PostData.image,
      })
    );

    return Posts;
  } catch (error) {
    console.error("Error fetching Posts from backend:", error);
    throw error;
  }
}

export async function GetPostById(id: number): Promise<Post> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/GetPostById?Id=${id}`
    );
    const PostData = response.data.post;
    const comments = response.data.comments.map(
      (comment: any): Comment => ({
        id: comment.id,
        postId: comment.postId,
        userId: comment.userId,
        description: comment.description,
      })
    );
    const likes = response.data.likes.map(
      (like: any): Like => ({
        userId: like.userId,
        postId: like.postId,
      })
    );

    const Post: Post = {
      id: PostData.id,
      communityId: PostData.teamId,
      description: PostData.description,
      userId: PostData.userId,
      image: PostData.image,
      comments: comments,
      likes: likes,
    };
    return Post;
  } catch (error: Error | any) {
    throw new Error("Error fetching Post from backend ", error);
  }
}

export async function GetPostsByTeamId(id: string): Promise<Post[]> {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/GetPostsByTeamId?id=${id}`
    );
    const responseData = response.data;

    const postsData = responseData.posts;

    const Posts = postsData.map(
      (PostData: any): Post => ({
        id: PostData.id,
        communityId: PostData.teamId,
        description: PostData.description,
        userId: PostData.userId,
        image: PostData.image,
      })
    );

    return Posts;
  } catch (error: Error | any) {
    throw new Error("Error fetching Posts from backend:", error);
  }
}

export async function AddPost(Post: Post): Promise<Post> {
  const { description, communityId, userId } = Post;
  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/CreatePost`,
    {
      description: description,
      userId: userId,
      teamId: communityId,
    }
  );
  const PostData = response.data.post;
  const newPost: Post = {
    id: PostData.id,
    userId: PostData.userId,
    description: PostData.description,
    communityId: PostData.teamId,
    image: PostData.image,
  };
  return newPost;
}

export async function UpdatePost(Post: Post): Promise<Post> {
  const { id, description } = Post;
  const response = await axios.put(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/UpdatePost`,
    {
      id: id,
      description: description,
    }
  );
  const PostData = response.data.post;
  const updatedPost: Post = {
    id: PostData.id,
    userId: PostData.userId,
    description: PostData.description,
    communityId: PostData.teamId,
    image: PostData.image,
  };
  return updatedPost;
}

export async function DeletePost(id: number): Promise<void> {
  await axios.delete(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/DeletePost?Id=${id}`
  );
}

export async function LikePost(like: Like): Promise<void> {
  const { postId, userId } = like;
  const response = await axios.post(
    `${NEXT_PUBLIC_BACKEND_API_URL}/api/Post/LikePost`,
    {
      postId: postId,
      userId: userId,
    }
  );
}
// Path: hobby-hub/src/app/services/PostService.tsx
