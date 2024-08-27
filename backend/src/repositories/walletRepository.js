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
      const initialBalance = NODE_ENV === "development" ? 1000 : 0;

      // ensure username does not already exist
      const usernameExists = await this.walletModel.findOne({
        username: username,
      });

      if (usernameExists) throw new Error("username already exists");

      const balances = [
        { currency: "GHS", amount: initialBalance },
        { currency: "USDC", amount: initialBalance },
        { currency: "NGN", amount: initialBalance },
        { currency: "KES", amount: initialBalance },
        { currency: "USD", amount: initialBalance },
        { currency: "EUR", amount: initialBalance },
        { currency: "GBP", amount: initialBalance },
        { currency: "BTC", amount: initialBalance },
        { currency: "BD", amount: initialBalance },
        { currency: "AUD", amount: initialBalance },
        { currency: "MXN", amount: initialBalance },
      ];

      return await this.walletModel.create({
        name: name,
        password: password,
        countryCode: countryCode,
        username: username,
        balances: balances,
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
