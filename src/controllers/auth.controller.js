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






// import { supabase, supabaseAdmin } from "../services/supabase.service.js";
// import jwt from "jsonwebtoken";

// /* =========================
//    LOGIN
// ========================= */
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error || !data?.user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // 2️⃣ Get user profile from public.users
//     const { data: user, error: profileError } = await supabaseAdmin
//       .from("users")
//       .select("*") // Select all columns from your table
//       .eq("id", data.user.id)
//       .single();

//     if (profileError || !user) {
//       return res.status(500).json({ message: "User profile not found" });
//     }

//     if (!user.is_active) {
//       return res.status(403).json({ message: "Account disabled by admin" });
//     }

//     // 3️⃣ Issue JWT
//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: user.role,
//         email: user.email
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     return res.json({
//       success: true,
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         is_active: user.is_active,
//         created_at: user.created_at
//       }
//     });
//   } catch (err) {
//     console.error("LOGIN ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error during login" 
//     });
//   }
// };

// /* =========================
//    REGISTER
// ========================= */
// export const register = async (req, res) => {
//   const { email, password, name } = req.body;

//   if (!email || !password || !name) {
//     return res.status(400).json({ 
//       success: false,
//       message: "All fields are required" 
//     });
//   }

//   try {
//     // 1️⃣ Check if user already exists
//     const { data: existingUser } = await supabaseAdmin
//       .from("users")
//       .select("id")
//       .eq("email", email)
//       .single();

//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false,
//         message: "User with this email already exists" 
//       });
//     }

//     // 2️⃣ Create user in Supabase Auth
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           name: name
//         },
//         emailRedirectTo: `${process.env.FRONTEND_URL}/verify-success`
//       }
//     });

//     if (error) {
//       return res.status(400).json({ 
//         success: false,
//         message: error.message || "Registration failed" 
//       });
//     }

//     // 3️⃣ Insert profile into public.users
//     const { error: profileError } = await supabaseAdmin
//       .from("users")
//       .insert({
//         id: data.user?.id,
//         email: email,
//         name: name,
//         role: "user", // Default role
//         is_active: true
//       });

//     if (profileError) {
//       console.error("Profile creation error:", profileError);
      
//       // If auth user was created but profile failed, delete auth user
//       if (data.user?.id) {
//         await supabaseAdmin.auth.admin.deleteUser(data.user.id);
//       }
      
//       return res.status(500).json({
//         success: false,
//         message: "Profile creation failed",
//         error: profileError.message
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       message: "Registration successful! Please check your email to verify your account.",
//       data: {
//         userId: data.user?.id,
//         email: email,
//         name: name
//       }
//     });
//   } catch (err) {
//     console.error("REGISTER ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error during registration" 
//     });
//   }
// };

// /* =========================
//    VERIFY EMAIL
// ========================= */
// export const verifyEmail = async (req, res) => {
//   const { token } = req.query;

//   if (!token) {
//     return res.status(400).json({ 
//       success: false,
//       message: "Verification token is required" 
//     });
//   }

//   try {
//     const { data, error } = await supabase.auth.verifyOtp({
//       token_hash: token,
//       type: 'email'
//     });

//     if (error) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Invalid or expired verification token" 
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Email verified successfully!"
//     });
//   } catch (err) {
//     console.error("VERIFY EMAIL ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error during email verification" 
//     });
//   }
// };

// /* =========================
//    FORGOT PASSWORD
// ========================= */
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ 
//       success: false,
//       message: "Email is required" 
//     });
//   }

//   try {
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
//     });

//     if (error) {
//       return res.status(400).json({ 
//         success: false,
//         message: error.message 
//       });
//     }

//     // Always return success (security best practice)
//     return res.json({
//       success: true,
//       message: "If an account exists with this email, you will receive a password reset link."
//     });
//   } catch (err) {
//     console.error("FORGOT PASSWORD ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error" 
//     });
//   }
// };

// /* =========================
//    RESET PASSWORD
// ========================= */
// export const resetPassword = async (req, res) => {
//   const { password, token } = req.body;

//   if (!password || !token) {
//     return res.status(400).json({ 
//       success: false,
//       message: "Password and token are required" 
//     });
//   }

//   try {
//     // First verify the token
//     const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
//       token_hash: token,
//       type: 'recovery'
//     });

//     if (verifyError) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Invalid or expired reset token" 
//       });
//     }

//     // Update the password
//     const { error } = await supabase.auth.updateUser({
//       password: password
//     });

//     if (error) {
//       return res.status(400).json({ 
//         success: false,
//         message: error.message 
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Password reset successfully! You can now login with your new password."
//     });
//   } catch (err) {
//     console.error("RESET PASSWORD ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error during password reset" 
//     });
//   }
// };

// /* =========================
//    CHANGE PASSWORD (Authenticated User)
// ========================= */
// export const changePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user?.id;

//   if (!userId) {
//     return res.status(401).json({ 
//       success: false,
//       message: "User not authenticated" 
//     });
//   }

//   if (!currentPassword || !newPassword) {
//     return res.status(400).json({ 
//       success: false,
//       message: "Current and new passwords are required" 
//     });
//   }

//   try {
//     // Get user email
//     const { data: userData, error: userError } = await supabaseAdmin
//       .from("users")
//       .select("email")
//       .eq("id", userId)
//       .single();

//     if (userError || !userData) {
//       return res.status(404).json({ 
//         success: false,
//         message: "User not found" 
//       });
//     }

//     // Verify current password
//     const { error: signInError } = await supabase.auth.signInWithPassword({
//       email: userData.email,
//       password: currentPassword
//     });

//     if (signInError) {
//       return res.status(401).json({ 
//         success: false,
//         message: "Current password is incorrect" 
//       });
//     }

//     // Update to new password
//     const { error } = await supabase.auth.updateUser({
//       password: newPassword
//     });

//     if (error) {
//       return res.status(400).json({ 
//         success: false,
//         message: error.message 
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Password changed successfully"
//     });
//   } catch (err) {
//     console.error("CHANGE PASSWORD ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error during password change" 
//     });
//   }
// };

// /* =========================
//    GET USER PROFILE
// ========================= */
// export const getProfile = async (req, res) => {
//   const userId = req.user?.id;

//   if (!userId) {
//     return res.status(401).json({ 
//       success: false,
//       message: "User not authenticated" 
//     });
//   }

//   try {
//     const { data: user, error } = await supabaseAdmin
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error || !user) {
//       return res.status(404).json({ 
//         success: false,
//         message: "User not found" 
//       });
//     }

//     return res.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         is_active: user.is_active,
//         created_at: user.created_at
//       }
//     });
//   } catch (err) {
//     console.error("GET PROFILE ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error" 
//     });
//   }
// };

// /* =========================
//    UPDATE USER PROFILE
// ========================= */
// export const updateProfile = async (req, res) => {
//   const userId = req.user?.id;
//   const { name } = req.body;

//   if (!userId) {
//     return res.status(401).json({ 
//       success: false,
//       message: "User not authenticated" 
//     });
//   }

//   try {
//     const { error } = await supabaseAdmin
//       .from("users")
//       .update({ 
//         name: name,
//         updated_at: new Date().toISOString()
//       })
//       .eq("id", userId);

//     if (error) {
//       return res.status(400).json({ 
//         success: false,
//         message: error.message 
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Profile updated successfully"
//     });
//   } catch (err) {
//     console.error("UPDATE PROFILE ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error" 
//     });
//   }
// };

// /* =========================
//    LOGOUT
// ========================= */
// export const logout = async (req, res) => {
//   try {
//     const { error } = await supabase.auth.signOut();
    
//     if (error) {
//       console.error("Logout error:", error);
//     }

//     return res.json({
//       success: true,
//       message: "Logged out successfully"
//     });
//   } catch (err) {
//     console.error("LOGOUT ERROR:", err);
//     return res.status(500).json({ 
//       success: false,
//       message: "Server error during logout" 
//     });
//   }
// };

// /* =========================
//    MIDDLEWARE: PROTECT
// ========================= */
// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       success: false,
//       message: "Access denied. No token provided.",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, role, email }
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ 
//         success: false,
//         message: "Token expired" 
//       });
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({ 
//         success: false,
//         message: "Invalid token" 
//       });
//     }
//     return res.status(500).json({ 
//       success: false,
//       message: "Token verification failed" 
//     });
//   }
// };

// /* =========================
//    MIDDLEWARE: ADMIN ONLY
// ========================= */
// export const adminOnly = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({
//       success: false,
//       message: "Access denied. Admin privileges required.",
//     });
//   }
//   next();
// };