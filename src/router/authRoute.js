import express from "express";
import { login, register } from "../controller/auth.js";
import tryCatch from "../middlewares/tryCatch.js";

const authRoute = express.Router();

authRoute.post("/register", tryCatch(register));
authRoute.post("/login", tryCatch(login));

export default authRoute;
