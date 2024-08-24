import express from "express";
import WalletController from "../controllers/walletController.js";
import WalletService from "../services/walletService.js";
import WalletRepository from "../repositories/walletRepository.js";
import Wallet from "../models/Wallet.js";

const walletRepository = new WalletRepository(Wallet);
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);

const walletRouter = express.Router();

walletRouter.post(
  "/create",
  walletController.createWallet.bind(walletController)
);

// include validation
walletRouter.post(
  "/verify",
  walletController.verifyWallet.bind(walletController)
);

walletRouter.post(
  "/credentials",
  walletController.createVerifiableCredetial.bind(walletController)
);

export default walletRouter;
