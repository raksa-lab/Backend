import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL ATTRACTIONS (ALL COUNTRIES)
   GET /api/attractions
========================= */
export const getAllAttractions = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select(`
      id,
      name,
      description,
      location,
      latitude,
      longitude,
      image_url,
      entry_fee,
      best_time_to_visit,
      estimated_visit_time,
      country_id
    `);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   GET ATTRACTIONS BY COUNTRY
   GET /api/countries/:id/attractions
========================= */
export const getAttractionsByCountry = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select(`
      id,
      name,
      description,
      location,
      latitude,
      longitude,
      image_url,
      entry_fee,
      best_time_to_visit,
      estimated_visit_time
    `)
    .eq("country_id", id);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   GET TOP ATTRACTIONS
   GET /api/countries/:id/attractions/top
========================= */
export const getTopAttractions = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select(`
      id,
      name,
      description,
      location,
      image_url,
      entry_fee,
      best_time_to_visit,
      estimated_visit_time
    `)
    .eq("country_id", id)
    .limit(5);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   CREATE ATTRACTION
   POST /api/countries/:id/attractions
========================= */
export const createAttraction = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
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
   UPDATE ATTRACTION
   PUT /api/countries/:id/attractions/:attractionId
========================= */
export const updateAttraction = async (req, res) => {
  const { attractionId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .update(req.body)
    .eq("id", attractionId)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   DELETE ATTRACTION
   DELETE /api/countries/:id/attractions/:attractionId
========================= */
export const deleteAttraction = async (req, res) => {
  const { attractionId } = req.params;

  const { error } = await supabaseAdmin
    .from("country_attractions")
    .delete()
    .eq("id", attractionId);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: "Attraction deleted" });
};
