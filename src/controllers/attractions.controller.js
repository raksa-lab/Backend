import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   HELPER: CLEAN ATTRACTION
========================= */
const pickAttraction = (a) => ({
  id: a.id,
  name: a.name,
  category: a.category,
  description: a.description,
  location: a.location,
  opening_hours: a.opening_hours,
  best_time_to_visit: a.best_time_to_visit,
  estimated_visit_time: a.estimated_visit_time,
  access_type: a.access_type,
  highlights: a.highlights,
  rules: a.rules,
  images: a.images
});

/* =========================
   GET ALL ATTRACTIONS
========================= */
export const getAllAttractions = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select("*");

  if (error) return res.status(400).json({ message: error.message });

  res.json(data.map(pickAttraction));
};

/* =========================
   GET BY COUNTRY
========================= */
export const getAttractionsByCountry = async (req, res) => {
  const { countryId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select("*")
    .eq("country_id", countryId);

  if (error) return res.status(400).json({ message: error.message });

  res.json(data.map(pickAttraction));
};

/* =========================
   GET ATTRACTION DETAIL
========================= */
export const getAttractionDetail = async (req, res) => {
  const { attractionId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .select("*")
    .eq("id", attractionId)
    .single();

  if (error || !data) {
    return res.status(404).json({ message: "Attraction not found" });
  }

  res.json(pickAttraction(data));
};

/* =========================
   CREATE ATTRACTION
========================= */
export const createAttraction = async (req, res) => {
  const { countryId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_attractions")
    .insert({
      country_id: countryId,
      ...req.body
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(pickAttraction(data));
};

/* =========================
   UPDATE ATTRACTION
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

  res.json(pickAttraction(data));
};

/* =========================
   DELETE ATTRACTION
========================= */
export const deleteAttraction = async (req, res) => {
  const { attractionId } = req.params;

  const { error } = await supabaseAdmin
    .from("country_attractions")
    .delete()
    .eq("id", attractionId);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "Attraction deleted successfully" });
};
