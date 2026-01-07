import { Router } from "express";
import {
  getAllAttractions,
  getAttractionsByCountry,
  getTopAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction
} from "../controllers/attractions.controller.js";

const router = Router();

/* ALL ATTRACTIONS */
router.get("/attractions", getAllAttractions);

/* COUNTRY ATTRACTIONS */
router.get("/:id/attractions", getAttractionsByCountry);
router.get("/:id/attractions/top", getTopAttractions);
router.post("/:id/attractions", createAttraction);
router.put("/:id/attractions/:attractionId", updateAttraction);
router.delete("/:id/attractions/:attractionId", deleteAttraction);

export default router;


// GET     /api/attractions
// GET     /api/countries/:id/attractions
// GET     /api/countries/:id/attractions/top
// POST    /api/countries/:id/attractions
// PUT     /api/countries/:id/attractions/:attractionId
// DELETE  /api/countries/:id/attractions/:attractionId
