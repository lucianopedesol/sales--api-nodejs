"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const paymentCategory_1 = __importDefault(require("./paymentCategory"));
const sales_1 = __importDefault(require("./sales"));
const checkJwt_1 = require("../middlewares/checkJwt");
const routes = express_1.Router();
routes.use("/auth", auth_1.default);
routes.use("/user", checkJwt_1.checkJwt, user_1.default);
routes.use("/paymentcategory", checkJwt_1.checkJwt, paymentCategory_1.default);
routes.use("/sales", checkJwt_1.checkJwt, sales_1.default);
exports.default = routes;
