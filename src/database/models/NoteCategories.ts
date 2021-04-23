import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";

export const NoteCategories = sequelizeConnection.define(
  "note_categories",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: Sequelize.STRING,
      field: "category", // Will result in an attribute that is firstName when movie facing but first_name in the database
    }
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);