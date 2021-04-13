import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";

export const Measurements = sequelizeConnection.define(
  "measurements",
  {
    measurement: {
      type: Sequelize.STRING,
      field: "measurement", // Will result in an attribute that is firstName when movie facing but first_name in the database
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);