// import { Router } from "express";
// import {
//   getAllLaws,
//   getCountryLaws,
//   getLaw,
//   createLaw,
//   updateLaw,
//   deleteLaw
// } from "../controllers/laws.controller.js";

// const router = Router();

// /**
//  * GLOBAL laws
//  */
// router.get("/laws", getAllLaws);
// router.get("/countries/laws", getAllLaws);   // ✅ NEW (what you want)

// /**
//  * COUNTRY laws
//  */
// router.get("/countries/:countryId/laws", getCountryLaws);
// router.post("/countries/:countryId/laws", createLaw);

// /**
//  * SINGLE law
//  */
// router.get("/laws/:lawId", getLaw);
// router.put("/laws/:lawId", updateLaw);
// router.delete("/laws/:lawId", deleteLaw);

// export default router;


// src/routes/laws.routes.js
// import { Router } from "express";
// import {
//   getAllLaws,
//   getCountryLaws,
//   getLaw,
//   createLaw,
//   updateLaw,
//   deleteLaw
// } from "../controllers/laws.controller.js";

// const router = Router();

// // GLOBAL laws
// router.get("/laws", getAllLaws);
// router.get("/laws/:lawId", getLaw);
// router.put("/laws/:lawId", updateLaw);
// router.delete("/laws/:lawId", deleteLaw);

// // COUNTRY laws (IMPORTANT)
// router.get("/:countryId/laws", getCountryLaws);
// router.post("/:countryId/laws", createLaw);

// export default router;




import { Router } from "express";
import {
  getAllLaws,
  getLawById,
  createLaw,
  updateLaw,
  deleteLaw
} from "../controllers/laws.controller.js";

const router = Router();

router.get("/laws", getAllLaws);
router.get("/laws/:lawId", getLawById);
router.post("/countries/:countryId/laws", createLaw);
router.put("/laws/:lawId", updateLaw);
router.delete("/laws/:lawId", deleteLaw);

export default router;
