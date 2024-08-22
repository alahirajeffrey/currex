import Rating from "../models/Rating.js";
import RatingRepository from "../repositories/ratingRepository.js";
import RatingService from "../services/ratingService.js";

export default class RatingController {
  ratingRepository = new RatingRepository(Rating);
  ratingService = new RatingService(this.ratingRepository);

  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  // add rating to pfi
  async addRating(req, res) {
    try {
      const { walletId, rating, comment, pfi } = req.body;
      if (!walletId && !rating && !pfi)
        throw new Error("walletId, raing and pfi required ");

      const newRating = await this.ratingService.addRating(
        pfi,
        walletId,
        Number(rating),
        comment
      );

      return res.status(201).json({ data: newRating });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  // get single rating and comment
  async getSingleRatingAndComments(req, res) {
    try {
      if (!req.params.ratingId) throw Error("rating id is required");

      const rating = await this.ratingService.getSingleRatingAndComments(
        req.params.ratingId
      );

      return res.status(200).json({ data: rating });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }

  // get all rating and comment
  async getAllRatingAndComments(req, res) {
    try {
      const ratings = await this.ratingService.getAllRatingAndComments();

      return res.status(200).json({ message: ratings });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
