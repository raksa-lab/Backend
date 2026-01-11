import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL TIPS (GROUPED)
========================= */
export const getAllTipsGrouped = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .select("id, category, short, detail, level");

  if (error) return res.status(400).json({ message: error.message });

  const map = {};

  data.forEach(tip => {
    if (!map[tip.category]) map[tip.category] = [];

    map[tip.category].push({
      id: tip.id,
      short: tip.short,
      detail: tip.detail,
      level: tip.level
    });
  });

  const result = Object.keys(map).map(category => ({
    category,
    items: map[category]
  }));

  res.json({ tips: result });
};

/* =========================
   GET TIPS BY COUNTRY
========================= */
export const getTipsByCountry = async (req, res) => {
  const { countryId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .select("id, category, short, detail, level")
    .eq("country_id", countryId);

  if (error) return res.status(400).json({ message: error.message });

  const map = {};

  data.forEach(tip => {
    if (!map[tip.category]) map[tip.category] = [];

    map[tip.category].push({
      id: tip.id,
      short: tip.short,
      detail: tip.detail,
      level: tip.level
    });
  });

  const result = Object.keys(map).map(category => ({
    category,
    items: map[category]
  }));

  res.json({ tips: result });
};

/* =========================
   CREATE TIP
========================= */
export const createTip = async (req, res) => {
  const { countryId } = req.params;
  const { category, short, detail, level } = req.body;

  if (!category || !short) {
    return res.status(400).json({
      message: "category and short are required"
    });
  }

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .insert({
      country_id: countryId,
      category,
      short,
      detail,
      level
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(data);
};

/* =========================
   UPDATE TIP
========================= */
export const updateTip = async (req, res) => {
  const { tipId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_tips")
    .update(req.body)
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

  res.json({ message: "Tip deleted successfully" });
};
