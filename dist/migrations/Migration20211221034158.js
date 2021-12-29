"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211221034158 = void 0;
const tslib_1 = require("tslib");
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211221034158 extends migrations_1.Migration {
    up() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.addSql('create table "book" ("id" serial primary key, "title" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
        });
    }
}
exports.Migration20211221034158 = Migration20211221034158;
//# sourceMappingURL=Migration20211221034158.js.map