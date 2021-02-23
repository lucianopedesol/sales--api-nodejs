"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("reflect-metadata");
const app = express_1.default();
//support application/x-www-form-urlencoded post data
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Call midlewares
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
// Mount the UserRouters
app.use(index_1.default);
// The port the express app will listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
