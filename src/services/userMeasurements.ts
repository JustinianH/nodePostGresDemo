import { Conditions } from "../database/models/Conditions";
import { UserMeasurements } from "../database/models/UserMeasurements";
import { UserMeasurement } from "../models/UserMeasurement";
import { sequelizeConnection } from "../database/sequelizeConnection";
import { QueryTypes, where } from "sequelize";
import moment from "moment";
import { UserMeasurementRequest } from "../models/UserMeasurementRequest";
import {
	getConditionNamesToKeys,
	getMeasurementTypesToKeys,
	getNoteCategoriesToKeys,
	getMeasurementNamesToKeys,
	normalizeString,
	createMeasurement,
} from "../database/helpers/db-helpers";
import { UserNote } from "../models/UserNote";
import { UserNotes } from "../database/models/UserNotes";
import { DailyAndWeeklyUserMeasurements } from "../models/DailyAndWeeklyUserMeasurements";

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
	let response: Array<object> = [];

	const { user_id, conditions, measurement, measurement_values } = userMeasurement;
	delete userMeasurement.conditions;

	const conditionNamesToKeys = await getConditionNamesToKeys();
	const measurementNamesToKeys = await getMeasurementNamesToKeys();

	const measurement_id: number = measurementNamesToKeys[normalizeString(measurement)];
	
	// if(measurement_id === undefined) {throw new Error(`measurement ${measurement} is not valid`)}

	conditions.map(async (conditionName) => {
		const condition_id: number = conditionNamesToKeys[normalizeString(conditionName)];
		// map for each value within condition
		measurement_values.map(async (value) => {

			let payload: any = {
				user_id,
				measurement_value: value,
				measurement_id,
				condition_id, 
			};
	
			await UserMeasurements.bulkCreate(payload).then((result) => {
				response.push(result);
			});
		});
	});

	return response;	
	
};

export const saveAggregateUserMeasurements = async (payload) => {
	const { user_id } = payload;
	delete payload.userId;

	let noteCategoriesToKeys = await getNoteCategoriesToKeys();

	const conditionNamesToKeys = await getConditionNamesToKeys();
	const measurementNamesToKeys = await getMeasurementNamesToKeys();
	const measurementTypesToKeys = await getMeasurementTypesToKeys();

	for (const conditionName in payload) {
		let conditionPayload = payload[conditionName];
		let condition_id = conditionNamesToKeys[normalizeString(conditionName)];

		if (conditionPayload.hasOwnProperty("measurements")) {

			// save measurements

			for (const measurementType in conditionPayload["measurements"]) {
				let conditionMeasurements = conditionPayload["measurements"];

				for (const measurementName in conditionMeasurements[measurementType]) {

					let measurement_id = measurementNamesToKeys[normalizeString(measurementName)];
					
					if(measurement_id === undefined) {measurement_id = await createMeasurement(measurementName, measurementTypesToKeys[measurementType])};

					let measurement_value =
						conditionMeasurements[measurementType][measurementName];

					if (Array.isArray(measurement_value)) {
						measurement_value.map(async (value: string) => {
							let measurementPayload: any = {
								measurement_id,
								measurement_value: value,
								user_id,
								condition_id
							};

							await UserMeasurements.create(measurementPayload);
						});
					} else {
						let measurementPayload: any = {
							measurement_id,
							measurement_value,
							user_id,
							condition_id,
						};

						await UserMeasurements.create(measurementPayload);
					}
				}
			}
		}

		// Save notes

		if (conditionPayload.hasOwnProperty("notes")) {
			conditionPayload.notes.map(async (noteRequest) => {
				let {note, note_category} = noteRequest;

				const note_category_id = noteCategoriesToKeys[normalizeString(note_category)];

				let notePayload = {note, user_id, note_category: note_category_id}

				await createUserNote(notePayload);
			}) 
		}
	}
};

export const markUserMeasurementDeleted = async (
	user_id,
	condition_id,
	created_at
) => {
	let returnValue;

	await UserMeasurements.update(
		{ is_deleted: true },
		{ where: { user_id, condition_id, created_at } }
	).then((response) => {
		returnValue = response;
	});

	return returnValue;
};

export const updateUserMeasurement = async (
	userMeasurement: UserMeasurement
) => {
	let returnValue;

	const { condition_id, created_at, user_id } = userMeasurement;

	await UserMeasurements.update(userMeasurement, {
		where: { condition_id, created_at, user_id },
		returning: true,
	}).then((response) => {
		returnValue = response;
	});

	return returnValue;
};

