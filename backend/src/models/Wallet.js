import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    publicKey: { type: String, required: true },
    GHS: { type: Number, default: 0 },
    USDC: { type: Number, default: 0 },
    NGN: { type: Number, default: 0 },
    KES: { type: Number, default: 0 },
    USD: { type: Number, default: 0 },
    EUR: { type: Number, default: 0 },
    GBP: { type: Number, default: 0 },
    BTC: { type: Number, default: 0 },
    BD: { type: Number, default: 0 },
    AUD: { type: Number, default: 0 },
    MXN: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
