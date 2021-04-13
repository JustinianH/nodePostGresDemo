import { sequelizeConnection } from "./sequelizeConnection";
import * as Sequelize from "sequelize";

export const Movies = sequelizeConnection.define(
  "movies",
  {
    title: {
      type: Sequelize.STRING,
      field: "title", // Will result in an attribute that is firstName when movie facing but first_name in the database
    },
    director: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);

  // Movies.sync({ force: true }).then(function () {
  //   // Table created
  //   return Movies.create({
  //     title: "Alien",
  //     director: "Ridley Scott",
  //   });
  // });