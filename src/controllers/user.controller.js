import { supabaseAdmin } from "../services/supabase.service.js";

/* =========================
   GET ALL USERS (ADMIN)
========================= */
export const getAllUsers = async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select(`
      id,
      first_name,
      last_name,
      username,
      email,
      role,
      is_active,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json(data);
};

/* =========================
   GET USER BY ID (ADMIN)
========================= */
export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from("users")
    .select(`
      id,
      first_name,
      last_name,
      username,
      email,
      role,
      is_active,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(data);
};

/* =========================
   GET MY PROFILE (USER)
========================= */
export const getMe = async (req, res) => {
  const { id } = req.user; // from JWT

  const { data, error } = await supabaseAdmin
    .from("users")
    .select(`
      id,
      first_name,
      last_name,
      username,
      email,
      role,
      is_active,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(data);
};
