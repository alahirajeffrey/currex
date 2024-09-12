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

  async createExchange(req, res) {
    try {
      const {
        offering,
        amount,
        from,
        payoutPaymentDetails,
        verifiableCredential,
        did,
      } = req.body;

      const exchanges = await this.transactionService.createExchange(
        req.user.walletId,
        offering,
        amount,
        from,
        payoutPaymentDetails,
        verifiableCredential,
        did
      );

      return res.status(200).json({ data: exchanges });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  async addAndCloseOrder(req, res) {
    try {
      const { exchangeId, pfiUri, reason, from, to, pfi } = req.body;

      const transaction = await this.transactionService.addCloseAndOrder(
        exchangeId,
        pfiUri,
        reason,
        req.user.walletId,
        from,
        to,
        pfi
      );

      return res.status(200).json({ data: transaction });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
