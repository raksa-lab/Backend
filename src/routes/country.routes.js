import { Router } from "express";
import {
  getGroupedCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
} from "../controllers/country.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router();

/* PUBLIC */
router.get("/allcountry", getGroupedCountries);
router.get("/:id", getCountryById);

/* ADMIN */
router.post("/", protect, adminOnly, createCountry);
router.put("/:id", protect, adminOnly, updateCountry);
router.delete("/:id", protect, adminOnly, deleteCountry);

export default router;
