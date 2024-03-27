import Post from "@/app/Components/post";
import { GetAllPosts, GetPostByUserId } from "@/app/services/PostService";
import { GetUserById } from "@/app/services/UserService";

export default async function Comment({ params }: { params: { id: number } }) {
  const Comments = await GetAllPostsFromPostId(params.id);
  return (
    <div className="container">
      <h1 className="my-4">Comments</h1>
      {Comments.map(async (comment) => (
        <div className="row" key={comment.id}>
          <Comment
            post={comment}
            user={await GetUserById(comment.userId)}
            key={comment.id}
            {...comment}
          />
        </div>
      ))}
    </div>
  );
}
function GetAllPostsFromPostId(id: number) {
  throw new Error("Function not implemented.");
}
