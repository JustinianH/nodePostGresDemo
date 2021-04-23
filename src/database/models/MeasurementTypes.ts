import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";

export const MeasurementTypes = sequelizeConnection.define(
  "measurement_types",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING,
      field: "type", // Will result in an attribute that is firstName when movie facing but first_name in the database
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);