import { Client } from "pg";
import User from "../models/User";

const client = new Client({
  user: "user",
  host: "localhost",
  database: "node-db",
  password: "secret",
  port: 5432,
});

try {
  client.connect();
} catch (error) {
  console.error(error);
}

export const getAllUsers = async () => {
  const query = `
    SELECT *
    FROM users
    `;

  let queryResults = await client.query(query);
  return queryResults.rows;
};

export const getUserById = async (userId) => {
  const query = `
    SELECT *
    FROM users WHERE id = ${userId}
    `;

  const result = await client.query(query);
  return result.rows[0];
};

export const createNewUser = async (user: User) => {
  const query = `
    INSERT INTO users(name, age)
    VALUES($1, $2)
    RETURNING *;
    `;

  const values = [user.name, user.age];

  return await client.query(query, values);
};

export const updateExistingUser = async (user: User, userId: Number) => {
  const query = `
  UPDATE users
  SET name = '${user.name}', age= '${user.age}'
  WHERE id = ${userId};
`;

  return await client.query(query);
};

export const deleteUser = async (userId: Number) => {
  const query = `
  DELETE FROM users WHERE id = ${userId}
  RETURNING *;
  `;

  return await client.query(query);
}