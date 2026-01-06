// src/routes/overview.routes.js
import { Router } from "express";
import * as o from "../controllers/overview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const r = Router();

r.get("/:id/overview", o.get);
r.post("/:id/overview", protect, adminOnly, o.create);
r.put("/:id/overview", protect, adminOnly, o.update);
r.delete("/:id/overview", protect, adminOnly, o.remove);

export default r;
