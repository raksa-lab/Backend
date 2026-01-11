import { Router } from "express";
import {
  getAllThings,
  getThingsByCountry,
  createThing,
  updateThing,
  deleteThing
} from "../controllers/things.controller.js";

const router = Router();

/* ALL */
router.get("/things-to-do", getAllThings);

/* BY COUNTRY */
router.get("/:countryId/things-to-do", getThingsByCountry);
router.post("/:countryId/things-to-do", createThing);
router.put("/:countryId/things-to-do/:thingId", updateThing);
router.delete("/:countryId/things-to-do/:thingId", deleteThing);

export default router;
