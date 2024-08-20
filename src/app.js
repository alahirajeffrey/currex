import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import walletRouter from "./routes/walletRoute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1/wallet", walletRouter);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((err) => {
    console.error("could not connect to mongo", err);
  });

export default app;
