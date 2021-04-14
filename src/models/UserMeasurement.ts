export type UserMeasurement = {
  id?: number;
  user_id: number;
  condition_id: number;
  measurement_id: number;
  measurement_value: string;
  recorded_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  condition_name?: string;
  measurement?: string;
};