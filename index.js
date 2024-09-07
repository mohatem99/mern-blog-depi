import express from "express";
import connectionDb from "./src/db/connectionDb.js";
import { config } from "dotenv";
import postsRoutes from "./src/modules/posts/posts.routes.js";

import authRoutes from "./src/modules/auth/auth.routes.js";

import addRoutes from "./src/modules/adds/add.routes.js";
config();
const app = express();
app.use(express.json());
app.use("/posts", postsRoutes);
app.use("/auth", authRoutes);
app.use("/adds", addRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Url not found",
  });
});
app.use((err, req, res, next) => {
  res.status(400).json({
    message: err.message,
  });
});
connectionDb();
let port = process.env.PORT || 9000;

app.listen(port, () => console.log("server up and running"));
