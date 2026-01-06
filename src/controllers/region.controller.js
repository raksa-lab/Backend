import { supabaseAdmin } from "../services/supabase.service.js";

/* GET ALL REGIONS */
export const getAllRegions = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("regions")
    .select("id, name, description")
    .order("name");

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* GET ONE REGION */
export const getRegionById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("regions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ message: "Region not found" });
  res.json(data);
};

/* CREATE REGION */
export const createRegion = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("regions")
    .insert(req.body)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* UPDATE REGION */
export const updateRegion = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("regions")
    .update(req.body)
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/* DELETE REGION */
export const deleteRegion = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from("regions")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: "Region deleted" });
};

/* GET COUNTRIES BY REGION */
export const getCountriesByRegion = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("countries")
    .select(`
      id,
      name,
      slug,
      image_url,
      population,
      description
    `)
    .eq("region_id", id);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};
