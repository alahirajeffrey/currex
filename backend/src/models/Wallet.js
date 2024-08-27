import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    countryCode: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    balances: [
      {
        currency: { type: String, required: true },
        amount: { type: Number, required: true, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
