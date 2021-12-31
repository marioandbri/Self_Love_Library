"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = (0, tslib_1.__importDefault)(require("./mikro-orm.config"));
dotenv_1.default.config();
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const book_1 = require("./resolvers/book");
const user_1 = require("./resolvers/user");
const redis_1 = require("redis");
const express_session_1 = (0, tslib_1.__importDefault)(require("express-session"));
const connect_redis_1 = (0, tslib_1.__importDefault)(require("connect-redis"));
const constants_1 = require("./constants");
const main = () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = (0, redis_1.createClient)({ legacyMode: true });
    yield redisClient.connect();
    app.use((0, express_session_1.default)({
        name: "Chips",
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        secret: "session-secret",
        resave: false,
        cookie: {
            httpOnly: true,
            secure: constants_1.__prod__,
            maxAge: 86400,
            sameSite: "lax",
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, book_1.BookResolver, user_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, em: orm.em }),
        plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen(4040, () => {
        console.log("server on http://localhost:4040/graphql");
    });
});
main();
console.log(process.env.NODE_ENV);
//# sourceMappingURL=index.js.map