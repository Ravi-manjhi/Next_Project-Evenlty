import mongoose from "mongoose";

export interface IOrder extends mongoose.Document {
  CreateAt: Date;
  stripeId: string;
  totalAmount?: string;
  event: { _id: string; title: string };
  buyer: { _id: string; firstName: string; lastName: string };
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  eventTitle: string;
  eventId: string;
  buyer: string;
};

const orderSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  totalAmount: { type: String },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
