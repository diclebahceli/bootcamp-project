import { Post } from "../Models/post";

export default function Post({ post }: { post: Post }) {
  const userName = getUserById(post.userId).name;
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={post.Image} className="card-img-top" alt={userName} />
        <div className="card-body">
          <h5 className="card-title">{userName}</h5>
          <p className="card-text">{post.Description}</p>
          <button className="btn btn-primary mr-2">Like</button>
          <button className="btn btn-primary">Command</button>
        </div>
      </div>
    </div>
  );
}
