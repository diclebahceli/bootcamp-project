import Post from "@/app/Components/post";
import { GetAllPosts, GetPostByUserId } from "@/app/services/PostService";
import { GetUserById } from "@/app/services/UserService";

export default async function Community({
  params,
}: {
  params: { id: number };
}) {
  const Posts = await GetPostByUserId(params.id);
  return (
    <div className="container">
      <h1 className="my-4">Communication Detail Page</h1>
      {Posts.map(async (post) => (
        <div className="row" key={post.id}>
          <Post
            post={post}
            user={await GetUserById(post.userId)}
            key={post.id}
            {...post}
          />
        </div>
      ))}
    </div>
  );
}
