import { Conditions } from "../database/models/Conditions";
import { UserMeasurements } from "../database/models/UserMeasurements";
import { UserMeasurement } from "../models/UserMeasurement";
import { sequelizeConnection } from "../database/sequelizeConnection";
import { QueryTypes, where } from "sequelize";
import moment from "moment";
import { UserMeasurementRequest } from "../models/UserMeasurementRequest";

export const getAllConditions = async () => {
  let response;
  await Conditions.findAll().then((result) => {
    response = result;
  });

  return response;
};

export const saveUserConditionRecord = async (
  userMeasurement: UserMeasurementRequest
) => {

  let response;
  
  const {conditions} = userMeasurement;
  delete userMeasurement.conditions;

  const payload = conditions.map((conditionId) => {
    return {
      ...userMeasurement,
      condition_id: conditionId
    }
  })

  await UserMeasurements.bulkCreate(payload).then((result) => {
    response = result;
  });

  return response;
};

export const markUserMeasurementDeleted = async (user_id, condition_id, recorded_at) => {
  let returnValue;

  await UserMeasurements.update(
    { is_deleted: true },
    { where: { user_id, condition_id, recorded_at } }
  ).then((response) => {
    returnValue = response;
  });

  return returnValue;
};

export const updateUserMeasurement = async (
  userMeasurement: UserMeasurement
) => {
  let returnValue;

  const {condition_id, recorded_at, user_id} = userMeasurement;

  await UserMeasurements.update(userMeasurement, {where: {condition_id, recorded_at, user_id}, returning: true}).then(
    (response) => {
      returnValue = response;
    }
  );

  return returnValue;
};

export const getUserWeeklyMeasurements = async (userId, conditionId) => {
  const sevenDaysAgo = moment().subtract(7, "days").toDate();
  let query;
  let replacements = { userId, sevenDaysAgo };
  let userMeasurements: any;

  if (conditionId) {
    query = `SELECT um.*, conditions.name as condition_name, measurements.measurement 
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
      INNER JOIN measurements ON measurements.id = um.measurement_id 
      WHERE um.user_id = :userId AND um.condition_id = :conditionId AND um.is_deleted = false AND um.recorded_at > :sevenDaysAgo
      ORDER BY um ASC`;

    replacements["conditionId"] = conditionId;
  } else {
        query = `SELECT um.*, conditions.name as condition_name, measurements.measurement 
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
      INNER JOIN measurements ON measurements.id = um.measurement_id 
      WHERE um.user_id = :userId AND um.is_deleted = false AND um.recorded_at > :sevenDaysAgo
      ORDER BY um ASC`;
  }

  await sequelizeConnection
    .query(query, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      userMeasurements = result;
    })
    .catch((err) => {
      console.log(err);

      return Error("Something went wrong");
    });

   return returnUserMeasurementByConditionAndMeasurement(userMeasurements);
};

// testing native PG functions to structure a return without mapping over the dating
export const testQueryToJson = async () => {
  let response;

  let query = `
  SELECT
    um.*
    json_agg(
            json_build_object(
                'measurement_record_id', um.id,
            )
        ) measurements
FROM user_measurements as um 
  INNER JOIN (
    SELECT conditions.name, conditions.id, 
      json_agg(
        json_build_object(
          'condition_name', c.name,
          ) conditionInfo
      ) condition
    ) FROM conditions c ON um.condition_id = c.id
    GROUP BY um.user_id
  `;

  await sequelizeConnection
    .query(query, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      response = result;
    })
    .catch((err) => {
      console.log(err);

      return Error("Something went wrong");
    });

    return response;
}

export const getDailyAndWeeklyUserMeasurementsByCondition = async (userId, conditionId) => {

  return {
    daily: await getDailyUserMeasurementsByCondition(userId, conditionId),
    weekly: await getUserWeeklyMeasurements(userId, conditionId)
  }
} 

export const getDailyUserMeasurementsByCondition = async (userId, conditionId) => {
  let userMeasurements: any;
  let query = ``;
  let today = moment().startOf("day").toDate();
  let replacements = { userId, today };

  if (conditionId) {
    query = `SELECT um.*, conditions.name as condition_name, measurements.measurement 
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
      INNER JOIN measurements ON measurements.id = um.measurement_id 
      WHERE um.user_id = :userId AND um.condition_id = :conditionId AND um.is_deleted = false AND um.recorded_at >= :today
      ORDER BY um ASC`;

    replacements["conditionId"] = conditionId;
  } else {
    query = `SELECT um.*, conditions.name as condition_name, measurements.measurement 
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
      INNER JOIN measurements ON measurements.id = um.measurement_id 
      WHERE um.user_id = :userId AND um.is_deleted = false AND um.recorded_at >= :today
      ORDER BY um ASC`;
  }

  await sequelizeConnection
    .query(query, {
      replacements: replacements,
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      userMeasurements = result;
    })
    .catch((err) => {
      console.log(err);

      return Error("Something went wrong");
    });

  return returnUserMeasurementByConditionAndMeasurement(userMeasurements);
};

const returnUserMeasurementByConditionAndMeasurement = (userMeasurementReconrds: Array<UserMeasurement>) => {
  let conditionsToDates: Object = {};

  userMeasurementReconrds.map((measurementRecord) => {
    if (!conditionsToDates.hasOwnProperty(measurementRecord.condition_name)) {
      // Set condition name to Object if it is missing
      conditionsToDates[measurementRecord.condition_name] = {};
      // Set measurement name within condition
      conditionsToDates[measurementRecord.condition_name][
        measurementRecord.measurement
      ] = [measurementRecord];
    } else if (
      // Check measurement name has been set
      !conditionsToDates[measurementRecord.condition_name].hasOwnProperty(
        measurementRecord.measurement
      )
    ) {
      conditionsToDates[measurementRecord.condition_name][
        measurementRecord.measurement
      ] = [measurementRecord];
    } else {
      conditionsToDates[measurementRecord.condition_name][
        measurementRecord.measurement
      ].push(measurementRecord);
    }
  });

  return conditionsToDates;
}
