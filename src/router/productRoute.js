import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import  { addProduct, getProductById, getProducts } from "../controller/product.js";
import uploadImage from "../utils/multer.js";


const productRoute = express.Router();

productRoute.post("/add/product",uploadImage, tryCatch(addProduct));
productRoute.get("/products", tryCatch(getProducts));
productRoute.get("/products/:id", tryCatch(getProductById));

export default productRoute;
