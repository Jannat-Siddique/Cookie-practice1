import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import { useUser } from "./UserContext";

export default function Dashboard() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Check auth
  useEffect(() => {
    axios
      .get("/auth-status")
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user);
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate, setUser]);

  // Fetch protected data
  useEffect(() => {
    axios
      .get("/protected")
      .then((res) => {
        setData(res.data.message);
        setLoading(false);
      })
      .catch(() => {
        setError("Unauthorized access.");
        setLoading(false);
        setTimeout(() => navigate("/login"), 2000);
      });
  }, [navigate]);

  const handleLogout = () => {
    axios.post("/logout").then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{error || data}</h2>

      {!error && user && (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={() => navigate("/profile")}>Go to Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
