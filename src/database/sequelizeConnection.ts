import { Sequelize } from "sequelize";

export const sequelizeConnection = new Sequelize("node-db", "user", "secret", {
  host: "localhost",
  dialect: "postgres",
  define: {
    underscored: true  
  }
});
