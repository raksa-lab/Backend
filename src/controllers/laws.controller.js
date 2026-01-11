import { supabaseAdmin } from "../services/supabase.service.js";

/**
 * GET ALL LAWS
 */
export const getAllLaws = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .select("id, country_id, title, summary, category, penalty")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ message: error.message });

  res.json({
    total: data.length,
    laws: data
  });
};

/**
 * GET LAW BY ID
 */
export const getLawById = async (req, res) => {
  const { lawId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .select("*")
    .eq("id", lawId)
    .single();

  if (error || !data) {
    return res.status(404).json({ message: "Law not found" });
  }

  res.json(data);
};

/**
 * POST CREATE LAW
 */
export const createLaw = async (req, res) => {
  const { countryId } = req.params;
  const { title, summary, category, penalty } = req.body;

  if (!title || !summary || !category) {
    return res.status(400).json({
      message: "title, summary, and category are required"
    });
  }

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .insert({
      country_id: countryId,
      title,
      summary,
      category,
      penalty
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(data);
};

/**
 * PUT UPDATE LAW
 */
export const updateLaw = async (req, res) => {
  const { lawId } = req.params;
  const { title, summary, category, penalty } = req.body;

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .update({
      title,
      summary,
      category,
      penalty
    })
    .eq("id", lawId)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.json(data);
};

/**
 * DELETE LAW
 */
export const deleteLaw = async (req, res) => {
  const { lawId } = req.params;

  const { error } = await supabaseAdmin
    .from("country_laws")
    .delete()
    .eq("id", lawId);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "Law deleted successfully" });
};
