// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true, // Important to send/receive cookies
});

export default instance; 
