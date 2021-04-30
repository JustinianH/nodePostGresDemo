import express from "express";
import {
  getAllConditions,
  saveUserConditionRecord,
  updateUserMeasurement,
  markUserMeasurementDeleted,
  getUserWeeklyMeasurements,
  getDailyAndWeeklyUserMeasurementsByCondition,
  testQueryToJson,
  saveAggregateUserMeasurements,
} from "../../services/userMeasurements";
import { Measurements } from "../../database/models/Measurements";
import { getToDos, getPostsWithComments } from "../../client/clientDemo";

const router = express.Router();

// Async & Await example; Parallel calls for two different endpoints and aggregate the data

router.get("/measurements", async (req, res, next) => {
  let results = await Measurements.findAll();
  return res.json(results);
});

router.get("/conditions", async (req, res, next) => {
  let results = await getAllConditions();
  return res.json(results);
});

// Route to test getting JSON via a PostGres query without data management
router.get("/user-measurements/test", async (req, res, next) => {
  let results = await testQueryToJson();
  return res.json(results);
});

router.post("/user-measurements", async (req, res, next) => {
  let results = await saveUserConditionRecord(req.body);
  console.log(results);
  return res.json(results);
});

router.post("/user-measurements/aggregate", async (req, res, next) => {
  let response = await saveAggregateUserMeasurements(req.body);
  return res.json(response);
});

router.put("/user-measurements", async (req, res, next) => {
  let results = await updateUserMeasurement(req.body);
  return res.json(results);
});

router.delete("/user-measurements", async (req, res, next) => {
  let results = await markUserMeasurementDeleted(req.query.userId, req.query.conditionId, req.query.createdAt);
  return res.json(results);
});

router.get("/user-measurements", async (req, res, next) => {
  let results = await getDailyAndWeeklyUserMeasurementsByCondition(
    req.query.userId,
    req.query.condition
  );
  return res.json(results);
});

router.get("/user-measurements/weekly", async (req, res, next) => {
  let results = await getUserWeeklyMeasurements(
    req.query.userId,
    req.query.conditionId
  );
  return res.json(results);
});

router.get("/async-demo/todos", async (req, res) => {
  const toDos = await getToDos();
  return res.json(toDos);
});

router.get("/async-demo/posts/comments", async (req, res) => {
  const postsAndComments = await getPostsWithComments();
  return res.json(postsAndComments);
});

module.exports = router;