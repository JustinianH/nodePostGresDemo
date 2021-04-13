// config.js
import dotenv from "dotenv";

dotenv.config();

export const kafkaAddress = process.env.KAFKA_BOOTSTRAP_SERVER;
export const kakfaTopic = process.env.KAKFA_TOPIC;
export const kafkaConsumerTopic = process.env.KAFKA_CONSUMER_TOPIC;
export const nytApi = process.env.NYT_API;
export const nytApiKey = process.env.NYT_API_KEY;
