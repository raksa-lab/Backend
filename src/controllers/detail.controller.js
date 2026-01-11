// import { supabaseAdmin } from "../services/supabase.service.js";

// /* =========================
//    HELPER: GROUP TIPS
// ========================= */
// const groupTipsByCategory = (tips = []) => {
//   const map = {};

//   tips.forEach(item => {
//     if (!map[item.category]) {
//       map[item.category] = [];
//     }
//     map[item.category].push(item.tip);
//   });

//   return Object.keys(map).map(category => ({
//     category,
//     tips: map[category]
//   }));
// };

// /* =========================
//    GET ONE COUNTRY DETAIL
// ========================= */
// export const getDetail = async (req, res) => {
//   const { id } = req.params;

//   const [
//     countryRes,
//     overviewRes,
//     lawsRes,
//     attractionsRes,
//     thingsRes,
//     tipsRes
//   ] = await Promise.all([
//     supabaseAdmin.from("countries").select("*").eq("id", id).single(),
//     supabaseAdmin
//       .from("country_overview")
//       .select("*")
//       .eq("country_id", id)
//       .maybeSingle(),
//     supabaseAdmin.from("country_laws").select("*").eq("country_id", id),
//     supabaseAdmin.from("country_attractions").select("*").eq("country_id", id),
//     supabaseAdmin.from("country_things_to_do").select("*").eq("country_id", id),
//     supabaseAdmin.from("country_tips").select("*").eq("country_id", id)
//   ]);

//   if (countryRes.error) {
//     return res.status(404).json({ message: "Country not found" });
//   }

//   res.json({
//     country: countryRes.data,
//     overview: overviewRes.data,
//     laws: lawsRes.data || [],
//     attractions: attractionsRes.data || [],
//     thingsToDo: thingsRes.data || [],
//     tips: groupTipsByCategory(tipsRes.data)
//   });
// };

// /* =========================
//    GET ALL COUNTRIES DETAIL
// ========================= */
// export const getAllDetail = async (req, res) => {
//   const { data: countries, error } = await supabaseAdmin
//     .from("countries")
//     .select("*");

//   if (error) {
//     return res.status(400).json({ message: error.message });
//   }

//   const result = await Promise.all(
//     countries.map(async (country) => {
//       const [
//         overviewRes,
//         lawsRes,
//         attractionsRes,
//         thingsRes,
//         tipsRes
//       ] = await Promise.all([
//         supabaseAdmin
//           .from("country_overview")
//           .select("*")
//           .eq("country_id", country.id)
//           .maybeSingle(),
//         supabaseAdmin.from("country_laws").select("*").eq("country_id", country.id),
//         supabaseAdmin
//           .from("country_attractions")
//           .select("*")
//           .eq("country_id", country.id),
//         supabaseAdmin
//          . from("country_things_to_do")
//           .select("*")
//           .eq("country_id", country.id),
//         supabaseAdmin.from("country_tips").select("*").eq("country_id", country.id)
//       ]);

//       return {
//         country,
//         overview: overviewRes.data,
//         laws: lawsRes.data || [],
//         attractions: attractionsRes.data || [],
//         thingsToDo: thingsRes.data || [],
//         tips: groupTipsByCategory(tipsRes.data)
//       };
//     })
//   );

//   res.json(result);
// };





import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   HELPER: GROUP TIPS
========================= */
const groupTipsByCategory = (tips = []) => {
  const map = {};

  tips.forEach(t => {
    if (!map[t.category]) map[t.category] = [];

    map[t.category].push({
      id: t.id,
      short: t.short,
      detail: t.detail,
      level: t.level
    });
  });

  return Object.entries(map).map(([category, items]) => ({
    category,
    items
  }));
};

/* =========================
   HELPER: GROUP LAWS
========================= */
const groupLawsByCategory = (laws = []) => {
  const map = {};
  laws.forEach(l => {
    if (!map[l.category]) map[l.category] = [];
    map[l.category].push(l);
  });

  return Object.entries(map).map(([category, laws]) => ({
    category,
    laws
  }));
};

/* =========================
   GET ONE COUNTRY DETAIL
   GET /api/countries/:id/detail
========================= */
export const getDetail = async (req, res) => {
  const { id } = req.params;

  const [
    countryRes,
    overviewRes,
    lawsRes,
    attractionsRes,
    thingsRes,
    tipsRes
  ] = await Promise.all([
    supabaseAdmin.from("countries").select("*").eq("id", id).single(),
    supabaseAdmin.from("country_overview").select("*").eq("country_id", id).maybeSingle(),
    supabaseAdmin.from("country_laws").select("*").eq("country_id", id),
    supabaseAdmin.from("country_attractions").select("*").eq("country_id", id),
    supabaseAdmin.from("country_things_to_do").select("*").eq("country_id", id),
    supabaseAdmin.from("country_tips").select("*").eq("country_id", id)
  ]);

  if (countryRes.error) {
    return res.status(404).json({ message: "Country not found" });
  }

  res.json({
    country: {
      id: countryRes.data.id,
      name: countryRes.data.name,
      region: countryRes.data.region,
      flag: countryRes.data.flag,
      capital: countryRes.data.capital,

      overview: overviewRes.data ?? null,

      laws: groupLawsByCategory(lawsRes.data ?? []),

      attractions: attractionsRes.data ?? [],
      thingsToDo: thingsRes.data ?? [],
      tips: tipsRes.data ?? []
    }
  });
};



/* =========================
   GET ALL COUNTRIES DETAIL
   GROUPED BY REGION
   GET /api/countries/detail
========================= */
export const getAllDetail = async (req, res) => {
  const { data: countries, error } = await supabaseAdmin
    .from("countries")
    .select("*");

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const result = {};

  for (const c of countries) {
    const [
      overviewRes,
      lawsRes,
      attractionsRes,
      thingsRes,
      tipsRes
    ] = await Promise.all([
      supabaseAdmin.from("country_overview").select("*").eq("country_id", c.id).maybeSingle(),
      supabaseAdmin.from("country_laws").select("*").eq("country_id", c.id),
      supabaseAdmin.from("country_attractions").select("*").eq("country_id", c.id),
      supabaseAdmin.from("country_things_to_do").select("*").eq("country_id", c.id),
      supabaseAdmin.from("country_tips").select("*").eq("country_id", c.id)
    ]);

    const region = c.region || "Unknown";
    if (!result[region]) result[region] = [];

    result[region].push({
      id: c.id,
      name: c.name,
      flag: c.flag,
      capital: c.capital,

      overview: overviewRes.data ?? null,
      laws: groupLawsByCategory(lawsRes.data ?? []),
      attractions: attractionsRes.data ?? [],
      thingsToDo: thingsRes.data ?? [],
      tips: tipsRes.data ? groupTipsByCategory(tipsRes.data) : []
    });
  }

  res.json(result);
};
