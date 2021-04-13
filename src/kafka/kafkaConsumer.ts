import kafka from './kafka';
import { kafkaConsumerTopic } from "../config/config";

export const executeConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "test",
  });

  const main = async () => {
    await consumer.connect();

    await consumer.subscribe({
      topic: kafkaConsumerTopic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Received message", {
          topic,
          partition,
          key: message.key.toString(),
          value: message.value.toString(),
        });
      },
    });
  };

  main().catch(async (error) => {
    console.error(error);
    try {
      await consumer.disconnect();
    } catch (e) {
      console.error("Failed to gracefully disconnect consumer", e);
    }
    process.exit(1);
  });
};
