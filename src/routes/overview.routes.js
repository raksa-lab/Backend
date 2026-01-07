import { Router } from "express";
import {
  getAllOverviews,
  getOverview,
  createOverview,
  updateOverview,
  deleteOverview
} from "../controllers/overview.controller.js";

const router = Router();

/* ALL OVERVIEWS */
router.get("/overviews", getAllOverviews);

/* COUNTRY OVERVIEW */
router.get("/:id/overview", getOverview);
router.post("/:id/overview", createOverview);
router.put("/:id/overview", updateOverview);
router.delete("/:id/overview", deleteOverview);

export default router;


// GET /api/overviews
// GET /api/countries/:id/overview
// POST /api/countries/:id/overview
// PUT /api/countries/:id/overview
// DELETE /api/countries/:id/overview