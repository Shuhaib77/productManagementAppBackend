import mongoose from "mongoose";

const varientSchema = mongoose.Schema(
  {
    varientName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Varient = mongoose.model("Varient", varientSchema);

export default Varient;
