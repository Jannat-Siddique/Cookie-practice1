import React from "react";
import { useEffect, useState } from "react";
import axios from "./axios";

export default function Home() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/public")
      .then((res) => {
        console.log("Response:", res);
        setData(res.data.message);
      })
      .catch((err) => {
        console.error("Error fetching /public:", err);
        setError("Failed to load public data");
      });
  }, []);

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return <h2>{data}</h2>;
}
