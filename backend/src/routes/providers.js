import express from "express";
import providersController from "../controllers/providersController.js"
import multer from "multer"
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

//configurar una carpeta local que guarde 
//el registro de las imagenes subidas
const upload = multer({dest: "public/"})

router
  .route("/")
  .get(providersController.getProviders)
  .post(upload.single("image"), providersController.insertProviders);

export default router;