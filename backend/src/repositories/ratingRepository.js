import Rating from "../models/Rating.js";

class RatingRepository {
  constructor(Rating) {
    this.ratingModel = Rating;
  }

  async getAllRatingAndComments() {
    try {
      return await this.ratingModel.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSingleRatingAndComments(ratingId) {
    try {
      return await this.ratingModel.findById(ratingId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPfiRating(pfiDid) {
    try {
      const rating = await this.ratingModel.find({ pfiDid });

      if (!rating) throw new Error("rating does not exist for the pfi");
      return rating;
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  }
}

export default RatingRepository;
