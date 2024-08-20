import WalletRepository from "../repositories/walletRepository.js";
import WalletService from "../services/walletService.js";
import Wallet from "../models/Wallet.js";

export default class WalletController {
  walletRepository = new WalletRepository(Wallet);
  walletService = new WalletService(this.walletRepository);

  constructor(walletService) {
    this.walletService = walletService;
  }

  /**
   * create new wallet and send seed phrase
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async createWallet(req, res) {
    try {
      const seedPhrase = await this.walletService.generateSeedPhrase();
      const newWallet = await this.walletService.createWallet();

      return res.status(201).json({
        wallet: newWallet,
        data: seedPhrase,
        message: "ensure you write down your seed phrase",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }

  /**
   * verify seed phrase and wallet
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async verifyWallet(req, res) {
    try {
      const { walletId, seedPhrase } = req.body;
      // remove this after validation
      if (!walletId && !seedPhrase)
        return res
          .status(400)
          .json({ message: "walletId and seed phrase required" });

      const wallet = await this.walletRepository.findWalletById(walletId);

      if (!wallet)
        return res.status(404).json({ message: "wallet does not exist" });

      // split seed phrase to check length
      const splitSeedPhrase = seedPhrase.split(" ");
      if (splitSeedPhrase.length !== 12)
        return res
          .status(400)
          .json({ message: "seed phrase must be 12 letter long" });

      // veriify bip39 seed phrase
      const isSeedPhraseVerified = await this.walletService.verifySeedPhrase(
        seedPhrase
      );

      if (!isSeedPhraseVerified)
        return res.status(400).json({ message: "incorrect seed phrase" });

      wallet.isVerified = true;
      wallet.save();

      // create did and send to user to store for future transactions

      return res.status(200).json({ message: "wallet verified" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
}
