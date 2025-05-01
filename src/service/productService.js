import Products from "../modals/productModal.js";
import Subcatogery from "../modals/subCatogeryModal.js";
import Varient from "../modals/varientModal.js";

//aadProductService
export const aadProductService = async (
  title,
  description,
  subCatogery,
  image,
  varients
) => {
  if (!title || !description || !subCatogery || !image) {
    throw new Error("All fields are required");
  }

  const checkProduct = await Products.findOne({ title });
  if (checkProduct) {
    throw new Error("The product already exists");
  }

  const subCat = await Subcatogery.findOne({ name: subCatogery });
  if (!subCat) {
    throw new Error("Subcategory not found. Please add it first.");
  }

  let newProduct = await Products.create({
    title,
    description,
    subCatogery: subCat._id,
    image,
  });

  let parsedVarients;
  try {
    parsedVarients =
      typeof varients === "string" ? JSON.parse(varients) : varients;
  } catch (err) {
    throw new Error("invalid varient format");
  }
  if (!Array.isArray(parsedVarients)) {
    throw new Error("varients is must array");
  }

  const createdVarients = await Varient.insertMany(
    parsedVarients.map((items) => ({
      ...items,
      product: newProduct._id,
    }))
  );

  newProduct.varient.push(...createdVarients.map((item) => item._id));
  await newProduct.save();

  return {
    newProduct,
    createdVarients,
  };
};

//getProductService


export const getProductService = async (search = "", subCatIds = []) => {
    const query = {
      isDelete: false,
    };
  
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
  
    if (subCatIds.length > 0) {
      query.subCatogery = { $in: subCatIds };
    }
  
    const products = await Products.find(query).populate("varient");
  
    if (!products || products.length === 0) {
      throw new Error("No products found");
    }
  
    return products;
  };
  

//getProductByIdService
export const getProductByIdService = async (id) => {
  if (!id) {
    throw new Error("invalid product");
  }
  const product = await Products.findOne({ _id: id, isDelete: false }).populate(
    { path: "subCatogery" }
  );
  const varients = await Varient.find({ product: id });

  return { product, varients };
};

//updateproductsrvice
export const updateProductService = async (
  productId,
  title,
  description,
  subCatogery,
  image,
  varients
) => {
  const product = await Products.findById(productId);
  if (!product) {
    throw new Error("product not found");
  }
  console.log(productId, title, description, subCatogery, image, varients);
  const subCat = await Subcatogery.findOne({ name: subCatogery });
  product.title = title || product.title;
  product.description = description || product.description;
  product.subCatogery = subCat._id || product.subCatogery;
  product.image = image.length ? image : product.image;

  await product.save();
  //varientUpdate
  if (Array.isArray(varients) && varients.length > 0) {
    for (const variantData of varients) {
      if (variantData._id) {
        await Varient.findByIdAndUpdate(variantData._id, variantData, {
          new: true,
        });
      } else {
        const newVariant = new Varient({
          ...variantData,
          product: productId,
        });
        await newVariant.save();
      }
    }
  }

  return product;
};
