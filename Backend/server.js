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

// Fake user for login
const user = {
  id: 1,
  email: "user@test.com",
  password: "123"
};

// Fake user-specific data
let userData = {
  id: 1,
  name: "John Doe",
  bio: "This is private bio only visible after login"
};

// Public route for everyone
app.get("/public", (req, res) => {
  res.json({ message: "Welcome to our platform! Here's some public data." });
});

//  Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    res.cookie("auth", true, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 // 1 hour
    });
    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

//  Auth status (to check if user is logged in)
app.get("/auth-status", (req, res) => {
  if (req.cookies.auth) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

//  Protected route (dashboard)
app.get("/protected", (req, res) => {
  if (req.cookies.auth) {
    return res.json({ message: "Welcome to your dashboard", data: userData });
  }
  res.status(401).json({ message: "Unauthorized" });
});

// Update user data route (edit after login)
app.post("/update-user", (req, res) => {
  if (req.cookies.auth) {
    const { name, bio } = req.body;
    userData.name = name;
    userData.bio = bio;
    return res.json({ message: "User data updated", data: userData });
  }
  res.status(401).json({ message: "Unauthorized" });
});

//  Logout route
app.post("/logout", (req, res) => {
  res.clearCookie("auth");
  res.json({ message: "Logged out" });
});

//  Start the server
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
