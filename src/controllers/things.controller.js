import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL THINGS TO DO (ALL COUNTRIES)
   GET /api/things-to-do
========================= */
export const getAllThings = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
    .select(`
      id,
      title,
      description,
      category,
      location,
      best_time,
      duration,
      cost_level,
      country_id
    `);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   GET THINGS TO DO BY COUNTRY
   GET /api/countries/:id/things-to-do
========================= */
export const getThingsByCountry = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
    .select(`
      id,
      title,
      description,
      category,
      location,
      best_time,
      duration,
      cost_level
    `)
    .eq("country_id", id);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   CREATE THING TO DO
   POST /api/countries/:id/things-to-do
========================= */
export const createThing = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
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
   UPDATE THING TO DO
   PUT /api/countries/:id/things-to-do/:thingId
========================= */
export const updateThing = async (req, res) => {
  const { thingId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
    .update(req.body)
    .eq("id", thingId)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* =========================
   DELETE THING TO DO
   DELETE /api/countries/:id/things-to-do/:thingId
========================= */
export const deleteThing = async (req, res) => {
  const { thingId } = req.params;

  const { error } = await supabaseAdmin
    .from("country_things_to_do")
    .delete()
    .eq("id", thingId);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: "Thing to do deleted" });
};
