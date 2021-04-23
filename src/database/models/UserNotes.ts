import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";
import Users from "./Users";
import { NoteCategories } from "./NoteCategories";

export const UserNotes = sequelizeConnection.define(
  "user_notes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    note: {
        type: Sequelize.STRING,
        field: "note",
        allowNull: false
    },
    note_category: {
      type: Sequelize.INTEGER,
      field: "note_category", // Will result in an attribute that is firstName when movie facing but first_name in the database
      references: {
        // This is a reference to another model
        model: NoteCategories,

        // This is the column name of the referenced model
        key: "id",
      },
      allowNull: false
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);
