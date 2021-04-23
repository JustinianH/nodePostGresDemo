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

const router = express.Router();

router.get("/conditions", async (req, res, next) => {
  let results = await getAllConditions();
  return res.json(results);
});

// Route to test getting JSON via a PostGres query without data management
router.get("/user-measurements/test", async (req, res, next) => {
  let results = await testQueryToJson();
  return res.json(results);
});

/*

  - Will need to update this payload to look closer to the demo in your Mongo project
  - Still don't know if UI will send single record transaction or larger payload that includes multiple measurements tied to different conditions
  - Need to allow UI to reference conditions and measurements by name

*/
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
    req.query.conditionId
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


module.exports = router;