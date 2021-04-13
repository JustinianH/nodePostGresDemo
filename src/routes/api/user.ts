var router = require("express").Router();
import { Client } from "pg";

import filterUserByAge from "../../services/userFilterService";
import User from "../../models/User";
import {getAllUsers, getUserById, createNewUser, updateExistingUser, deleteUser} from '../../services/userApiService';

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

router.get("/user/all", async function (req, res, next) {
  const results = await getAllUsers();
  res.json(results);
});

router.get("/user/filter", async function (req, res, next) {
    const results: any = await getAllUsers();
    res.json(filterUserByAge(results, req.query.age));
});

router.get("/user/:userId", async function (req, res, next) {
  const result = await getUserById(req.params.userId);
  res.json(result);
});

router.post("/user", async function (req, res, next) {
  const result = await createNewUser(req.body.user);
  res.json(result);
});

router.put("/user/:userId", async function (req, res, next) {
  const result = await updateExistingUser(req.body.user, req.params.userId);
  res.json(result);
});

router.delete("/user/:userId", async function (req, res, next) {
  const result = await deleteUser(req.params.userId);
  res.json(result);
});

router.get("/user-name", function (req, res, next) {
  console.log('HERE', req.query.name);
  return res.json({
    name: req.query.name,
    message: `Hello, friend, ${req.query.name}`,
  });
});

module.exports = router;
