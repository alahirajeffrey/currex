import RatingRepository from "../repositories/ratingRepository.js";
import Rating from "../models/Rating.js";

export default class RatingService {
  ratingRepository = new RatingRepository(Rating);

  constructor(ratingRepository) {
    this.ratingRepository = ratingRepository;
  }

  /**
   * add rating to a pfi
   * @param {*String} pfi : name of pfi
   * @param {*String} walletId : id of wallet
   * @param {*Number} rating : rating from user
   * @param {*String} comment : comment from user
   * @returns : rating obkect
   */
  async addRating(pfi, walletId, rating, comment) {
    if (Number(rating) > 5) throw new Error("rating cannot be greater than 5");
    if (Number(rating) < 1) throw new Error("rating cannot be less than 1");

    return await this.ratingRepository.addRating(
      pfi,
      walletId,
      rating,
      comment
    );
  }

  /**
   * get single rating
   * @param {*String} id : id of rating object
   * @returns : rating object
   */
  async getSingleRatingAndComments(id) {
    const ratingExists = await this.ratingRepository.getSingleRatingAndComments(
      id
    );
    console.log(ratingExists);
    if (!ratingExists) throw new Error("rating does not exist");
    return ratingExists;
  }

  /**
   * get all rating associated with a pfi
   * @returns : list of ratings
   */
  async getAllRatingAndComments() {
    return await this.ratingRepository.getAllRatingAndComments();
  }
}
