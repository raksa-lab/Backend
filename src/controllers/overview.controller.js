// src/controllers/overview.controller.js
import { supabaseAdmin } from "../services/supabase.service.js";

export const get = async (req, res) =>
  res.json((await supabaseAdmin.from("country_overview").select("*").eq("country_id", req.params.id).single()).data);

export const create = async (req, res) =>
  res.json((await supabaseAdmin.from("country_overview")
    .insert({ ...req.body, country_id: req.params.id })
    .select().single()).data);

export const update = async (req, res) =>
  res.json((await supabaseAdmin.from("country_overview")
    .update(req.body).eq("country_id", req.params.id)
    .select().single()).data);

export const remove = async (req, res) => {
  await supabaseAdmin.from("country_overview").delete().eq("country_id", req.params.id);
  res.json({ message: "Deleted" });
};
