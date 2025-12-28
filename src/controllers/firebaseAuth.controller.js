// import admin from "../services/firebase.service.js";
// import { supabase } from "../services/supabase.service.js";
// import jwt from "jsonwebtoken";

// export const firebaseLogin = async (req, res) => {
//   const { idToken } = req.body;

//   if (!idToken) {
//     return res.status(400).json({ message: "Missing Firebase token" });
//   }

//   try {
//     // 1️⃣ Verify Firebase token
//     const decoded = await admin.auth().verifyIdToken(idToken);

//     const email = decoded.email || null;
//     const phone = decoded.phone_number || null;

//     if (!email && !phone) {
//       return res.status(400).json({ message: "No email or phone in token" });
//     }

//     // 2️⃣ Create / find Supabase Auth user
//     let authUser;

//     if (email) {
//       const { data } = await supabase.auth.admin.getUserByEmail(email);
//       authUser = data?.user;

//       if (!authUser) {
//         const { data: created } = await supabase.auth.admin.createUser({
//           email,
//           email_confirm: true,
//         });
//         authUser = created.user;
//       }
//     }

//     if (phone && !authUser) {
//       const { data: created } = await supabase.auth.admin.createUser({
//         phone,
//         phone_confirm: true,
//       });
//       authUser = created.user;
//     }

//     const userId = authUser.id;

//     // 3️⃣ Check profile
//     const { data: profile } = await supabase
//       .from("users")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     // 4️⃣ Create profile if missing
//     if (!profile) {
//       await supabase.from("users").insert({
//         id: userId,
//         email,
//         phone,
//         first_name: "Firebase",
//         last_name: "User",
//         username: email ? email.split("@")[0] : phone,
//         role: "user",
//         is_active: true,
//       });
//     }

//     // 5️⃣ Issue YOUR JWT
//     const token = jwt.sign(
//       { id: userId, role: profile?.role || "user" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     return res.json({
//       token,
//       user: {
//         id: userId,
//         email,
//         phone,
//         role: profile?.role || "user",
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: "Invalid Firebase token" });
//   }
// };
