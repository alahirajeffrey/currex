import bip39 from "bip39";
import WalletRepository from "../repositories/walletRepository.js";
import Wallet from "../models/Wallet.js";
import axios from "axios";

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

  /**
   * create verifiable credential for customer
   * @param {* String} customerName : Name of customer
   * @param {* String} countryCode : Country code of customer
   * @param {* String} customerDid : Customer DID
   * @returns : axios response object
   */
  async createVerifiableCredetial(customerName, countryCode, customerDid) {
    try {
      const response = await axios.get(
        `https://mock-idv.tbddev.org/kcc?name=${customerName}&country=${countryCode}&did=${customerDid}`
      );

      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
