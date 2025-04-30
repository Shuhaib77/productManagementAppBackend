import mongoose from "mongoose";

const prodctSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subCatogery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcatogery",
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
      required: true,
    },
    varient: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Varient",
      }],
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", prodctSchema);

export default Products;
