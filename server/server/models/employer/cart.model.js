import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    cartItems: [Object],
    employerID: {
      type: mongoose.Schema.ObjectId,
      ref: "Employer",
      required: true,
    },
  },
  {
    // virtuals true => it displays virtual schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("Cart", CartSchema);
