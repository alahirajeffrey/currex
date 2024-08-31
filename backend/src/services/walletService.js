import WalletRepository from "../repositories/walletRepository.js";
import Wallet from "../models/Wallet.js";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/errorHandler.js";

export default class WalletService {
  walletRepository = new WalletRepository(Wallet);

  constructor(walletRepository) {
    this.walletRepository = walletRepository;
  }

  /**
   * create a wallet for a user
   * @param {* string} name : user's name
   * @param {* string} password : user's password
   * @param {* string} countryCode : country code of user
   * @param {* string} username : unique user name
   * @returns : wallet object and did
   */
  async createWallet(name, password, countryCode, username) {
    const passwordHash = await bcrypt.hash(password, 10);

    return await this.walletRepository.createWallet(
      name,
      passwordHash,
      countryCode,
      username
    );
  }

  /**
   * login to a wallet
   * @param {* string} username : username of user
   * @param {*} password : user's password
   */
  async loginToWallet(username, password) {
    try {
      const wallet = await this.walletRepository.findWalletByUsername(username);
      // if (!wallet) throw new Error("user does not exist");

      const isPasswordCorrect = await bcrypt.compare(password, wallet.password);
      if (!isPasswordCorrect)
        throw new ApiError(401, "incorrect password or username");

      // generate token for user
      const token = jwt.sign(
        {
          name: wallet.name,
          countryCode: wallet.countryCode,
          username: username,
          walletId: wallet._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30m",
        }
      );

      return token;
    } catch (error) {
      throw error;
    }
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
      throw error;
    }
  }

  /**
   * find wallet by id
   * @param {* String} id : wallet id
   * @returns : wallet object
   */
  async getWalletBalaceById(id) {
    const wallet = await this.walletRepository.findWalletById(id);

    return wallet.balances;
  }
}
