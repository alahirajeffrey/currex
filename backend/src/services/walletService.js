import bip39 from "bip39";
import WalletRepository from "../repositories/walletRepository.js";
import Wallet from "../models/Wallet.js";

export default class WalletService {
  walletRepository = new WalletRepository(Wallet);

  constructor(walletRepository) {
    this.walletRepository = walletRepository;
  }

  /**
   * generate 12 letter seed phrase
   * @returns
   */
  async generateSeedPhrase() {
    return bip39.generateMnemonic();
  }

  /**
   * verify generated seed phrase
   * @returns
   */
  async verifySeedPhrase(seedPhrase) {
    return bip39.validateMnemonic(seedPhrase);
  }

  /**
   * create wallet
   * @returns
   */
  async createWallet(publicKey) {
    return await this.walletRepository.createWallet(publicKey);
  }

  /**
   * find wallet by id
   * @param {*String} id: wallet id
   * @returns
   */
  async findWalletById(id) {
    return await this.walletRepository.findWalletById(id);
  }
}
