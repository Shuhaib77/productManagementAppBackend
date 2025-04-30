import {
  aadProductService,
  getProductByIdService,
  getProductService,
  updateProductService,
} from "../service/productService.js";

export const addProduct = async (req, res) => {
  const { title, description, subCatogery, varients } = req.body;
  console.log(title, description, subCatogery, varients, "llopp");

  const image = req.cloudinaryImageUrls;

  console.log(image, "imagee");

  const { newProduct, createdVarients } = await aadProductService(
    title,
    description,
    subCatogery,
    image,
    varients
  );
  if (newProduct && createdVarients) {
    res.status(201).json({
      message: "product created",
      product: newProduct,
      varient: createdVarients,
    });
  }
};

export const getProducts = async (req, res) => {
  const { search } = req.query;

  const data = await getProductService(search);
  if (data) {
    res.status(200).json({ message: "product finded", products: data });
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id.trim();

  const { product, varients } = await getProductByIdService(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    message: "Product found",
    product,
    varients,
  });
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { title, description, subCatogery, varients } = req.body;

  const image = req.cloudinaryImageUrls;

  const updatedProduct = await updateProductService(
    productId,
    title,
    description,
    subCatogery,
    image,
    varients
  );

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
};
