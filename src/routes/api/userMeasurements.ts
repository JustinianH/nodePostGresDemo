import express from "express";
import { getAllConditions, saveUserConditionRecord, getUsersByCondition } from "../../services/userMeasurements";

const router = express.Router();

router.get("/conditions", async (req, res, next) => {
  let results = await getAllConditions();
  return res.json(results);
});

router.post("/user-measurements", async (req, res, next) => {
  let results = await saveUserConditionRecord(req.body);
  return res.json(results);
});

router.get("/conditions/user", async (req, res, next) => {
  let results = await getUsersByCondition(req.query.userId, req.query.conditionId);
  return res.json(results);
});


module.exports = router;