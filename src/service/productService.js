import Products from "../modals/productModal.js";
import Subcatogery from "../modals/subCatogeryModal.js";
import Varient from "../modals/varientModal.js";

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
    throw new Error("Invalid varients format — must be valid JSON.");
  }
  if (!Array.isArray(parsedVarients)) {
    throw new Error("Varients must be an array.");
  }

  const createdVarients = await Varient.insertMany(
    parsedVarients.map((items) => ({
      ...items,
      product: newProduct._id,
    }))
  );

  newProduct.varient.push(...createdVarients.map(item=> item._id));
  await newProduct.save();

  return {
    newProduct,
    createdVarients,
  };
};

export const getProductService = async (search) => {
  const quary = search
    ? {
        isDelete: false,
        $or: [{ title: { $regex: search, $options: "i" } }],
      }
    : {
        isDelete: false,
      };

  const products = await Products.find(quary).populate({path:"varient"})
  if (!products) {
    throw new Error("no product exits");
  }
  return products;
};

export const getProductByIdService = async (id) => {
  if (!id) {
    throw new Error("invalid product");
  }
 const product = await Products.findOne({ _id:id, isDelete: false }).populate(
    { path: "subCatogery" }
  );
  const varients = await Varient.find({ product:id });

  return { product, varients };
};
