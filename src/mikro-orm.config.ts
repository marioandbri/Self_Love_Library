import { MikroORM } from '@mikro-orm/core'
import path from 'node:path'
import { __dbpass__, __dbuser__, __prod__ } from './constants'
import { Book } from './entities/Book'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Book],
  user: __dbuser__,
  password: __dbpass__,
  dbName: 'sl_library',
  type: 'postgresql',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]
