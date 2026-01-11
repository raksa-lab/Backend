import { Router } from "express";
import {
  getAllAttractions,
  getAttractionsByCountry,
  getAttractionDetail,
  createAttraction,
  updateAttraction,
  deleteAttraction
} from "../controllers/attractions.controller.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/attractions", getAllAttractions );
router.get("/countries/:countryId/attractions", getAttractionsByCountry );
router.get("/countries/:countryId/attractions/:attractionId", getAttractionDetail);
router.post("/countries/:countryId/attractions", createAttraction ,adminOnly);
router.put("/countries/:countryId/attractions/:attractionId", updateAttraction ,adminOnly);
router.delete("/countries/:countryId/attractions/:attractionId", deleteAttraction ,adminOnly);

export default router;
