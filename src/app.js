// import express from "express";
// import authRoutes from "./routes/auth.routes.js";

// const app = express();

// app.use(express.json());
// app.use("/api/auth", authRoutes);

// export default app;


import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import countryRoutes from "./routes/country.routes.js";
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/countries", countryRoutes);

export default app;
