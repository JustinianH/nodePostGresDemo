import express from "express";
import bodyParser from "body-parser";
import router from "./routes/";
import syncDbTables  from "./database/syncDatabaseTables";

const app = express();

app.use(bodyParser.json());
app.use(router);

app.get("/", async (req, res) => {
  res.send(`Hello, ${req.query.name}!`);

  // Sync Models to DB, seed DB
  await syncDbTables();
});

export default app;
