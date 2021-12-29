"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_path_1 = (0, tslib_1.__importDefault)(require("node:path"));
const constants_1 = require("./constants");
const Book_1 = require("./entities/Book");
exports.default = {
    migrations: {
        path: node_path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Book_1.Book],
    host: constants_1.__host__,
    user: constants_1.__dbuser__,
    password: constants_1.__dbpass__,
    dbName: 'sl_library',
    type: 'postgresql',
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map