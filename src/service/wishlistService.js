import Wishlist from "../modals/wishlistModal.js";

export const addWishListService = async (productId, userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = new Wishlist({ user: userId, products: [productId] });
  } else {
    const alreadyExists = wishlist.products.includes(productId);
    if (alreadyExists) {
      throw new Error("product already existt");
    }
    wishlist.products.push(productId);
  }

  return await wishlist.save();
};

export const deleteWishListService = async (productId, userId) => {
  if (!productId) {
    throw new Error("invalid id");
  }

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    throw new Error("wishlist not exist");
  }

  wishlist.products.pull(productId);
  return await wishlist.save();
};

export const getWishListService = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "products"
  );

  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  return wishlist || [];
};
