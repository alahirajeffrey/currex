import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    pfi: { type: String, required: true },
    pfiDid: { type: String, required: true },
    walletId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

export default Rating;
