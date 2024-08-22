import RatingRepository from "../repositories/ratingRepository.js";
import Rating from "../models/Rating.js";
import allowedPfis from "../../../allowedPfis.json" assert { type: "json" };

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
   * @param {*String} pfiDid : did of the pfi
   * @returns : rating obkect
   */
  async addRating(pfi, walletId, rating, comment, pfiDid) {
    if (Number(rating) > 5) throw new Error("rating cannot be greater than 5");
    if (Number(rating) < 1) throw new Error("rating cannot be less than 1");

    return await this.ratingRepository.addRating(
      pfi,
      walletId,
      rating,
      comment,
      pfiDid
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
  /**
   * get a pfi rating
   * @param {*String} pfiDid: DID of pfi to search
   * @returns pfi information and rating
   */
  async getPfiRating(pfiDid) {
    // loop through given PFIs json file and get PFI details
    const pfiDetails = allowedPfis.find((pfi) => pfi.did === pfiDid);
    const ratings = await this.ratingRepository.getAllPfiRating(pfiDid);

    let totalRating = 0;
    for (const rating of ratings) {
      totalRating += rating.rating;
    }

    const averageRating = totalRating / ratings.length;

    return {
      averageRating: averageRating,
      pfiName: pfiDetails.name,
    };
  }
}
