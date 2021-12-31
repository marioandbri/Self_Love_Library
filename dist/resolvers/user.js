"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const argon2_1 = (0, tslib_1.__importDefault)(require("argon2"));
let UsernamePasswordInput = class UsernamePasswordInput {
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UsernamePasswordInput.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
UsernamePasswordInput = (0, tslib_1.__decorate)([
    (0, type_graphql_1.InputType)()
], UsernamePasswordInput);
let FieldError = class FieldError {
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], FieldError.prototype, "field", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(),
    (0, tslib_1.__metadata)("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = (0, tslib_1.__decorate)([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], UserResponse.prototype, "errors", void 0);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = (0, tslib_1.__decorate)([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    me({ em, req }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                return null;
            }
            else {
                const user = yield em.findOne(User_1.User, { id: req.session.userId });
                return user;
            }
        });
    }
    registerUser(options, { em }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (options.username.length <= 2) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "The username needs to be at least 3 chars long",
                        },
                    ],
                };
            }
            if (options.password.length <= 5) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "The password needs to be at least 6 chars long",
                        },
                    ],
                };
            }
            const hashedPass = yield argon2_1.default.hash(options.password);
            const user = em.create(User_1.User, {
                username: options.username.toLowerCase(),
                password: hashedPass,
            });
            try {
                yield em.persistAndFlush(user);
            }
            catch (error) {
                if (error.code === "23505") {
                    return {
                        errors: [
                            {
                                field: "username",
                                message: "The user already exist",
                            },
                        ],
                    };
                }
            }
            return {
                user,
            };
        });
    }
    loginUser(options, { em, req }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.User, { username: options.username });
            if (!!user) {
                const verifyPass = yield argon2_1.default.verify(user.password, options.password);
                if (!!verifyPass) {
                    req.session.userId = user.id;
                    return {
                        user: user,
                    };
                }
                else {
                    return {
                        errors: [
                            {
                                field: "password",
                                message: "That's not the password we expected",
                            },
                        ],
                    };
                }
            }
            else {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "We couldn't find that username",
                        },
                    ],
                };
            }
        });
    }
    updateUser(id, username, { em }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield em.findOne(User_1.User, { id });
            if (!user) {
                return null;
            }
            if (typeof username !== "undefined") {
                user.username = username;
                yield em.persistAndFlush(user);
            }
            return user;
        });
    }
    deleteUser(id, { em }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                yield em.nativeDelete(User_1.User, { id });
            }
            catch (_a) {
                return false;
            }
            return true;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "me", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)("options")),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [UsernamePasswordInput, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)("options")),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [UsernamePasswordInput, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: true }),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)("id")),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Arg)("title", () => String, { nullable: true })),
    (0, tslib_1.__param)(2, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)("id")),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = (0, tslib_1.__decorate)([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map