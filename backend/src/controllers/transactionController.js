import Transaction from "../models/Transaction.js";
import TransactionRepository from "../repositories/transactionRepository.js";
import TransactionService from "../services/transactionService.js";

export default class TransactionController {
  transactionRepository = new TransactionRepository(Transaction);
  transactionService = new TransactionService(this.transactionRepository);

  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  async getOfferings(req, res) {
    try {
      const from = req.params.from;
      const to = req.params.to;

      if (!to && !from) throw new Error("to and from currencies required");

      const offerings = await this.transactionService.fetchOfferings(to, from);

      return res.status(200).json({ data: offerings });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async getPfiTransactionsByDid(req, res) {
    try {
      const { pfiDid } = req.prams.pfiDid;

      if (!pfiDid) throw new Error("pfiDid required");
      const transactions =
        await this.transactionService.getPfiTransactionsByDid(pfiDid);

      return res.status(200).json({ data: transactions });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async getSingleTransactionById(req, res) {
    try {
      const { transactionId } = req.prams.transactionId;

      if (!transactionId) throw new Error("transactonId required");
      const transaction =
        await this.transactionService.getSingleTransactionById(transactionId);

      return res.status(200).json({ data: transaction });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async getWalletTransactionById(req, res) {
    try {
      const { walletId } = req.user.walletId;

      if (!walletId) throw new Error("walletId required");
      const transactions =
        await this.transactionService.getWalletTransactionById(walletId);

      return res.status(200).json({ data: transactions });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
