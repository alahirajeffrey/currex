import express from "express";
import WalletController from "../controllers/walletController.js";
import WalletService from "../services/walletService.js";

const walletService = new WalletService();
const walletController = new WalletController(walletService);

const walletRouter = express.Router();

walletRouter.post(
  "/create",
  walletController.createWallet.bind(walletController)
);

export default walletRouter;
