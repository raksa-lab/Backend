import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
// import { firebaseLogin } from "../controllers/firebaseAuth.controller.js";
const router = Router();

router.post("/login", login);
router.post("/register", register); 
// router.post("/firebase-login", firebaseLogin);
export default router;





// import { Router } from "express";
// import { 
//   login, 
//   register, 
//   verifyEmail,
//   forgotPassword,
//   resetPassword,
//   changePassword,
//   getProfile,
//   updateProfile,
//   logout
// } from "../controllers/auth.controller.js";
// import { protect } from "../controllers/auth.controller.js";

// const router = Router();

// // Public routes
// router.post("/login", login);
// router.post("/register", register);
// router.get("/verify-email", verifyEmail);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.post("/logout", logout);

// // Protected routes
// router.get("/profile", protect, getProfile);
// router.put("/profile", protect, updateProfile);
// router.post("/change-password", protect, changePassword);

// export default router;