import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET GROUPED BY REGION
========================= */
export const getGroupedCountries = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("countries")
    .select(`
      id,
      name,
      image_url,
      population,
      description,
      regions ( name ),
      cities ( name )
    `);

  if (error) return res.status(500).json({ message: error.message });

  const grouped = {};

  data.forEach(c => {
    const region = c.regions?.name || "Unknown";

    if (!grouped[region]) {
      grouped[region] = { region, countries: [] };
    }

    grouped[region].countries.push({
      id: c.id,
      name: c.name,
      image: c.image_url,
      population: c.population,
      description: c.description,
      cities: c.cities.map(city => city.name),
    });
  });

  res.json(Object.values(grouped));
};

/* =========================
   GET ONE
========================= */
export const getCountryById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("countries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ message: "Country not found" });

  res.json(data);
};

/* =========================
   CREATE (ADMIN)
========================= */
export const createCountry = async (req, res) => {
  const { name, image_url, population, description, region_id, cities } = req.body;

  const { data, error } = await supabaseAdmin
    .from("countries")
    .insert({ name, image_url, population, description, region_id })
    .select()
    .single();

  if (error) return res.status(400).json({ message: error.message });

  if (cities?.length) {
    await supabaseAdmin.from("cities").insert(
      cities.map(city => ({
        name: city,
        country_id: data.id,
      }))
    );
  }

  res.status(201).json({ message: "Country created", country: data });
};

/* =========================
   UPDATE (ADMIN)
========================= */
export const updateCountry = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from("countries")
    .update(req.body)
    .eq("id", id);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "Country updated" });
};

/* =========================
   DELETE (ADMIN)
========================= */
export const deleteCountry = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from("countries")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "Country deleted" });
};
