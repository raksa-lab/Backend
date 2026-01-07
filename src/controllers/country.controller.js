import { supabaseAdmin } from "../services/supabase.service.js";

/**
 * GET ALL COUNTRIES
 */
export const getAll = async (_, res) => {
  const { data, error } = await supabaseAdmin
    .from("countries")
    .select(`
      id,
      name,
      region,
      population,
      area,
      flag,
      capital,
      languages,
      currencies
    `);

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/**
 * GET ONE COUNTRY
 */
export const getOne = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("countries")
    .select(`
      id,
      name,
      region,
      population,
      area,
      flag,
      capital,
      languages,
      currencies
    `)
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ message: error.message });
  res.json(data);
};

/**
 * CREATE COUNTRY
 */
export const create = async (req, res) => {
  const {
    name,
    region,
    population,
    area,
    flag,
    capital,
    languages,
    currencies
  } = req.body;

  const { data, error } = await supabaseAdmin
    .from("countries")
    .insert({
      name,
      region,
      population,
      area,
      flag,
      capital,
      languages,
      currencies
    })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.status(201).json(data);
};

/**
 * UPDATE COUNTRY
 */
export const update = async (req, res) => {
  const {
    name,
    region,
    population,
    area,
    flag,
    capital,
    languages,
    currencies
  } = req.body;

  const { data, error } = await supabaseAdmin
    .from("countries")
    .update({
      name,
      region,
      population,
      area,
      flag,
      capital,
      languages,
      currencies
    })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
};

/**
 * DELETE COUNTRY
 */
export const remove = async (req, res) => {
  const { error } = await supabaseAdmin
    .from("countries")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json({ message: error.message });
  res.json({ message: "Deleted" });
};
