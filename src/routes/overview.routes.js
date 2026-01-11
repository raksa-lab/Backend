import { Router } from "express";
import {
  getAllOverviews,
  getOverview,
  createOverview,
  updateOverview,
  deleteOverview
} from "../controllers/overview.controller.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router();

/* ALL OVERVIEWS */
router.get("/overviews", getAllOverviews);

/* COUNTRY OVERVIEW */
router.get("/:id/overview", getOverview);
router.post("/:id/overview", createOverview , adminOnly);
router.put("/:id/overview", updateOverview , adminOnly);
router.delete("/:id/overview", deleteOverview , adminOnly);

export default router;


// GET /api/overviews
// GET /api/countries/:id/overview
// POST /api/countries/:id/overview
// PUT /api/countries/:id/overview
// DELETE /api/countries/:id/overview