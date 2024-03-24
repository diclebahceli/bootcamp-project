import Post from "@/app/Components/post";
import { GetAllPosts, GetPostByUserId } from "@/app/services/PostService";

export default async function Community({
  params,
}: {
  params: { id: string };
}) {
  const Posts = await GetPostByUserId(params.id);
  return (
    <div className="container">
      <h1 className="my-4">Communication Detail Page</h1>
      {Posts.map((post) => (
        <div className="row" key={post.id}>
          <Post post={post} key={post.id} {...post} />
        </div>
      ))}
    </div>
  );
}
