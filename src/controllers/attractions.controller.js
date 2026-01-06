import { supabaseAdmin } from "../services/supabase.service.js";

/* GET all attractions for a country */
export const getAttractions = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select("*")
    .eq("country_id", id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};
