import React, { useEffect, useState } from "react";
import axios from "./axios";

export default function Home() {
  const [publicData, setPublicData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  
 useEffect(() => {
  axios
    .get("/public")
    .then((res) => {
      console.log("✅ Public data received:", res.data); // ← log this
      setPublicData(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("❌ Error fetching /public:", err);
      setError("Failed to load public data");
      setLoading(false);
    });
}, []);



  if (loading) return <p>Loading public content...</p>;

  return (
    <div>
      <h2>Home Page</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <p><strong>Message:</strong> {publicData?.message}</p>
          <p><strong>Info:</strong> {publicData?.info}</p>
        </>
      )}
    </div>
  );
}
