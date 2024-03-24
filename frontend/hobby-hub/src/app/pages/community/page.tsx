import Post from "@/app/Components/post";
import { GetAllPosts } from "@/app/services/PostService";

export default async function CommunicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const Posts = await GetAllPosts();
  return (
    <div className="container">
      <h1 className="my-4">Communication Detail Page</h1>
      <div className="row">
        {Posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
