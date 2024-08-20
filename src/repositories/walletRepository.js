import Wallet from "../models/Wallet.js";

class WalletRepository {
  constructor(Wallet) {
    this.walletModel = Wallet;
  }

  async createWallet() {
    try {
      return await this.walletModel.create({});
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
