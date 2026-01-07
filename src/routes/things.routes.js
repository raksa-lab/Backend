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
router.get("/:id/things-to-do", getThingsByCountry);
router.post("/:id/things-to-do", createThing);
router.put("/:id/things-to-do/:thingId", updateThing);
router.delete("/:id/things-to-do/:thingId", deleteThing);

export default router;
