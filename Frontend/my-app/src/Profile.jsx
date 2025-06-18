import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import { UserContext } from "./UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Saved role:", role);
    // Optionally: Save to backend/localStorage
  };

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => {
        setUser(null); // clear user context
        navigate("/login"); // redirect
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user?.email}</p>

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
