import express from "express";
import Transaction from "../models/Transaction.js";
import TransactionService from "../services/transactionService.js";
import TransactionController from "../controllers/transactionController.js";
import TransactionRepository from "../repositories/transactionRepository.js";

const transactionRepository = new TransactionRepository(Transaction);
const transactionService = new TransactionService(transactionRepository);
const tranasctionController = new TransactionController(transactionService);

const transctionRouter = express.Router();

transctionRouter.get(
  "/offerings",
  tranasctionController.getOfferings.bind(tranasctionController)
);

export default transctionRouter;
