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
      const { rating, comment, pfi, pfiDid } = req.body;

      const newRating = await this.ratingService.addRating(
        pfi,
        req.user.walletId,
        Number(rating),
        comment,
        pfiDid
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

  // get rating of a pfi
  async getPfiRating(req, res) {
    try {
      const { averageRating, pfiName } = await this.ratingService.getPfiRating(
        req.params.pfiDid
      );

      // console.l;
      return res
        .status(200)
        .json({ averageRating: averageRating, pfiName: pfiName });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  }
}
