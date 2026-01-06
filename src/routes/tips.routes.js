import { Router } from "express";
import { getTips } from "../controllers/tips.controller.js";

const router = Router();

/* GET tips */
router.get("/:id/tips", getTips);

export default router;
