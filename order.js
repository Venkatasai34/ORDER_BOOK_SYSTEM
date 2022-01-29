const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    amount: { type: Number },
    qty:{type: Number},
    status: {
      type: String,
      default: "Recieved",
      enum: ["Accepted", "Rejected", "Placed"],
    },
    updated: Date,
    // stockId: { type:  ObjectId,ref:"stock"},
    user: {
      type: ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };