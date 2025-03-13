import express from "express";
import clientsController from "../controllers/clientsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(clientsController.getClients)
  .post(clientsController.createclients);

router
  .route("/:id")
  .put(clientsController.updateclients)
  .delete(clientsController.deleteclients);

export default router;
