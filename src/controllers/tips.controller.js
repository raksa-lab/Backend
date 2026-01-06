import { supabaseAdmin } from "../services/supabase.service.js";

/* GET all tips for a country */
export const getTips = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .select("*")
    .eq("country_id", id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};
