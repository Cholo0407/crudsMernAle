import express from "express";
import registerClientsController from "../controllers/registerClientsController.js"

const router = express.Router()

// /api/registerClients
router.route("/").post(registerClientsController.registerClient)

// /api/registerClients/verifyCodeEmail
router.route("/verifyCodeEmail").post(registerClientsController.verifyCodeEmail)

export default router