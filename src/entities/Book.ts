import { Entity, Property, PrimaryKey } from '@mikro-orm/core'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Book {
  @Field(() => Int)
  @PrimaryKey()
  id!: number

  @Field(() => String)
  @Property()
  title!: string

  @Field(() => String)
  @Property()
  createdAt: Date = new Date()

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
