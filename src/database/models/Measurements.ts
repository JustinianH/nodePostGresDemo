import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";
import { MeasurementTypes } from "./MeasurementTypes";

export const Measurements = sequelizeConnection.define(
  "measurements",
  {
    measurement: {
      type: Sequelize.STRING,
      field: "measurement", // Will result in an attribute that is firstName when movie facing but first_name in the database
    },
    measurement_type: {
      type: Sequelize.INTEGER,
      field: "measurement_type", // Will result in an attribute that is firstName when movie facing but first_name in the database
      references: {
        // This is a reference to another model
        model: MeasurementTypes,

        // This is the column name of the referenced model
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);