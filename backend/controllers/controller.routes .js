import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Creates a new product in the database
export const PostProduct = async (req, res) => {
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
  };

// Retrieves all products from the database
export const GetAllProduct = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: "Error getting products", error: error });
    }
  };

// Retrieves a single product by its ID from the database
export const GetOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ message: "Error getting product", error: error });
    }
  };

// Updates an existing product by its ID in the database
export const PutProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, description } = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid product id" });
    }
    
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id, 
        { name, price, image, description }, 
        { new: true, runValidators: true }
      );
      
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.status(200).json({ 
        message: "Product updated successfully", 
        product: updatedProduct 
      });
    } catch(error){
      res.status(500).json({ message: "Error updating product", error: error });
    }
  };

// Deletes a product by its ID from the database
export const DeleteProduct =  async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error: error });
    }
  };