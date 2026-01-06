import { supabaseAdmin } from "../services/supabase.service.js";

/* GET all things to do for a country */
export const getThings = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
    .select("*")
    .eq("country_id", id);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json(data);
};
