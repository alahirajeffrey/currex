import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    pfi: { type: String, required: true },
    walletId: { type: String },
    rating: { type: Number },
    comment: { type: String },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

export default Rating;
