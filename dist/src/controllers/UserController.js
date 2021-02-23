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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield connection_1.default.select('id', 'username', 'email', 'role', 'active').from('users');
                return response.status(201).json(users);
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while selected Users'
                });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = request.body;
            const hash = yield bcryptjs_1.default.hash(password, 10);
            if (!username || username === "")
                return response.status(400).json({
                    error: 'Insira um nome'
                });
            if (!email || email === "")
                return response.status(400).json({
                    error: 'Insira um email'
                });
            if (!password || password === "")
                return response.status(400).json({
                    error: 'Insira uma senha'
                });
            if (!role || role === "")
                return response.status(400).json({
                    error: 'Insira um role'
                });
            try {
                yield connection_1.default('users').insert({
                    username,
                    email,
                    password_hash: hash,
                    role
                });
                return response.status(201).send();
            }
            catch (error) {
                return response.status(400).json({
                    error: 'Unexpected error while creating new User'
                });
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            if (!id)
                return response.status(400).json({
                    error: 'Insira um Id'
                });
            try {
                const user = yield connection_1.default.select('id', 'username', 'email', 'role').from('users').where({ id });
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
            const { email, password, newPassoword } = request.body;
            const id = request.params.id;
            if (!id || id === "")
                return response.status(400).json({
                    error: 'Insira um Id'
                });
            try {
                const user = yield connection_1.default.select('password_hash', 'email', 'role').from('users').where({ id }).first();
                if (!user)
                    return response.status(400).json({
                        error: 'Invalid user'
                    });
                const { password_hash } = user;
                if (!(yield bcryptjs_1.default.compare(password, password_hash))) {
                    return response.status(400).json({
                        error: 'Invalid password'
                    });
                }
                if (user.email !== email) {
                    return response.status(400).json({
                        error: 'Invalid email'
                    });
                }
                const hash = yield bcryptjs_1.default.hash(newPassoword, 10);
                yield connection_1.default('users').where('id', '=', id).update({
                    password_hash: hash,
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
                yield connection_1.default('users').where('id', '=', id).update({
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
exports.default = new UserController();
