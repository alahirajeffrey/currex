import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  id: { type: String, required: false },
  createdAt: { type: Date, required: true, unique: true },
  updatedAt: { type: Date, default: new Date.now() },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
