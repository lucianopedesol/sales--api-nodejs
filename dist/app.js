"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
// support application/json type post data
app.use(body_parser_1.default.json());
//support application/x-www-form-urlencoded post data
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
// Mount the UserRouters
app.use(routes_1.default);
// The port the express app will listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
