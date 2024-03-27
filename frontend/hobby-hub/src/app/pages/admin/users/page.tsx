"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { DeleteUser, GetAllUsers } from "@/app/services/UserService";
import { User } from "@/app/Models/user";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedId, setDeletedId] = useState<string>();

  const handleDelete = async (userId: string) => {
    setDeletedId(userId);
    if (showConfirmation) {
      // Call the onDelete function to delete the user
      await DeleteUser(userId);
      //reload window
      window.location.reload();
      // Hide the confirmation dialog
      setShowConfirmation(false);
    } else {
      // Show the confirmation dialog
      setShowConfirmation(true);
    }
  };

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

  const handleEditUser = (userId: string) => {
    router.push(`/pages/admin/users/editUser/${userId}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Users Page</h1>
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
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                {showConfirmation && deletedId === user.id ? (
                  <div>
                    <p>Are you sure you want to delete this user?</p>
                    <button onClick={() => handleDelete(user.id)}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>
                      No
                    </button>
                  </div>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
