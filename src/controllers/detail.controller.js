// src/controllers/detail.controller.js
import { supabaseAdmin } from "../services/supabase.service.js";

export const getDetail = async (req, res) => {
  const id = req.params.id;

  const [
    country,
    overview,
    laws,
    attractions,
    things,
    tips
  ] = await Promise.all([
    supabaseAdmin.from("countries").select("*").eq("id", id).single(),
    supabaseAdmin.from("country_overview").select("*").eq("country_id", id).single(),
    supabaseAdmin.from("country_laws").select("*").eq("country_id", id),
    supabaseAdmin.from("country_attractions").select("*").eq("country_id", id),
    supabaseAdmin.from("country_things_to_do").select("*").eq("country_id", id),
    supabaseAdmin.from("country_tips").select("*").eq("country_id", id)
  ]);

  res.json({
    country: country.data,
    overview: overview.data,
    laws: laws.data,
    attractions: attractions.data,
    thingsToDo: things.data,
    tips: tips.data
  });
};
