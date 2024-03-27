import { useRouter } from "next/navigation";
import React from "react";
import { Team } from "../Models/team";

// Card component
export default function Card({
  community,
  userJoined,
}: {
  community: Team;
  userJoined?: boolean;
}) {
  const router = useRouter();

  const handleDetailsClick = () => {
    //add the competition id to the route
    router.push(`/pages/community/${community.id}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img
          src={community.image}
          className="card-img-top"
          alt={community.title}
        />
        <div className="card-body">
          <h5 className="card-title">{community.title}</h5>
          {userJoined ? (
            <button className="btn btn-primary">Open</button>
          ) : (
            <button className="btn btn-primary">Join</button>
          )}
        </div>
      </div>
    </div>
  );
}
