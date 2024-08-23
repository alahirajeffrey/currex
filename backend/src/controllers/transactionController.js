import Transaction from "../models/Transaction.js";
import TransactionRepository from "../repositories/transactionRepository.js";
import TransactionService from "../services/transactionService.js";

export default class TransactionController {
  transactionRepository = new TransactionRepository(Transaction);
  transactionService = new TransactionService(this.transactionRepository);

  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  getOfferings(req, res) {
    try {
      const { to, from } = req.body;
      if (!to && !from) throw new Error("to and from currencies required");

      const offerings = this.transactionService.fetchOfferings(to, from);

      return res.status(200).json({ data: offerings });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
