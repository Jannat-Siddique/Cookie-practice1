import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import axios from "./axios";

export default function Dashboard() {
  const [data, setData] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("/protected")
      .then((res) => setData(res.data.message))
      .catch(() => setData("Unauthorized"));
  }, []);

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


  return (<div>
      <h2>{data}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>);
}
