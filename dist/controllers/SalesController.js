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
class SalesController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield connection_1.default.select('id', 'value', 'payment_category_id', 'user_id', 'active').from('sales').where({ active: true });
                // const salesList = new Array;
                // sales.forEach(async (sale: Sales) => {
                // })
                console.log(sales);
                return response.status(201).json(sales);
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while selected Sales'
                });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value, payment_category_id, user_id } = request.body;
            if (!value || value === "")
                return response.status(400).json({
                    error: 'Insira um valor'
                });
            if (!payment_category_id || payment_category_id === "")
                return response.status(400).json({
                    error: 'Insira uma categoria de pagamento'
                });
            try {
                yield connection_1.default('sales').insert({
                    value, payment_category_id, user_id
                });
                return response.status(201).send();
            }
            catch (error) {
                console.log(error);
                return response.status(400).json({
                    error: 'Unexpected error while creating new Sales'
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
                const sale = yield connection_1.default.select('id', 'value', 'payment_category_id', 'user_id', 'active').from('sales').where({ id }).first();
                const paymentCategory = yield connection_1.default.select('id', 'description').from('payment_category').where({ id: sale.payment_category_id }).first();
                const user = yield connection_1.default.select('id', 'name').from('users').where({ id: sale.user_id }).first();
                const salesDto = {
                    id: sale.id,
                    value: sale.value,
                    paymentCategory,
                    user,
                    active: sale.active
                };
                return response.status(201).json(salesDto);
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while selected Sales'
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
                yield connection_1.default('sales').where('id', '=', id).update({
                    active: false,
                });
                return response.status(201).json("OK");
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while delete Sales'
                });
            }
        });
    }
}
exports.default = new SalesController();
