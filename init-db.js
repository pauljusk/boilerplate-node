// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
// import path from "path";

const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");


const appRoot = path.resolve("./");

async function openDb() {
    return open({
        filename: `${appRoot}/database.db`,
        driver: sqlite3.Database,
    });
}

(async function () {
    const db = await openDb();
    console.log("Creating database tables...");

    const sql = `

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" 
("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "username" varchar NOT NULL,
  "firstname" varchar NULL,
  "lastname" varchar NULL, 
  "password" varchar NOT NULL,
  "fk_roleId" integer NOT NULL, 
  "createdAt" TEXT, 
  "updatedAt" TEXT, 
  CONSTRAINT "fk_roleId_role_id" FOREIGN KEY ("fk_roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);


  DROP TABLE IF EXISTS "trip";
  CREATE TABLE "trip" 
  ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  "description" varchar NOT NULL, 
  "startDateTime" TEXT NOT NULL, 
  "endDateTime" TEXT NOT NULL, 
  "fk_userId" integer NOT NULL,
    CONSTRAINT "fk_userId_user_id" FOREIGN KEY ("fk_userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);

    DROP TABLE IF EXISTS "todo";
    CREATE TABLE "todo" 
    ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    "value" varchar NOT NULL, 
    "isDone" integer NOT NULL,
    "fk_userId" integer NOT NULL,
      CONSTRAINT "fk_userId_user_id" FOREIGN KEY ("fk_userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);


DROP TABLE IF EXISTS "role";
CREATE TABLE "role" 
("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
"name" varchar NOT NULL);

INSERT INTO "role" ("name") VALUES
('Regular'),
('Manager'),
('Admin');


INSERT INTO "user" ("username","password","fk_roleId","firstName","lastName") VALUES
('admin','admin',3,'admin','admin'),
('manager','manager',2,'manager','manager'),
('user','user',1,'user','user'),
('testAdmin','testAdmin',3,'testAdmin','testAdmin'),
('testManager','testManager',2,'testManager','testManager'),
('testRegular','testRegular',1,'testRegular','testRegular')

`;
    await db.exec(sql);
})();
