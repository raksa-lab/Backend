import { Router } from "express";
import {
  getAllTipsGrouped,
  getTipsByCountry,
  createTip,
  updateTip,
  deleteTip
} from "../controllers/tips.controller.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router();

/* GLOBAL */
router.get("/tips", getAllTipsGrouped);

/* COUNTRY */
router.get("/:countryId/tips", getTipsByCountry);
router.post("/:countryId/tips", createTip , adminOnly);

/* BY ID */
router.put("/tips/:tipId", updateTip , adminOnly);
router.delete("/tips/:tipId", deleteTip , adminOnly);

export default router;
