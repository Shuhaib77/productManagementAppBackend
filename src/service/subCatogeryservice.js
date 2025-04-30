import Catogery from "../modals/catogeryModal.js";
import Subcatogery from "../modals/subCatogeryModal.js";



//addSubcatogeryService
export const addSubcatogeryService = async (name, catogery) => {
  if (!name || !catogery) {
    throw new Error("all filds are required");
  }
  const check = await Subcatogery.findOne({ name: name });
  if (check) {
    throw new Error("subCatogery alredy exists");
  }
  console.log(catogery);
  
  const findCatogery=await Catogery.findOne({name:catogery})
  if(!findCatogery){
    throw new Error("catogery not exists plss add catogery");
  }

  const newSubCat = await Subcatogery.create({
    name: name,
    catogery: findCatogery._id,
  });

  return newSubCat;
};

//getsubCatogeryy
export const getSubcatByCatService = async (categoryId) => {
  if (!categoryId) {
    throw new Error("category id is required")
  }
const subcategories = await Subcatogery.find({ catogery: categoryId }).populate({path:"catogery"});
  return subcategories;
};