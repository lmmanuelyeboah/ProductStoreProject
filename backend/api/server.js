import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/ProductStoreDB.js";
import Product from "../models/product.model.js";
dotenv.config();
const app = express();
app.use(express.json());// allows us to send json data to the server
app.get("/", (req, res) => {});
console.log(process.env.MONGO_URI);
app.post("/product", async (req, res) => {
  const { name, price, image, description } = req.body;
  if (!name || !price || !image || !description) {
    return res.status(400).json({ message: "please fill all the fields" });
  }
  const newProduct = new Product({ name, price, image, description });
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error });
  }
}); // ensuring all the fields are filled

app.listen(3000, () => {
  connectDB();
  console.log("server started at http://localhost:3000");
});
