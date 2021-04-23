export type UserMeasurementRequest = {
    user_id: number,
    conditions: Array<string>,
    measurement?: string,
    measurement_values: Array<string>,
    measurement_id?: number
}