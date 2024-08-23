import Transaction from "../models/Transaction.js";

export default class TransactionRepository {
  constructor(Transaction) {
    this.transactionModel = Transaction;
  }
}
