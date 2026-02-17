import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

// 🔥 Connect DB before starting server
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});