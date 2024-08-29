import express from "express";
import Transaction from "../models/Transaction.js";
import TransactionService from "../services/transactionService.js";
import TransactionController from "../controllers/transactionController.js";
import TransactionRepository from "../repositories/transactionRepository.js";
import verifyToken from "../utils/decodeToken.js";

const transactionRepository = new TransactionRepository(Transaction);
const transactionService = new TransactionService(transactionRepository);
const tranasctionController = new TransactionController(transactionService);

const transctionRouter = express.Router();

transctionRouter.get(
  "/offerings/:from/:to",
  tranasctionController.getOfferings.bind(tranasctionController)
);

transctionRouter.get(
  "/pfi/:pfiDid",
  tranasctionController.getPfiTransactionsByDid.bind(tranasctionController)
);

transctionRouter.get(
  "/wallet",
  verifyToken,
  tranasctionController.getWalletTransactionById.bind(tranasctionController)
);

transctionRouter.get(
  "/:transactionId",
  tranasctionController.getSingleTransactionById.bind(tranasctionController)
);

export default transctionRouter;
