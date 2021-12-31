"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211230195143 = void 0;
const tslib_1 = require("tslib");
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211230195143 extends migrations_1.Migration {
    up() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
            this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        });
    }
}
exports.Migration20211230195143 = Migration20211230195143;
//# sourceMappingURL=Migration20211230195143.js.map