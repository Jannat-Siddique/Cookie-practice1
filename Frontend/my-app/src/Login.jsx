import { useState } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("/login", { email, password });
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };
axios.post("http://localhost:5000/login", {
  email,
  password,
}, {
  withCredentials: true 
})

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
