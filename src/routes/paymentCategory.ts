import { Router } from "express";
import paymentCategoryController from '../controllers/PaymentCategoryController';
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt], paymentCategoryController.index);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt],
  paymentCategoryController.show
);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], paymentCategoryController.create);

//Edit one user
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  paymentCategoryController.update
);

//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  paymentCategoryController.delete
);

export default router;
