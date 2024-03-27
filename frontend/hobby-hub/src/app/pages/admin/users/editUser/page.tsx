import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EditUserPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`); // Replace '/api/users/${userId}' with your actual endpoint
      setUserData(response.data); // Assuming response.data contains the user data
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${userId}`, userData); // Replace '/api/users/${userId}' with your actual endpoint
      // Redirect to users page after saving
      router.push("/admin/users");
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
          value={userData.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditUserPage;
