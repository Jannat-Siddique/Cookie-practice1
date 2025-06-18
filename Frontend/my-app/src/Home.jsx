import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Home() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/public")
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.error("Error fetching /public:", err);
        setError("Failed to load public data");
      });
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
}
