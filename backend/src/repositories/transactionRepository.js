import Transaction from "../models/Transaction.js";

export default class TransactionRepository {
  constructor(Transaction) {
    this.transactionModel = Transaction;
  }

  async createTransaction(walletId, from, to, pfi, pfiDid) {
    try {
      return await this.transactionModel.create({
        walletId,
        from,
        to,
        pfi,
        pfiDid,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async attachIdToTransaction(transactionId) {
    try {
      const transaction = await this.transactionModel.findById(transactionId);
      transaction.id = transaction._id;
      transaction.save();

      return transaction;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPfiTransactionsByDid(pfiDid) {
    try {
      return await this.transactionModel.find({ pfiDid: pfiDid });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSingleTransactionById(transactionId) {
    try {
      return await this.transactionModel.findById(transactionId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getWalletTransactionById(walletId) {
    try {
      return await this.transactionModel.find({ walletId: walletId });
    } catch (error) {
      throw new Error(error);
    }
  }
}
