import express from "express";
import providersController from "../controllers/providersController.js";
import multer from "multer";

const router = express.Router();

// Configurar multer para guardar imágenes en carpeta "public/"
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(providersController.getProviders)
  .post(upload.single("image"), providersController.insertProviders);

router
  .route("/:id")
  .delete(providersController.deleteProvider);

export default router;
