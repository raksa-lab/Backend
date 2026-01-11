import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

// ✅ TEST ROUTES
app.get("/", (req, res) => {
  res.send("Country Explorer Backend is Running ✅");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", routes);

export default app;

