import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL THINGS TO DO
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
      duration,
      cost_level,
      country_id
    `)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ message: error.message });

  res.json({
    total: data.length,
    things_to_do: data
  });
};

/* =========================
   GET THINGS BY COUNTRY
========================= */
export const getThingsByCountry = async (req, res) => {
  const { countryId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
    .select(`
      id,
      title,
      description,
      category,
      location,
      duration,
      cost_level
    `)
    .eq("country_id", countryId);

  if (error) return res.status(400).json({ message: error.message });

  res.json({
    total: data.length,
    things_to_do: data
  });
};

/* =========================
   CREATE THING TO DO
========================= */
export const createThing = async (req, res) => {
  const { countryId } = req.params;

  const { title, category } = req.body;
  if (!title || !category) {
    return res.status(400).json({
      message: "title and category are required"
    });
  }

  const { data, error } = await supabaseAdmin
    .from("country_things_to_do")
    .insert({
      country_id: countryId,
      ...req.body
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(data);
};

/* =========================
   UPDATE THING TO DO
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
========================= */
export const deleteThing = async (req, res) => {
  const { thingId } = req.params;

  const { error } = await supabaseAdmin
    .from("country_things_to_do")
    .delete()
    .eq("id", thingId);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "Thing to do deleted successfully" });
};
