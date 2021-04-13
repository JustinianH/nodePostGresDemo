import { Conditions } from "../database/models/Conditions";
import { UserMeasurements } from "../database/models/UserMeasurements";
import { UserMeasurement } from "../models/UserMeasurement";
import { sequelizeConnection } from "../database/sequelizeConnection";
import { QueryTypes } from "sequelize";

export const getAllConditions = async () => {
  let response;
  await Conditions.findAll().then((result) => {
    response = result;
  });

  return response;
};

export const saveUserConditionRecord = async (
  userMeasurement: UserMeasurement
) => {
  let response;

  await UserMeasurements.create(userMeasurement).then((result) => {
    response = result;
  });

  return response;
};

export const getUsersByCondition = async(userId, conditionId) => {

  let response: any;
  let conditionsToDates: Object = {};
  let query = ``;
  let replacements = { userId: userId };

  if (conditionId) {
    query = `SELECT um.*, conditions.name as condition_name, measurements.measurement 
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
      INNER JOIN measurements ON measurements.id = um.measurement_id 
      WHERE um.user_id = :userId AND um.condition_id = :conditionId 
      ORDER BY um ASC`;

    replacements["conditionId"] = conditionId;
  } else {
    query = `SELECT um.*, conditions.name as condition_name, measurements.measurement 
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
      INNER JOIN measurements ON measurements.id = um.measurement_id 
      WHERE um.user_id = :userId 
      ORDER BY um ASC`
  }

  await sequelizeConnection
    .query(query, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      response = result;
    })
    .catch((err) => {
      console.log(err);

      response = Error("Something went wrong");
    });

  response.map((measurementRecord) => {
    if (conditionsToDates.hasOwnProperty(measurementRecord.condition_name)) {
      conditionsToDates[measurementRecord.condition_name][
        measurementRecord.createdAt
      ] = measurementRecord;
    } else {
      conditionsToDates[measurementRecord.condition_name] = {
        [measurementRecord.createdAt]: measurementRecord,
      };
    }
  });

  return conditionsToDates;

}
