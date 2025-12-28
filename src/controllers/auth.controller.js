import { supabase, supabaseAdmin } from "../services/supabase.service.js";
import jwt from "jsonwebtoken";

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 1️⃣ Login with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Get user profile from public.users
    const { data: user, error: profileError } = await supabaseAdmin
      .from("users")
      .select("id, first_name, last_name, username, email, role, is_active")
      .eq("id", data.user.id)
      .single();

    if (profileError || !user) {
      return res.status(500).json({ message: "User profile not found" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Account disabled by admin" });
    }

    // 3️⃣ Issue JWT (store id + role)
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};

/* =========================
   REGISTER (AUTO USER)
========================= */
export const register = async (req, res) => {
  const { email, password, first_name, last_name, username } = req.body;

  if (!email || !password || !first_name || !last_name || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1️⃣ Create user in Supabase Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error || !data?.user) {
      return res.status(400).json({ message: error?.message || "Auth error" });
    }

    // 2️⃣ Insert profile into public.users
    const { error: profileError } = await supabaseAdmin.from("users").insert({
      id: data.user.id, // UUID from auth.users
      email,
      first_name,
      last_name,
      username,
      role: "user",     // ALWAYS user by default
      is_active: true,
    });

    if (profileError) {
      return res.status(500).json({
        message: "Profile creation failed",
        detail: profileError.message,
      });
    }

    return res.status(201).json({
      message: "User registered successfully",
      role: "user",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

/* =========================
   JWT PROTECT MIDDLEWARE
========================= */
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Token verification failed" });
  }
};

/* =========================
   ADMIN ONLY MIDDLEWARE
========================= */
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};
