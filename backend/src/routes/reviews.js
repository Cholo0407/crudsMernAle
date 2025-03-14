import express from "express";
import reviewsController from "../controllers/reviewsController.js"
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(reviewsController.getReview)
  .post(reviewsController.createReview);

router
  .route("/:id")
  .put(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

export default router;
