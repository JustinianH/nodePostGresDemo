import redis from "redis";
import { promisify } from "util";
import { getConditionNamesToKeys, getMeasurementTypesToKeys, getNoteCategoriesToKeys, getMeasurementNamesToKeys } from "../database/helpers/db-helpers";
import { MeasurementsReferenceMap } from "../models/MeasurementsReferenceMap";

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

export const createOrUpdateRedisKey = async (key, payload) => {
    client.set
    await setAsync(key, payload);
}

export const readRedisKey = async (keyName) => {    
    let result = await getAsync(keyName);;
    return result;
}

export const syncReferenceTablesToRedis = async () => {

    const conditionNamesToKeys = await getConditionNamesToKeys();
    const measurementTypesToKeys = await getMeasurementTypesToKeys();
    const noteCategoriesToKeys = await getNoteCategoriesToKeys();
    const measurementNamesToKeys = await getMeasurementNamesToKeys();

    await createOrUpdateRedisKey("conditionNamesToKeys", JSON.stringify(conditionNamesToKeys));
    await createOrUpdateRedisKey("measurementTypesToKeys", JSON.stringify(measurementTypesToKeys));
    await createOrUpdateRedisKey("noteCategoriesToKeys", JSON.stringify(noteCategoriesToKeys));
    await createOrUpdateRedisKey("measurementNamesToKeys", JSON.stringify(measurementNamesToKeys));
} 

export const getMeasurementsReferenceMap = async (): Promise<MeasurementsReferenceMap> => {
	return {
		conditionNamesToKeys: await readRedisKey("conditionNamesToKeys").then(result => JSON.parse(result)),
		measurementTypesToKeys: await readRedisKey("measurementTypesToKeys").then(result => JSON.parse(result)),
		noteCategoriesToKeys: await readRedisKey("noteCategoriesToKeys").then(result => JSON.parse(result)),
		measurementNamesToKeys: await readRedisKey("measurementNamesToKeys").then(result => JSON.parse(result))
	};
};

export const refreshAndGetReferenceMap = async (): Promise<MeasurementsReferenceMap> => {
    await syncReferenceTablesToRedis();

    return await getMeasurementsReferenceMap();
}

client.on('error', err => {
    console.log('Error ' + err);
});