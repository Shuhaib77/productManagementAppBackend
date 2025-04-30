import mongoose from "mongoose";

const CatogerySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
  },
  {
    timestamps: true,
  }
);


const Catogery=mongoose.model("Catogery",CatogerySchema)

export default Catogery