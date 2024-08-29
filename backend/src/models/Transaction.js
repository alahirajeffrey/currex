import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    walletId: { type: String, required: true },
    from: { type: String },
    to: { type: String },
    pfiName: { type: String },
    pfiDid: { type: String },
    id: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
