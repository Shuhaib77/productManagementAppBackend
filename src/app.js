import express from "express";
import cors from "cors";
import { Db } from "../config/connectDb.js";
import authRoute from "./router/authRoute.js";
import { globelErrors } from "./middlewares/globelErrors.js";
import catogeryRoute from "./router/catogeryRoute.js";
import subCatogeryRoute from "./router/subCatogeryRoute.js";
import productRoute from "./router/productRoute.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(globelErrors);
app.use("/api", authRoute);
app.use("/api", catogeryRoute);
app.use("/api", subCatogeryRoute);
app.use("/api", productRoute);

Db();

export default app;
