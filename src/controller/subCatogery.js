import { addSubcatogeryService } from "../service/subCatogeryservice.js";
import { getSubcatByCatService } from "../service/subCatogeryservice.js";


//addSubCatogery
export const addSubCatogery = async (req, res) => {
  const { name, catogery } = req.body;
  const data = await addSubcatogeryService(name, catogery);
  if (data) {
    res.status(201).json({ message: "subcatogery created", subCatogery: data });
  }
};


//getSubcategoryByCategory
export const getSubcategoryByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const data = await getSubcatByCatService(categoryId);
  if (data) {
    res.status(200).json({ message: "subcatogery finded", subCatogery: data });
  }
};
