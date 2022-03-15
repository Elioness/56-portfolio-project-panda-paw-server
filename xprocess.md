# Bootstraping my Backend server

- Step #1 Terminal
  $ npm init -y
  $ git init
  $ touch .gitignore
- Step #2 Create Github repo
  Step #3 Ignore node_modules
  -> put inside the gitignore file and write: /node_modules
  -> any filename or folder add " / "
  Step #4 Install packages
  $ npm i sequelize sequelize-cli pg express cors
- Step #5 Initialise sequelize project
  $ npx sequelize-cli init
  $ git add .
  $ git commit -m 'Initial commit, sequelize init'
  $ git push
- Step #6 Create New cloud Database / ElephantsSQL instance
- Step #7 Connect Postico and cloud DB
- Step #8 Change configure settings in config/config.json
  "url": "postgres://xznzlexj:vdRyVuqju_bd2gxIYhw9c7uly71NYPhJ@abul.db.elephantsql.com/xznzlexj",
  "dialect": "postgres"
- Step #9 Line 15 in models/index.js
  sequelize = new Sequelize(config.url, config);
- Step #10 Create the models, migration, and seeders
  Models:
  $ npx sequelize-cli model:generate --name user --attributes email:string,phone:integer
- Step #11 Create seeds and fill in info
  $ $ npx sequelize-cli seed:generate --name some-users

# Creating Relationships

- Step #1 Setup Relations
  $ npx sequelize-cli migration:generate --name set-up-relations
  Step #2 Fill in the necessary details
  ex:

"use strict";

module.exports = {
async up(queryInterface, Sequelize) {
await queryInterface.addColumn("todoLists", "userId", {
type: Sequelize.INTEGER,
references: {
model: "users",
key: "id",
},
onUpdate: "CASCADE",
onDelete: "SET NULL",
});
},

async down(queryInterface, Sequelize) {
await queryInterface.removeColumn("todoLists", "userId");
},
};

- Step #3 In the seeders, add the new foreignKey and input its value

  $
  Step #4 In the models/fileName.js Add the relationshps: belongsTo & hasMany  
  ex: belongsTo
  ex. hasMany

- Step #5 Re-do the Migrations
  $ npx sequelize-cli db:migrate:undo:all

- In queries, if the FK is not specified in querying and you have not used the suggested naming ex. userId, it will respond with an error saying: (suggested FK) does not exist

Endpoints / Routes / Index.js
(remember that the queries is to just check these endpoints.)

- create the get route structure
- for get one user by id
  #1 get Id from params
  #2 find the user by Id
  #3 send the user Back

  Concepts:
  Migrations - creates tables, it is also used to create the changes to the tables.

  PrimaryKey (Pk) - key specific to one table

  Foreign Key - Pk transfered to another table to validate
  ownership from the table it was coming from.

  # Backend in a Nutshell

  1. Install packages and github
  2. Create models, seeds, and migrations
  3. Have the relationships
  4. Do all queries then put them inside the server requests
  5. Do the routings to make it clean
  6. Add necessary middlewares if needed
