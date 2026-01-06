import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    region: String,
    flag: String,
    population: Number,
    description: String
  },
  { timestamps: true }
);

export default mongoose.model("Country", CountrySchema);