export const getUserWeeklyMeasurements = async (userId, conditionId) => {
	const sevenDaysAgo = moment().subtract(7, "days").toDate();
	let query;
	let replacements = { userId, sevenDaysAgo };
	let weeklyUserMeasurements: any;

	if (conditionId) {
		query = `SELECT um.id, um.measurement_value, um.created_at, conditions.name as condition_name, measurements.measurement, measurement_types.type as measurement_type
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
	  INNER JOIN measurements ON measurements.id = um.measurement_id 
	  INNER JOIN measurement_types ON measurement_types.id = measurements.measurement_type
      WHERE um.user_id = :userId AND um.condition_id = :conditionId AND um.is_deleted = false AND um.created_at > :sevenDaysAgo
      ORDER BY um ASC`;

		replacements["conditionId"] = conditionId;
	} else {
		query = `SELECT um.id, um.measurement_value, um.created_at, conditions.name as condition_name, measurements.measurement, measurement_types.type as measurement_type
      FROM user_measurements as um
      INNER JOIN conditions ON um.condition_id=conditions.id 
	  INNER JOIN measurements ON measurements.id = um.measurement_id 
	  INNER JOIN measurement_types ON measurement_types.id = measurements.measurement_type
      WHERE um.user_id = :userId AND um.is_deleted = false AND um.created_at > :sevenDaysAgo
      ORDER BY um ASC`;
	}

	await sequelizeConnection
		.query(query, {
			replacements: replacements,
			type: QueryTypes.SELECT,
		})
		.then((result) => {
			weeklyUserMeasurements = result;
		})
		.catch((err) => {
			console.log(err);

			return Error("Something went wrong");
		});

	return weeklyUserMeasurements;
};


export const getDailyAndWeeklyUserMeasurementsByCondition = async (
userId,
conditionName
) => {

	let conditionId = null;
	if(conditionName) {
		const conditionNamesToKey = await getConditionNamesToKeys();
		conditionId = conditionNamesToKey.hasOwnProperty(normalizeString(conditionName)) ? conditionNamesToKey[normalizeString(conditionName)] : null;
	} 

	let dataByDailyAndWeekly: DailyAndWeeklyUserMeasurements = {
		daily: await getDailyUserMeasurementsByCondition(userId, conditionId),
		weekly: await getUserWeeklyMeasurements(userId, conditionId),
	};

	return returnUserMeasurementByConditionAndMeasurement(dataByDailyAndWeekly);
};

export const getDailyUserMeasurementsByCondition = async (
	userId,
	conditionId
) => {
	let dailyUserMeasurements: any;
	let query = ``;
	let today = moment().startOf("day").toDate();
	let replacements = { userId, today };

	if (conditionId) {
		query = `SELECT um.id, um.measurement_value, um.created_at, conditions.name as condition_name, measurements.measurement, measurement_types.type as measurement_type 
			FROM user_measurements as um
			INNER JOIN conditions ON um.condition_id=conditions.id 
			INNER JOIN measurements ON measurements.id = um.measurement_id 
			INNER JOIN measurement_types ON measurement_types.id = measurements.measurement_type
			WHERE um.user_id = :userId AND um.condition_id = :conditionId AND um.is_deleted = false AND um.created_at >= :today
			ORDER BY um ASC`;

		replacements["conditionId"] = conditionId;
	} else {
		query = `SELECT um.id, um.measurement_value, um.created_at, conditions.name as condition_name, measurements.measurement, measurement_types.type as measurement_type 
			FROM user_measurements as um
			INNER JOIN conditions ON um.condition_id=conditions.id 
			INNER JOIN measurements ON measurements.id = um.measurement_id 
			INNER JOIN measurement_types ON measurement_types.id = measurements.measurement_type
			WHERE um.user_id = :userId AND um.is_deleted = false AND um.created_at >= :today
			ORDER BY um ASC`;
	}

	await sequelizeConnection
		.query(query, {
			replacements: replacements,
			type: QueryTypes.SELECT,
		})
		.then((result) => {
			dailyUserMeasurements = result;
		})
		.catch((err) => {
			console.log(err);

			return Error("Something went wrong");
		});

	return dailyUserMeasurements;
};

export const createUserNote = async (notePayload: UserNote) => {
	let response = {};

	await UserNotes.create(notePayload).then((result) => {
		response = result;
	});

	return response;
};

const returnUserMeasurementByConditionAndMeasurement = (dailyAndWeeklyUserMeasurements: DailyAndWeeklyUserMeasurements) => {
	let conditionsToDates: Object = {};

	for (const dailyOrWeekly in dailyAndWeeklyUserMeasurements) {
		const userMeasurementRecords = dailyAndWeeklyUserMeasurements[dailyOrWeekly];
		conditionsToDates[dailyOrWeekly] = {};
		let target = conditionsToDates[dailyOrWeekly];
	
		userMeasurementRecords.map((record) => {
			if (!target.hasOwnProperty(record.condition_name)) {
				// Set condition name to Object if it is missing
				target[record.condition_name] = {};
				// Set measurement name within condition
				target[record.condition_name][record.measurement_type] = {};
				// Set initial record for nested structure
				target[record.condition_name][record.measurement_type][record.measurement] = [record];
				
			} 
			// The following checks each level of the structure for key being set and adds next level when needed
			else if (!target[record.condition_name].hasOwnProperty(record.measurement_type)
			) {
				target[record.condition_name][record.measurement_type] = {};
	
				target[record.condition_name][record.measurement_type][record.measurement] == null ? target[record.condition_name][record.measurement_type][record.measurement] = [record] : "";
	
			} else if (!target[record.condition_name][record.measurement_type].hasOwnProperty(record.measurement)) {
				
				target[record.condition_name][record.measurement_type][record.measurement] == null ? target[record.condition_name][record.measurement_type][record.measurement] = [record] : "";
	
			} else {
				
				target[record.condition_name][record.measurement_type][record.measurement].push(record);
			}
		});
	}

	return conditionsToDates;
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
};