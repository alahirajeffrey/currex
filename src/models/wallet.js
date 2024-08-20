import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
