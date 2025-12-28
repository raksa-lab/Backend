import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
// import { firebaseLogin } from "../controllers/firebaseAuth.controller.js";
const router = Router();

router.post("/login", login);
router.post("/register", register); 
// router.post("/firebase-login", firebaseLogin);
export default router;
