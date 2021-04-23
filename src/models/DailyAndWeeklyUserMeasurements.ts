import { UserMeasurement } from "./UserMeasurement";

export type DailyAndWeeklyUserMeasurements = {
	daily: Array<UserMeasurement>;
	weekly: Array<UserMeasurement>;
};
