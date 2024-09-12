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
import WalletRepository from "../repositories/walletRepository.js";
import allowedPfis from "../../../allowedPfis.json" assert { type: "json" };
import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";
import ApiError from "../utils/errorHandler.js";

export default class TransactionService {
  transactionRepository = new TransactionRepository(Transaction);
  walletRepository = new walletRepository(Wallet);
  constructor(transactionRepository) {
    this.transactionRepository = transactionRepository;
    this.walletRepository = this.walletRepository;
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

            allOfferings.push(...offerings);
          }
        }
      }

      return allOfferings;
    } catch (error) {
      console.log(error);
      throw new ApiError(500, error);
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

  async createExchange(
    walletId,
    offering,
    amount,
    from,
    payoutPaymentDetails,
    verifiableCredential,
    did
  ) {
    try {
      // check wallet bakance
      const wallet = await this.walletRepository.findWalletById(walletId);
      const balanceDetails = wallet.balances.find(
        (balance) => balance.currency === from
      );
      if (balanceDetails.amount < amount * 1.2) {
        throw new ApiError(400, "Insufficient balance");
      }
      // decrypt did

      // select only necessary credentials
      const selectedCredentials = PresentationExchange.selectCredentials({
        vcJwts: verifiableCredential,
        presentationDefinition: offering.data.requiredClaims,
      });

      // create rfq message to request for quotes
      const rfq = Rfq.create({
        metadata: {
          from: did,
          to: offering.metadata.from,
          protocol: "1.0",
        },
        data: {
          offeringId: offering.id,
          payin: {
            amount: amount.toString(),
            kind: offering.data.payin.methods[0].kind,
            paymentDetails: {},
          },
          payout: {
            kind: offering.data.payout.methods[0].kind,
            paymentDetails: payoutPaymentDetails,
          },
          claims: selectedCredentials,
        },
      });

      rfq.verifyOfferingRequirements(offering);

      await rfq.sign(did);

      await TbdexHttpClient.createExchange(rfq);

      const exchanges = await TbdexHttpClient.getExchanges({
        pfiDid: pfiUri,
        did: state.customerDid,
      });

      console.log(exchanges);
      return exchanges;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addCloseAndOrder(exchangeId, pfiUri, reason, walletId, from, to, pfi) {
    try {
      const close = Close.create({
        metadata: {
          from: state.customerDid.uri,
          to: pfiUri,
          exchangeId,
        },
        data: {
          reason,
        },
      });

      await close.sign(state.customerDid);

      await TbdexHttpClient.submitClose(close);

      const order = Order.create({
        metadata: {
          from: state.customerDid.uri,
          to: pfiUri,
          exchangeId,
        },
      });

      await order.sign(state.customerDid);

      // Send order message
      await TbdexHttpClient.submitOrder(order);

      return await this.transactionRepository.createTransaction(
        walletId,
        from,
        to,
        pfi,
        pfiUri
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
