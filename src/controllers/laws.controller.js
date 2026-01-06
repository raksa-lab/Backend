// src/controllers/laws.controller.js
import { supabaseAdmin } from "../services/supabase.service.js";

export const list = async (req, res) =>
  res.json((await supabaseAdmin.from("country_laws").select("*").eq("country_id", req.params.id)).data);

export const create = async (req, res) =>
  res.json((await supabaseAdmin.from("country_laws")
    .insert({ ...req.body, country_id: req.params.id })
    .select().single()).data);

export const update = async (req, res) =>
  res.json((await supabaseAdmin.from("country_laws")
    .update(req.body).eq("id", req.params.itemId)
    .select().single()).data);

export const remove = async (req, res) => {
  await supabaseAdmin.from("country_laws").delete().eq("id", req.params.itemId);
  res.json({ message: "Deleted" });
};
