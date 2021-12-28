import dotenv from 'dotenv'
import { MikroORM } from '@mikro-orm/core'
import mikroOrmConfig from './mikro-orm.config'
dotenv.config()
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { BookResolver } from './resolvers/book'

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig)
  await orm.getMigrator().up()
  //   const book = orm.em.create(Book, { title: 'My first book' })
  //   await orm.em.persistAndFlush(book)
  //   const books = await orm.em.find(Book, {})
  //   console.table(books)
  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, BookResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, em: orm.em }),
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.listen(4040, () => {
    console.log('server on http://localhost:4040/graphql')
  })
}

main()

console.log(process.env.NODE_ENV)
