export type UserMeasurement = {
  id?: number;
  user_id: number;
  condition_id: number;
  measurement_id: number;
  measurement_value: string;
  measurement_type?: string,
  recorded_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  condition_name?: string;
  measurement?: string;
};