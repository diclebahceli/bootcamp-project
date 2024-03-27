"use client";
import { useState, useEffect } from "react";

import axios from "axios";
import { User } from "@/app/Models/user";
import {
  DeleteUser,
  GetUserById,
  UpdateUser,
} from "@/app/services/UserService";
import { useRouter } from "next/navigation";

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const [userData, setUserData] = useState<User>({} as User);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      try {
        const user = await GetUserById(userId);
        console.log("USSERRR", user);
        setUserData(user);
        setUsername(user.name);
        setEmail(user.email);
      } catch (error: Error | any) {
        throw new Error("Error fetching user from backend", error);
      }
    };
    fetchUser(params.id);
  }, []);

  const handleSave = async () => {
    try {
      const newUser: User = {
        id: userData.id,
        name: username,
        email: email,
        image: userData.image,
      };
      const updatedUser = await UpdateUser(newUser);
      router.back();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit User</h1>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditUserPage;
