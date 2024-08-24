import Wallet from "../models/Wallet.js";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

class WalletRepository {
  constructor(Wallet) {
    this.walletModel = Wallet;
  }

  async createWallet(name, password, countryCode, username) {
    try {
      // give new wallet 5000 for all currencies if NODE_ENV = development
      const balance = NODE_ENV === "development" ? 1000 : 0;

      // ensure username does not already exist
      const usernameExists = await this.walletModel.findOne({
        username: username,
      });

      if (usernameExists) throw new Error("username already exists");

      return await this.walletModel.create({
        name: name,
        password: password,
        countryCode: countryCode,
        username: username,
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
      throw new Error(error);
    }
  }

  async findWalletById(id) {
    try {
      return await this.walletModel.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findWalletByUsername(username) {
    try {
      return await this.walletModel.findOne({ username: username });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default WalletRepository;
