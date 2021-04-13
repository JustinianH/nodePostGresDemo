import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";

const Users = sequelizeConnection.define("users", {
  age: {
    type: Sequelize.INTEGER,
    field: "age",
  },
});

export default Users;