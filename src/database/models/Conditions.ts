import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";

export const Conditions = sequelizeConnection.define(
  "conditions",
  {
    name: {
      type: Sequelize.STRING,
      field: "name", // Will result in an attribute that is firstName when movie facing but first_name in the database
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);