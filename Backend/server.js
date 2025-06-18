import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
const PORT = 5000;



app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));



// Public Route
app.get("/public", (req, res) => {
  res.json({ message: "This is public data" });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Fake user for testing
  const user = {
    email: "user@test.com",
    password: "123",
  };

  if (email === user.email && password === user.password) {
    res.cookie("auth", true, { httpOnly: true });
    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});


// Auth check route (for frontend use)
app.get("/auth-status", (req, res) => {
  if (req.cookies.auth === "logged_in") {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Protected Route
app.get("/protected", (req, res) => {
  if (req.cookies.auth) {
    return res.json({ message: "Welcome to your dashboard" });
  }
  res.status(401).json({ message: "Unauthorized" });
});


// Logout Route
app.post("/logout", (req, res) => {
  res.clearCookie("auth");
  res.json({ message: "Logged out" });
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
