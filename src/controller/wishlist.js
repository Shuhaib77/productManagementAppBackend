import {
  addWishListService,
  deleteWishListService,
  getWishListService,
} from "../service/wishlistService.js";

export const addWishList = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  console.log(userId, productId);

  const data = await addWishListService(productId, userId);
  if (data) {
    res
      .status(200)
      .json({ message: "product added to wishlist", wishlist: data });
  }
};

export const deleteWishList = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  const data = await deleteWishListService(productId, userId);
  if (data) {
    res
      .status(200)
      .json({ message: "product removed from wishlist", wishlist: data });
  }
};

export const getWishList = async (req, res, next) => {
  const userId = req.user._id;
  const data = await getWishListService(userId);
  if (data) {
    res
      .status(200)
      .json({ message: "product removed from wishlist", wishlist: data });
  }
};
