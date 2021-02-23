"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const checkJwt_1 = require("../middlewares/checkJwt");
const checkRole_1 = require("../middlewares/checkRole");
const router = express_1.Router();
//Get all users
router.get("/", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.index);
// Get one user
router.get("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.show);
//Create a new user
router.post("/", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.create);
//Edit one user
router.patch("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.update);
//Delete one user
router.delete("/:id([0-9]+)", [checkJwt_1.checkJwt, checkRole_1.checkRole(["ADMIN"])], UserController_1.default.delete);
exports.default = router;
