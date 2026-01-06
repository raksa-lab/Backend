import mongoose from "mongoose";

const OverviewSchema = new mongoose.Schema(
  {
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
      unique: true
    },

    summary: String,
    capital: String,
    language: String,
    currency: {
      name: String,
      code: String
    },
    timezone: String,

    map: {
      embedUrl: String,
      openUrl: String
    },

    geography: String,
    culture: String,
    bestTimeToVisit: String,
    travelTip: String,
    highlights: [String],

    laws: [
      {
        title: String,
        description: String
      }
    ],

    attractions: [
      {
        name: String,
        city: String,
        description: String,
        mapUrl: String
      }
    ],

    thingsToDo: [String],
    tipsAndHints: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Overview", OverviewSchema);
