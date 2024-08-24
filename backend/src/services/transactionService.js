import {
  TbdexHttpClient,
  Rfq,
  Quote,
  Order,
  OrderStatus,
  Close,
  Message,
} from "@tbdex/http-client";
import { VerifiableCredential, PresentationExchange } from "@web5/credentials";
import TransactionRepository from "../repositories/transactionRepository.js";
import allowedPfis from "../../../allowedPfis.json" assert { type: "json" };
import Transaction from "../models/Transaction.js";

export default class TransactionService {
  transactionRepository = new TransactionRepository(Transaction);
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  /**
   * loop through the pfis and fetch offerings matching requirement
   * @param {*String} to : currency converted to
   * @param {*String} from : currencey being converted
   * @returns : a list of pfis with desired offering
   */
  async fetchOfferings(to, from) {
    try {
      const allOfferings = [];

      // loop through avalilable pfis
      for (const pfi of allowedPfis) {
        // loop through offering of current pfi and compare
        for (const offering of pfi.offerings) {
          if (to === offering.to && from === offering.from) {
            // connect to tbdex and get offerings

            const offerings = await TbdexHttpClient.getOfferings({
              pfiDid: pfi.did,
            });
            console.log(offering);
            allOfferings.push(...offerings);
          }
        }
      }

      return allOfferings;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * get all transactions by a pfi
   * @param {*String} pfiDid : DID of pfi
   * @returns : array of trandactions made using a PFI
   */
  async getPfiTransactionsByDid(pfiDid) {
    return await this.transactionRepository.getPfiTransactionsByDid(pfiDid);
  }

  /**
   * get single transaction by id
   * @param {* String} transactionId : transactionId
   * @returns : transaction object
   */
  async getSingleTransactionById(transactionId) {
    return await this.transactionRepository.getSingleTransactionById(
      transactionId
    );
  }

  /**
   * get transactions made by a wallet
   * @param {* String} walletId : id of wallet
   * @returns : array of transactiobs made by a wallet
   */
  async getWalletTransactionById(walletId) {
    return await this.transactionRepository.getWalletTransactionById(walletId);
  }
}
