import WalletRepository from "../repositories/walletRepository.js";
import WalletService from "../services/walletService.js";
import Wallet from "../models/Wallet.js";
import { DidDht } from "@web5/dids";

export default class WalletController {
  walletRepository = new WalletRepository(Wallet);
  walletService = new WalletService(this.walletRepository);

  constructor(walletService) {
    this.walletService = walletService;
  }

  // create wallet  for users
  async createWallet(req, res) {
    try {
      const seedPhrase = await this.walletService.generateSeedPhrase();

      // Creates a DID using the DHT method and publishes the DID Document to the DHT
      const didDht = await DidDht.create({ publish: true });

      //DID and its associated data which can be exported and used in different contexts/apps
      const portableDid = await didDht.export();

      return res.status(201).json({
        portableDid: portableDid,
        data: seedPhrase,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  // verify wallet and create DID
  async verifyWallet(req, res) {
    try {
      const { publicKey, seedPhrase } = req.body;
      // remove this after validation
      if (!publicKey && !seedPhrase)
        return res
          .status(400)
          .json({ message: "publicKey and seed phrase required" });

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

      // create and verify wallet
      const wallet = await this.walletRepository.createWallet(publicKey);

      return res.status(200).json({ data: wallet, message: "wallet created" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
