import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL OVERVIEWS
   GET /api/overviews
========================= */
export const getAllOverviews = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_overview")
    .select(`
      id,
      short_description,
      history,
      culture,
      climate,
      best_time_to_visit,
      currency,
      language,
      time_zone,
      latitude,
      longitude,
      google_map_url,
      countries (
        id,
        name,
        region,
        population,
        area,
        flag,
        capital,
        languages,
        currencies
      )
    `);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   GET ONE OVERVIEW (BY COUNTRY)
   GET /api/countries/:id/overview
========================= */
export const getOverview = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_overview")
    .select(`
      id,
      short_description,
      history,
      culture,
      climate,
      best_time_to_visit,
      currency,
      language,
      time_zone,
      latitude,
      longitude,
      google_map_url,
      countries (
        id,
        name,
        region,
        population,
        area,
        flag,
        capital,
        languages,
        currencies
      )
    `)
    .eq("country_id", id)
    .single();

  if (error) return res.status(404).json({ message: "Overview not found" });
  res.json(data);
};

/* =========================
   CREATE OVERVIEW
   POST /api/countries/:id/overview
========================= */
export const createOverview = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_overview")
    .insert({
      country_id: id,
      ...req.body
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data);
};

/* =========================
   UPDATE OVERVIEW
   PUT /api/countries/:id/overview
========================= */
export const updateOverview = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_overview")
    .update(req.body)
    .eq("country_id", id)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   DELETE OVERVIEW
   DELETE /api/countries/:id/overview
========================= */
export const deleteOverview = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from("country_overview")
    .delete()
    .eq("country_id", id);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: "Overview deleted" });
};
