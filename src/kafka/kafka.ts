const { Kafka } = require("kafkajs");
import { kafkaAddress } from "../config/config";

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER

const kafka = new Kafka({
  clientId: "test_ids",
  brokers: [kafkaAddress],
});

export default kafka;
