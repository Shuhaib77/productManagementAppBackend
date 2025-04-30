import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import { addSubCatogery, getSubcategoryByCategory } from "../controller/subCatogery.js";

const subCatogeryRoute = express.Router();

subCatogeryRoute.post("/add/subcatogery", tryCatch(addSubCatogery));
subCatogeryRoute.get("/subcatogery/:categoryId", tryCatch(getSubcategoryByCategory));

export default subCatogeryRoute;
