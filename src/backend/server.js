import express from "express";
import apiRoutes from "./express_routing.js";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json()); // VERY IMPORTANT
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});