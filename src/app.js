import express from "express";
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.error('Could not connect to MongoDB', err);
// });

export default app;
