import { Router } from "express";
import {
  getAllAttractions,
  getAttractionsByCountry,
  getAttractionDetail,
  createAttraction,
  updateAttraction,
  deleteAttraction
} from "../controllers/attractions.controller.js";

const router = Router();

router.get("/attractions", getAllAttractions);
router.get("/countries/:countryId/attractions", getAttractionsByCountry);
router.get("/countries/:countryId/attractions/:attractionId", getAttractionDetail);
router.post("/countries/:countryId/attractions", createAttraction);
router.put("/countries/:countryId/attractions/:attractionId", updateAttraction);
router.delete("/countries/:countryId/attractions/:attractionId", deleteAttraction);

export default router;
