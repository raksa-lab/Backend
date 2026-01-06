import { Router } from "express";
import { getThings } from "../controllers/things.controller.js";

const router = Router();

/* GET things to do */
router.get("/:id/things-to-do", getThings);

export default router;
