// src/routes/index.js
import { Router } from "express";
import country from "./country.routes.js";
import overview from "./overview.routes.js";
import laws from "./laws.routes.js";
import attractions from "./attractions.routes.js";
import things from "./things.routes.js";
import tips from "./tips.routes.js";
import regionRoutes from "./region.routes.js";

const r = Router();

r.use("/countries", country);
r.use("/countries", overview);
r.use("/countries", laws);
r.use("/countries", attractions);
r.use("/countries", things);
r.use("/countries", tips);
r.use("/regions", regionRoutes);

export default r;
