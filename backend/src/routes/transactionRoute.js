import express from "express";
import Transaction from "../models/Transaction.js";
import TransactionService from "../services/transactionService.js";
import TransactionController from "../controllers/transactionController.js";
import TransactionRepository from "../repositories/transactionRepository.js";
import verifyToken from "../utils/decodeToken.js";
import {
  routerValidator,
  getPfiOfferingsValidation,
  getPfiRatingValidation,
  getTranasctionByIdValidation,
  createExchangeValidation,
  addAndCloseOrderValidation,
} from "../utils/validations.js";

const transactionRepository = new TransactionRepository(Transaction);
const transactionService = new TransactionService(transactionRepository);
const tranasctionController = new TransactionController(transactionService);

const transctionRouter = express.Router();

transctionRouter.get(
  "/:transactionId",
  routerValidator.params(getTranasctionByIdValidation),
  tranasctionController.getSingleTransactionById.bind(tranasctionController)
);

transctionRouter.get(
  "/offerings/:from/:to",
  routerValidator.params(getPfiOfferingsValidation),
  tranasctionController.getOfferings.bind(tranasctionController)
);

transctionRouter.get(
  "/pfi/:pfiDid",
  routerValidator.params(getPfiRatingValidation),
  tranasctionController.getPfiTransactionsByDid.bind(tranasctionController)
);

transctionRouter.get(
  "/wallet",
  verifyToken,
  tranasctionController.getWalletTransactionById.bind(tranasctionController)
);

transctionRouter.post(
  "/create-exchange",
  verifyToken,
  routerValidator.body(createExchangeValidation),
  tranasctionController.createExchange.bind(tranasctionController)
);

transctionRouter.get(
  "/close-order",
  verifyToken,
  routerValidator.body(addAndCloseOrderValidation),
  tranasctionController.addAndCloseOrder.bind(tranasctionController)
);

export default transctionRouter;
