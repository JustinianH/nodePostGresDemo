import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";
import { Conditions } from "./Conditions";
import { Measurements } from "./Measurements";
import Users from "./Users";

export const UserMeasurements = sequelizeConnection.define(
  "user_measurements",
  {
    user_id: {
      type: Sequelize.INTEGER,
      field: "user_id", // Will result in an attribute that is firstName when movie facing but first_name in the database
      references: {
        // This is a reference to another model
        model: Users,

        // This is the column name of the referenced model
        key: "id",
      },
    },
    condition_id: {
      type: Sequelize.INTEGER,
      field: "condition_id", // Will result in an attribute that is firstName when movie facing but first_name in the database
      references: {
        // This is a reference to another model
        model: Conditions,

        // This is the column name of the referenced model
        key: "id",
      },
    },
    measurement_id: {
      type: Sequelize.INTEGER,
      field: "measurement_id", // Will result in an attribute that is firstName when movie facing but first_name in the database
      references: {
        // This is a reference to another model
        model: Measurements,

        // This is the column name of the referenced model
        key: "id",
      },
    },
    measurement_value: {
      type: Sequelize.STRING,
      field: "measurement_value", // Will result in an attribute that is firstName when movie facing but first_name in the database
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);