"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostModel } from "@/app/Models/post";
import { GetPostById, UpdatePost } from "@/app/services/PostService";

const EditPostPage = ({ params }: { params: { id: string } }) => {
  const [postData, setPostData] = useState<PostModel>({} as PostModel);
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async (postId: string) => {
      try {
        const post = await GetPostById(postId);
        setPostData(post);
        console.log("POST", post);
        setContent(post.description);
      } catch (error: Error | any) {
        throw new Error("Error fetching user from backend", error);
      }
    };
    fetchPost(params.id);
  }, []);

  const handleSave = async () => {
    try {
      const newPost: PostModel = {
        id: postData.id,
        description: content,
        teamId: postData.teamId,
        userId: postData.userId,
      };
      console.log("NEW Post", newPost);
      const updatedComment = await UpdatePost(newPost);
      router.back();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <div className="form-group">
        <label htmlFor="fullName">Post Content</label>
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

export default EditPostPage;
