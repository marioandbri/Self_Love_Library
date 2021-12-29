"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
let Book = class Book {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.PrimaryKey)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Book.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    (0, tslib_1.__metadata)("design:type", String)
], Book.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    (0, tslib_1.__metadata)("design:type", Date)
], Book.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    (0, tslib_1.__metadata)("design:type", Date)
], Book.prototype, "updatedAt", void 0);
Book = (0, tslib_1.__decorate)([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Book);
exports.Book = Book;
//# sourceMappingURL=Book.js.map