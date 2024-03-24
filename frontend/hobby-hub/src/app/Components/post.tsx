import { Post } from "../Models/post";
import { GetUserById } from "../services/UserService";
import { FaThumbsUp, FaComments } from "react-icons/fa";

export default async function Post({ post }: { post: Post }) {
  const userName = (await GetUserById(post.userId)).name;
  return (
    <div className="col-md-12 mb-4">
      <div className="card">
        <img src={post.Image} className="card-img-top" alt={userName} />
        <div className="card-body">
          <h5 className="card-title">{userName}</h5>
          <p className="card-text">{post.Description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <button className="btn btn-outline-primary mr-2">
                <FaThumbsUp /> Like
              </button>
              <button className="btn btn-outline-primary">
                <FaComments /> Comment
              </button>
            </div>
            {/* Add additional buttons or actions here */}
          </div>
        </div>
      </div>
    </div>
  );
}
