import dotenv from "dotenv";
import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
dotenv.config();
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { BookResolver } from "./resolvers/book";
import { MyContext } from "./types";
import { UserResolver } from "./resolvers/user";

import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  //   const book = orm.em.create(Book, { title: 'My first book' })
  //   await orm.em.persistAndFlush(book)
  //   const books = await orm.em.find(Book, {})
  //   console.table(books)
  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });
  await redisClient.connect();

  app.use(
    session({
      name: "Chips",
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: "session-secret",
      resave: false,
      cookie: {
        httpOnly: true,
        secure: __prod__,
        maxAge: 86400,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, BookResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, em: orm.em }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4040, () => {
    console.log("server on http://localhost:4040/graphql");
  });
};

main();

console.log(process.env.NODE_ENV);
