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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name', 150).notNullable();
            table.string('email', 150).unique().notNullable();
            table.string('password_hash', 255).unique().notNullable();
            table.boolean('active').defaultTo(true);
            table.timestamp('created_at')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
                .notNullable();
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('users');
    });
}
exports.down = down;
