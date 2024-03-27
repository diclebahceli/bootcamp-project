"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreateUser, GetAllUsers } from "@/app/services/UserService";
import { User } from "@/app/Models/user";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  // Function to fetch users from the backend API
  const fetchUsers = async () => {
    try {
      const response = await GetAllUsers();
      console.log(response);
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (userId: string) => {};

  function handleCreateUser() {
    router.push("/admin/users/createUser");
  }

  const handleDeleteUser = async (userId: string) => {
    console.log("Delete user:", userId);
    // Add your delete user logic here
    try {
      // Example: Sending a DELETE request to delete the user
      await axios.delete(`/api/users/${userId}`); // Replace '/api/users/${userId}' with your actual delete endpoint
      // If successful, you may want to re-fetch the users list or update the state accordingly
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Users Page</h1>
        <button
          className="btn btn-primary"
          onClick={() => handleCreateUser()}
          style={{ height: "3em" }}
        >
          Create
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEditUser(user.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
