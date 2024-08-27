import WalletRepository from "../repositories/walletRepository.js";
import WalletService from "../services/walletService.js";
import Wallet from "../models/Wallet.js";
import { DidDht } from "@web5/dids";
import ErrorHandler from "../utils/errorHandler.js";

export default class WalletController {
  walletRepository = new WalletRepository(Wallet);
  walletService = new WalletService(this.walletRepository);

  constructor(walletService) {
    this.walletService = walletService;
  }

  // create wallet  for users
  async createWallet(req, res) {
    try {
      const { name, password, countryCode, username } = req.body;

      if (!name && !password && !countryCode && !username)
        throw new Error("name, password, countryCode, username required");

      // Creates a DID using the DHT method and publishes the DID Document to the DHT
      const didDht = await DidDht.create({ publish: true });

      //DID and its associated data which can be exported and used in different contexts/apps
      const portableDid = await didDht.export();

      const wallet = await this.walletService.createWallet(
        name,
        password,
        countryCode,
        username
      );

      // encrypt did before sending to FE

      return res.status(201).json({
        data: { wallet: wallet, didUri: portableDid.uri },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async loginToWallet(req, res) {
    try {
      const { username, password } = req.body;
      if (!username && !password)
        throw new Error("username and password required");

      const token = await this.walletService.loginToWallet(username, password);

      return res.status(200).json({ data: token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async createVerifiableCredetial(req, res) {
    try {
      const response = await this.walletService.createVerifiableCredetial(
        req.user.name,
        req.user.countryCode,
        req.user.didUri
      );

      return res.status(200).json({ data: response.data });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async getWalletBalaceById(req, res) {
    try {
      const walletBalances = await this.walletService.getWalletBalaceById(
        req.user.walletId
      );

      return res.status(200).json({ data: walletBalances });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
