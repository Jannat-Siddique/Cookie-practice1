import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;
const SECRET = "mysecretkey"; // In real apps, use .env

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Fake user
const user = {
  id: 1,
  email: "user@test.com",
  password: "123"
};

let userData = {
  id: 1,
  name: "John Doe",
  bio: "This is private bio only visible after login"
};

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
    return res.json({ token, message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// Auth middleware
const authenticate = (req, res, next) => {
  const rawCookie = req.headers.cookie || "";
  const tokenMatch = rawCookie.split("; ").find(c => c.startsWith("token="));
  const token = tokenMatch?.split("=")[1];

  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Protected routes
app.get("/auth-status", authenticate, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Welcome to your dashboard", data: userData });
});

app.post("/update-user", authenticate, (req, res) => {
  const { name, bio } = req.body;
  userData.name = name;
  userData.bio = bio;
  res.json({ message: "User data updated", data: userData });
});

app.post("/logout", (req, res) => {
  res.json({ message: "Logged out. Clear cookie on frontend." });
});

// Public route
app.get("/public", (req, res) => {
  res.json({
    message: "Welcome to the public page!",
    info: "This content is visible to all visitors — no login needed."
  });
});



app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
