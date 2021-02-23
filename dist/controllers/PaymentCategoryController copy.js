"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class PaymentCategoryController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payment_category = yield connection_1.default.select('id', 'description').from('payment_category').where({ active: true });
                return response.status(201).json(payment_category);
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while selected description'
                });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description } = request.body;
            if (!description || description === "")
                return response.status(400).json({
                    error: 'Insira um nome'
                });
            try {
                yield connection_1.default('payment_category').insert({
                    description
                });
                return response.status(201).send();
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while creating new description'
                });
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            if (!id || id === "")
                return response.status(400).json({
                    error: 'Insira um Id'
                });
            try {
                const user = yield connection_1.default.select('id', 'description').from('payment_category').where({ id, active: true });
                return response.status(201).json(user);
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while selected Users'
                });
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description } = request.body;
            const id = request.params.id;
            if (!id || id === "")
                return response.status(400).json({
                    error: 'Insira um Id'
                });
            try {
                const category = yield connection_1.default.select('description').from('payment_category').where({ id }).first();
                if (!category)
                    return response.status(400).json({
                        error: 'Invalid category'
                    });
                yield connection_1.default('payment_category').where('id', '=', id).update({
                    description,
                });
                return response.status(201).json("OK");
            }
            catch (error) {
                console.log(error);
                return response.status(400).json({
                    error: 'Unexpected error while update User'
                });
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            if (!id || id === "")
                return response.status(400).json({
                    error: 'Insira um Id'
                });
            try {
                yield connection_1.default('payment_category').where('id', '=', id).update({
                    active: false,
                });
                return response.status(201).json("OK");
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while delete User'
                });
            }
        });
    }
}
exports.default = new PaymentCategoryController();
