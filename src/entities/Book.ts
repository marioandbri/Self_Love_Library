import { Entity, Property, PrimaryKey } from '@mikro-orm/core'

@Entity()
export class Book {
  @PrimaryKey()
  id!: number

  @Property()
  title!: string

  @Property()
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
