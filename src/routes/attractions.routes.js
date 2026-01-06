import { Router } from "express";
import { getAttractions } from "../controllers/attractions.controller.js";

const router = Router();

/* GET attractions */
router.get("/:id/attractions", getAttractions);

export default router;
