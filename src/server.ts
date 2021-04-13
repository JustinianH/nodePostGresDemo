// import { executeConsumer } from "./src/kafka/kafkaConsumer";

const port = 3000;

import app from './app';

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  // executeConsumer();
});

