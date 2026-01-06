import { Router } from "express";
import * as r from "../controllers/region.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router();

/* PUBLIC */
router.get("/", r.getAllRegions);
router.get("/:id", r.getRegionById);
router.get("/:id/countries", r.getCountriesByRegion);

/* ADMIN */
router.post("/", protect, adminOnly, r.createRegion);
router.put("/:id", protect, adminOnly, r.updateRegion);
router.delete("/:id", protect, adminOnly, r.deleteRegion);

export default router;
