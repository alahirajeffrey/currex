import WalletService from "../services/walletService.js";

export default class WalletController {
  walletService = new WalletService();

  constructor(walletService) {
    this.walletService = walletService;
  }

  async createWallet(req, res) {
    try {
      const seedPhrase = await this.walletService.generateSeedPhrase();
      return res.status(200).json({ message: seedPhrase });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
}
