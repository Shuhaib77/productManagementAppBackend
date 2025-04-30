import express from "express";

import { addWishList, deleteWishList, getWishList } from "../controller/wishlist.js";
import { verfyToken } from "../middlewares/authVerify.js";
import tryCatch from "../middlewares/tryCatch.js";

const wishlistRoute = express.Router();

wishlistRoute.post("/add/wishlist/:productId", verfyToken,tryCatch(addWishList));
wishlistRoute.post("/delete/wishlist/:productId", verfyToken,tryCatch(deleteWishList));
wishlistRoute.get("/wishlist", verfyToken,tryCatch(getWishList));

export default wishlistRoute;
