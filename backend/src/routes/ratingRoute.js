import express from "express";
import Rating from "../models/Rating.js";
import RatingRepository from "../repositories/ratingRepository.js";
import RatingService from "../services/ratingService.js";
import RatingController from "../controllers/ratingController.js";

const ratingRepository = new RatingRepository(Rating);
const ratingService = new RatingService(ratingRepository);
const ratingController = new RatingController(ratingService);

const ratingRouter = express.Router();

ratingRouter.post("/", ratingController.addRating.bind(ratingController));

ratingRouter.get(
  "/:ratingId",
  ratingController.getSingleRatingAndComments.bind(ratingController)
);

ratingRouter.get(
  "/",
  ratingController.getAllRatingAndComments.bind(ratingController)
);

export default ratingRouter;
