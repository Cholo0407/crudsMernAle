import express from "express";
import RegisterEmployeeController from "../controllers/registerEmployeeController.js";

const router = express.Router();

router.route("/").post(RegisterEmployeeController.register)

export default router