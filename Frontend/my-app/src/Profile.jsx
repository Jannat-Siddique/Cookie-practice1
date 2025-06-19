import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import { useUser } from "./UserContext";

export default function Profile() {
  const { user, setUser } = useUser();
  const [role, setRole] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/protected") // This will send the cookie automatically
      .then((res) => {
        setProfileData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load profile. Please log in.");
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    console.log("Saved role:", role);
    // Optionally save to backend/localStorage
  };

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Name:</strong> {profileData?.name}</p>
      <p><strong>Bio:</strong> {profileData?.bio}</p>

      <label>
        Select Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Choose...</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>
      </label>
      <br />
      <button onClick={handleSave}>Save Role</button>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
