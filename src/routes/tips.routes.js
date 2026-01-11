import { Router } from "express";
import {
  getAllTipsGrouped,
  getTipsByCountry,
  createTip,
  updateTip,
  deleteTip
} from "../controllers/tips.controller.js";

const router = Router();

/* GLOBAL */
router.get("/tips", getAllTipsGrouped);

/* COUNTRY */
router.get("/:countryId/tips", getTipsByCountry);
router.post("/:countryId/tips", createTip);

/* BY ID */
router.put("/tips/:tipId", updateTip);
router.delete("/tips/:tipId", deleteTip);

export default router;
