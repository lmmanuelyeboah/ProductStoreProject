import express from "express";
import { 
  PostProduct, 
  GetAllProduct, 
  GetOneProduct, 
  PutProduct, 
  DeleteProduct 
} from "../../controllers/controller.routes .js";

const router = express.Router();
export default router;

// create a new product
router.post("/product", PostProduct); 

// get all products
router.get("/product", GetAllProduct); 

// get a single product
router.get("/product/:id", GetOneProduct);

// update a product
router.put("/product/:id", PutProduct);

// delete a product
router.delete("/product/:id", DeleteProduct);
  