import express from "express";
import WalletController from "../controllers/walletController.js";
import WalletService from "../services/walletService.js";
import WalletRepository from "../repositories/walletRepository.js";
import Wallet from "../models/Wallet.js";
import verifyToken from "../utils/decodeToken.js";

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
  "/login",
  walletController.loginToWallet.bind(walletController)
);

walletRouter.post(
  "/credentials",
  verifyToken,
  walletController.createVerifiableCredetial.bind(walletController)
);

walletRouter.get(
  "/balance",
  verifyToken,
  walletController.getWalletBalaceById.bind(walletController)
);

export default walletRouter;
