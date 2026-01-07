import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL TIPS (RAW)
========================= */
export const getAllTips = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .select("*");

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   GET ALL TIPS (GROUPED)
========================= */
export const getAllTipsGrouped = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .select("category, tip");

  if (error) return res.status(400).json({ message: error.message });

  const map = {};
  data.forEach(item => {
    if (!map[item.category]) map[item.category] = [];
    map[item.category].push(item.tip);
  });

  const result = Object.keys(map).map(category => ({
    category,
    tips: map[category]
  }));

  res.json(result);
};

/* =========================
   GET TIPS BY COUNTRY
========================= */
export const getTipsByCountry = async (req, res) => {
  const { countryId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .select("*")
    .eq("country_id", countryId);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   CREATE TIP
========================= */
export const createTip = async (req, res) => {
  const { countryId } = req.params;
  const { category, tip } = req.body;

  if (!category || !tip) {
    return res.status(400).json({ message: "Category and tip are required" });
  }

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .insert({
      country_id: countryId,
      category,
      tip
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   UPDATE TIP
========================= */
export const updateTip = async (req, res) => {
  const { tipId } = req.params;
  const { category, tip } = req.body;

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .update({ category, tip })
    .eq("id", tipId)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   DELETE TIP
========================= */
export const deleteTip = async (req, res) => {
  const { tipId } = req.params;

  const { error } = await supabaseAdmin
    .from("country_tips")
    .delete()
    .eq("id", tipId);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: "Tip deleted" });
};
