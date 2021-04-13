import {kakfaTopic} from '../config/config';

import kafka from './kafka';

const producer = kafka.producer()

const kafkaSendMessagge = async (key: String, message: String) => {
  await producer.connect();

  console.log(producer);

  try {
    const responses = await producer.send({
      topic: kakfaTopic,
      messages: [
        {
          // Name of the published package as key, to make sure that we process events in order
          key: key,

          // The message value is just bytes to Kafka, so we need to serialize our JavaScript
          // object to a JSON string. Other serialization methods like Avro are available.
          value: JSON.stringify({
            "message": message
          }),
        },
      ],
    });

    console.log("Published message", { responses });
  } catch (error) {
    console.error("Error publishing message", error);
  }
}

export default kafkaSendMessagge;