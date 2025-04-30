import express from "express";
import tryCatch from "../middlewares/tryCatch.js";
import { addCatogery, getCatogery } from "../controller/catogery.js";

const catogeryRoute = express.Router();

catogeryRoute.post("/add/catogery", tryCatch(addCatogery));
catogeryRoute.get("/catogery", tryCatch(getCatogery));

export default catogeryRoute;
