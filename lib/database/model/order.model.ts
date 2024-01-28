import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  CreateAt: Date;
  stripedId: string;
  totalAmount?: string;
  event: { _id: string; title: string };
  buyer: { _id: string; firstName: string; lastName: string };
}

const orderSchema = new mongoose.Schema({
  CreateAt: { type: Date, default: Date.now },
  stripedId: { type: String, required: true, unique: true },
  totalAmount: { type: String },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
