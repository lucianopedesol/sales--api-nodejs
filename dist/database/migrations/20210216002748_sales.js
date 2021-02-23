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
        return knex.schema.createTable('sales', (table) => {
            table.increments('id').primary();
            table.decimal('value', 18, 2).notNullable();
            table.integer('payment_category_id');
            table.foreign('payment_category_id')
                .references('id')
                .inTable('payment_category');
            table.integer('user_id');
            table.foreign('user_id')
                .references('id')
                .inTable('users');
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
        return knex.schema.dropTable('sales');
    });
}
exports.down = down;
