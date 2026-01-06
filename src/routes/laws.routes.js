// src/routes/laws.routes.js
import { Router } from "express";
import * as l from "../controllers/laws.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const r = Router();

r.get("/:id/laws", l.list);
r.post("/:id/laws", protect, adminOnly, l.create);
r.put("/:id/laws/:itemId", protect, adminOnly, l.update);
r.delete("/:id/laws/:itemId", protect, adminOnly, l.remove);

export default r;
