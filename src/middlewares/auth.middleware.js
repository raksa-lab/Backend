import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};


// export const protect = (req, res, next) => {
//   // TEMP mock user (replace later with JWT / Supabase Auth)
//   req.user = {
//     id: "admin-id",
//     role: "admin"
//   };
//   next();
// };



// import { supabase, supabaseAdmin } from "../services/supabase.service.js";

// /* =========================
//    PROTECT (JWT FROM SUPABASE)
// ========================= */
// export const protect = async (req, res, next) => {
//   const token = req.headers.authorization?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const { data, error } = await supabase.auth.getUser(token);

//   if (error || !data?.user) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   req.user = data.user; // auth.users
//   next();
// };

// /* =========================
//    ADMIN ONLY
// ========================= */
// export const adminOnly = async (req, res, next) => {
//   const { data } = await supabaseAdmin
//     .from("users")
//     .select("role, is_active")
//     .eq("uuid", req.user.id)
//     .single();

//   if (!data?.is_active) {
//     return res.status(403).json({ message: "Account disabled" });
//   }

//   if (data.role !== "admin") {
//     return res.status(403).json({ message: "Admin only" });
//   }

//   next();
// };
