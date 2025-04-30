import mongoose from "mongoose";

const SubcatogerySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    catogery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catogery",
    },
  },
  {
    timestamps: true,
  }
);

const Subcatogery = mongoose.model("Subcatogery", SubcatogerySchema);

export default Subcatogery;
