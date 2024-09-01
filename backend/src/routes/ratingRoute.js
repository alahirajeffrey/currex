import express from "express";
import Rating from "../models/Rating.js";
import RatingRepository from "../repositories/ratingRepository.js";
import RatingService from "../services/ratingService.js";
import RatingController from "../controllers/ratingController.js";
import verifyToken from "../utils/decodeToken.js";
import {
  routerValidator,
  addRatingValidation,
  getSingleRatingValidation,
  getPfiRatingValidation,
} from "../utils/validations.js";

const ratingRepository = new RatingRepository(Rating);
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingController(ratingService);

const ratingRouter = express.Router();

ratingRouter.post(
  "/",
  verifyToken,
  routerValidator.body(addRatingValidation),
  ratingController.addRating.bind(ratingController)
);

ratingRouter.get(
  "/:ratingId",
  routerValidator.params(getSingleRatingValidation),
  ratingController.getSingleRatingAndComments.bind(ratingController)
);

ratingRouter.get(
  "/",
  ratingController.getAllRatingAndComments.bind(ratingController)
);

ratingRouter.get(
  "/pfi/:pfiDid",
  routerValidator.params(getPfiRatingValidation),
  ratingController.getPfiRating.bind(ratingController)
);

export default ratingRouter;
