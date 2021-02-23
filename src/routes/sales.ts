import { Router } from "express";
import salesController from '../controllers/SalesController';
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt], salesController.index);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt],
  salesController.show
);

//Create a new user
router.post("/", [checkJwt], salesController.create);


//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  salesController.delete
);

export default router;
