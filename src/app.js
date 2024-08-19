import express from "express";
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

export default app;
