import { Ctx, Query, Resolver } from 'type-graphql'
import { Book } from '../entities/Book'
import { MyContext } from '../types'

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books(@Ctx() { em }: MyContext): Promise<Book[]> {
    return em.find(Book, {})
  }
}
