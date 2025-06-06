import express from "express";
import faqsController from "../controllers/faqsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(faqsController.getfaqs)
  .post(faqsController.postfaqs);

router
  .route("/:id")
  .put(faqsController.updatefaqs)
  .delete(faqsController.deletefaqs);

export default router;
