import { Migration } from '@mikro-orm/migrations';

export class Migration20211221034158 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book" ("id" serial primary key, "title" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
