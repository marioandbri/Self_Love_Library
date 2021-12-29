"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const Book_1 = require("../entities/Book");
let BookResolver = class BookResolver {
    books({ em }) {
        return em.find(Book_1.Book, {});
    }
    book(id, { em }) {
        return em.findOne(Book_1.Book, { id });
    }
    createBook(title, { em }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const book = em.create(Book_1.Book, { title });
            yield em.persistAndFlush(book);
            return book;
        });
    }
    updateBook(id, title, { em }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const book = yield em.findOne(Book_1.Book, { id });
            if (!book) {
                return null;
            }
            if (typeof title !== "undefined") {
                book.title = title;
                yield em.persistAndFlush(book);
            }
            return book;
        });
    }
    deleteBook(id, { em }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                yield em.nativeDelete(Book_1.Book, { id });
            }
            catch (_a) {
                return false;
            }
            return true;
        });
    }
};
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Query)(() => [Book_1.Book]),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookResolver.prototype, "books", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Query)(() => Book_1.Book, { nullable: true }),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)('id')),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookResolver.prototype, "book", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => Book_1.Book),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)('title')),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookResolver.prototype, "createBook", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => Book_1.Book, { nullable: true }),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)('id')),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Arg)('title', () => String, { nullable: true })),
    (0, tslib_1.__param)(2, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookResolver.prototype, "updateBook", null);
(0, tslib_1.__decorate)([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, tslib_1.__param)(0, (0, type_graphql_1.Arg)('id')),
    (0, tslib_1.__param)(1, (0, type_graphql_1.Ctx)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
BookResolver = (0, tslib_1.__decorate)([
    (0, type_graphql_1.Resolver)()
], BookResolver);
exports.BookResolver = BookResolver;
//# sourceMappingURL=book.js.map