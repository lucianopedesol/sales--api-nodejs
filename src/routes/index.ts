import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import paymentCategory from "./paymentCategory";
import sales from "./sales";
import { checkJwt } from "../middlewares/checkJwt";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", checkJwt, user);
routes.use("/paymentcategory", checkJwt, paymentCategory);
routes.use("/sales", checkJwt, sales);

export default routes;
