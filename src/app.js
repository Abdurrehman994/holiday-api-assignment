import express from "express";
import holidayRoutes from "./routes/holidayRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", holidayRoutes);
app.use("/api", countryRoutes);

app.get("/", (req, res) => {
  res.send("Holiday API is running");
});

export default app;
