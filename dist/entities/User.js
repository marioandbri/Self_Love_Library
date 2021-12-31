"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
let User = class User {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.PrimaryKey)(),
    (0, tslib_1.__metadata)("design:type", Number)
], User.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "text", unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, core_1.Property)(),
    (0, tslib_1.__metadata)("design:type", String)
], User.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    (0, tslib_1.__metadata)("design:type", Date)
], User.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    (0, tslib_1.__metadata)("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = (0, tslib_1.__decorate)([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map