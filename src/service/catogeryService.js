import Catogery from "../modals/catogeryModal.js";

export const addCatogeryService = async (name) => {
    console.log(name);
    
  if (!name) {
    throw new Error("field are requird");
  }

  const check = await Catogery.findOne({ name: name });
  if (check) {
    throw new Error("catogery allredy existss");
  }

  const newCatogery = await Catogery.create({
    name: name,
  });

  return newCatogery;
};

export const getAllCatogeryService = async () => {
    const catogeries = await Catogery.find();
    return catogeries;
  };