import { Router } from "express";
import {
  getDetail,
  getAllDetail
} from "../controllers/detail.controller.js";

const router = Router();

/**
 * =========================
 * COUNTRY DETAIL ROUTES
 * =========================
 */

/* Get ALL countries with full detail (ADMIN / CMS) */
router.get("/countries/detail", getAllDetail);

/* Get ONE country full detail (Detail page) */
router.get("/countries/:id/detail", getDetail);

export default router;
