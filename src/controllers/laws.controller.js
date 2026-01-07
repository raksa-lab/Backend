import { supabaseAdmin } from "../services/supabase.service.js";

/**
 * GET all laws (all countries)
 * GET /api/laws
 */
export const getAllLaws = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/**
 * GET laws of one country
 * GET /api/countries/:countryId/laws
 */
export const getCountryLaws = async (req, res) => {
  const { countryId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .select("*")
    .eq("country_id", countryId);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/**
 * GET one law
 * GET /api/laws/:lawId
 */
export const getLaw = async (req, res) => {
  const { lawId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .select("*")
    .eq("id", lawId)
    .single();

  if (error) return res.status(404).json({ message: error.message });
  res.json(data);
};

/**
 * POST create law
 * POST /api/countries/:countryId/laws
 */
export const createLaw = async (req, res) => {
  const { countryId } = req.params;

  const {
    title,
    summary,
    details,
    category,
    tags,
    applies_to,
    region_scope,
    status,
    effective_from,
    last_verified,
    source_name,
    source_url,
    penalty,
    notes
  } = req.body;

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .insert({
      country_id: countryId,
      title,
      summary,
      details,
      category,
      tags,
      applies_to,
      region_scope,
      status,
      effective_from,
      last_verified,
      source_name,
      source_url,
      penalty,
      notes
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data);
};

/**
 * PUT update law
 * PUT /api/laws/:lawId
 */
export const updateLaw = async (req, res) => {
  const { lawId } = req.params;

  const {
    title,
    summary,
    details,
    category,
    tags,
    applies_to,
    region_scope,
    status,
    effective_from,
    last_verified,
    source_name,
    source_url,
    penalty,
    notes
  } = req.body;

  const { data, error } = await supabaseAdmin
    .from("country_laws")
    .update({
      title,
      summary,
      details,
      category,
      tags,
      applies_to,
      region_scope,
      status,
      effective_from,
      last_verified,
      source_name,
      source_url,
      penalty,
      notes
    })
    .eq("id", lawId)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/**
 * DELETE law
 * DELETE /api/laws/:lawId
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
