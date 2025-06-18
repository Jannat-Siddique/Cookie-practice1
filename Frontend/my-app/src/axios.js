// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // or whatever your backend port is
  withCredentials: true,
});

export default instance; // ✅ make sure to export default
