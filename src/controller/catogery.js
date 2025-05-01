import { addCatogeryService } from "../service/catogeryService.js";
import { getAllCatogeryService } from "../service/catogeryService.js";

//addCatogery

export const addCatogery = async (req, res) => {
  const { name } = req.body;

  const data = await addCatogeryService(name);
  if (data) {
    res
      .status(201)
      .json({ message: "catogery added successfully", catogery: data });
  }
};

//getCatogery

export const getCatogery = async (req, res) => {
  const data = await getAllCatogeryService();
  res
    .status(200)
    .json({ message: "catogery added successfully", catogeries: data });
};
