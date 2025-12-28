import { Router } from "express";
import { supabaseAdmin } from "../services/supabase.service.js";

const router = Router();

router.get("/supabase", async (req, res) => {
  const { data, error } = await supabaseAdmin.from("users").select("*");

  if (error) {
    return res.status(500).json({
      connected: false,
      error: error.message,
    });
  }

  res.json({
    connected: true,
    users: data,
  });
});

export default router;
