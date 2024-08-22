import Wallet from "../models/Wallet.js";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

class WalletRepository {
  constructor(Wallet) {
    this.walletModel = Wallet;
  }

  async createWallet(publicKey) {
    try {
      // give new wallet 5000 for all currencies if NODE_ENV = development
      const balance = NODE_ENV === "development" ? 5000 : 0;

      return await this.walletModel.create({
        publicKey: publicKey,
        GHS: balance,
        USDC: balance,
        NGN: balance,
        KES: balance,
        USD: balance,
        EUR: balance,
        GBP: balance,
        BTC: balance,
        BD: balance,
        AUD: balance,
        MXN: balance,
      });
    } catch (error) {
      throw error;
    }
  }

  async findWalletById(id) {
    try {
      return await this.walletModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default WalletRepository;
