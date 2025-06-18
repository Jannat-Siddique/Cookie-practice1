import { useEffect, useState } from "react";
import axios from "./axios";

export default function Dashboard() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("/protected")
      .then((res) => setData(res.data.message))
      .catch(() => setData("Unauthorized"));
  }, []);

  return <h2>{data}</h2>;
}
