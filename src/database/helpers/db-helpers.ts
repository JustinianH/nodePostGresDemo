import { sequelizeConnection } from "../sequelizeConnection";
import * as Sequelize from "sequelize";
import { Conditions } from "../models/Conditions";
import { MeasurementTypes } from "../models/MeasurementTypes";
import { NoteCategories } from "../models/NoteCategories";
import { Measurements } from "../models/Measurements";

export const getConditionNamesToKeys = async () => {
	let conditionsNamesToKeys = {};

	await Conditions.findAll().then((result) => {
		result.map((condition) => {
			let conditionName: string = normalizeString(condition["name"]);
			conditionsNamesToKeys[conditionName] = condition["id"];
		});
	});

	return conditionsNamesToKeys;
};

export const getMeasurementTypesToKeys = async () => {
	let measurementTypesToKeys = {};

	await MeasurementTypes.findAll().then((types) => {
		types.map((type) => {
			measurementTypesToKeys[normalizeString(type["type"])] = type["id"];
		});
	});

	return measurementTypesToKeys;
};

export const getNoteCategoriesToKeys = async () => {
	let notCategoriesToKeys = {};

	await NoteCategories.findAll().then((types) => {
		types.map((type) => {
			notCategoriesToKeys[normalizeString(type["category"])] = type["id"];
		});
	});

	return notCategoriesToKeys;
};

export const getMeasurementNamesToKeys = async () => {
	let measurementNamesToKeys = {};

	await Measurements.findAll().then((measurements) => {
		measurements.map((measurment) => {
			measurementNamesToKeys[normalizeString(measurment["measurement"])] =
				measurment["id"];
		});
	});

	return measurementNamesToKeys;
};

export const getMeasurmentKeyByName = (measurementName) => {

}

export const normalizeString = (inputString: string): string => {
	return inputString.toLowerCase().replace(/\s/g, "");
};
