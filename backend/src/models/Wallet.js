import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    publicKey: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
