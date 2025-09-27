import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/ProductStoreDB.js";
import productRoutes from "./ProductRoutes/product.routes.js";
dotenv.config();
const app = express();
app.use(express.json()); // allows us to send json data to the server

// Use product routes
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Product Store API is running!" });
});
console.log(process.env.MONGO_URI);

app.listen(3000, () => {
  connectDB();
  console.log("server started at http://localhost:3000");
  console.log("Available routes:");
  console.log("GET    http://localhost:3000/api/product");
  console.log("POST   http://localhost:3000/api/product");
  console.log("GET    http://localhost:3000/api/product/:id");
  console.log("PUT    http://localhost:3000/api/product/:id");
  console.log("DELETE http://localhost:3000/api/product/:id");
});
