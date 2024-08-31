import Rating from "../models/Rating.js";
import ApiError from "../utils/errorHandler.js";

class RatingRepository {
  constructor(Rating) {
    this.ratingModel = Rating;
  }

  async getAllRatingAndComments() {
    try {
      return await this.ratingModel.find({});
    } catch (error) {
      throw new ApiError(500, error);
    }
  }

  async getSingleRatingAndComments(ratingId) {
    try {
      const rating = await this.ratingModel.findById(ratingId);
      if (!rating) throw new ApiError(404, "rating does not exist");

      return rating;
    } catch (error) {
      throw new ApiError(500, error);
    }
  }

  async getAllPfiRating(pfiDid) {
    try {
      const rating = await this.ratingModel.find({ pfiDid });

      if (!rating) throw new ApiError(404, "rating does not exist for the pfi");
      return rating;
    } catch (error) {
      throw new ApiError(500, error);
    }
  }

  async addRating(pfi, walletId, rating, comment, pfiDid) {
    try {
      return await this.ratingModel.create({
        pfi,
        walletId,
        rating,
        comment,
        pfiDid,
      });
    } catch (error) {
      throw new ApiError(500, error);
    }
  }
}

export default RatingRepository;
