import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import walletRouter from "./routes/walletRoute.js";
import transctionRouter from "./routes/transactionRoute.js";
import ratingRouter from "./routes/ratingRoute.js";
import cors from "cors";
// import pino from "pino";
// import pinoHttp from "pino-http";

dotenv.config();
const app = express();

// const logger = pino({});

app.use(cors({ origin: process.env.FE_ORIGIN }));
// app.use(pinoHttp({ logger }));

app.use(express.json());
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/transaction", transctionRouter);
app.use("/api/v1/rating", ratingRouter);

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
