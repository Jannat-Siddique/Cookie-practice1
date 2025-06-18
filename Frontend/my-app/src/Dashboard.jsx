import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";

export default function Dashboard() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/protected")
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.error("Error fetching protected data:", err);
        setError("Unauthorized access. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <div>
      <h2>{error ? error : data}</h2>
       <button onClick={() => navigate("/profile")}>Go to Profile</button>
      {!error && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
