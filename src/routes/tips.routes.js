import { Router } from "express";
import {
  getAllTips,
  getAllTipsGrouped,
  getTipsByCountry,
  createTip,
  updateTip,
  deleteTip
} from "../controllers/tips.controller.js";

const router = Router();

/* ALL TIPS */
router.get("/", getAllTips);
router.get("/grouped", getAllTipsGrouped);

/* COUNTRY TIPS */
router.get("/:countryId/tips", getTipsByCountry);
router.post("/:countryId/tips", createTip);
router.put("/:countryId/tips/:tipId", updateTip);
router.delete("/:countryId/tips/:tipId", deleteTip);

export default router;
