import { Movies } from "./movies.db-model";
import { Conditions } from "./models/Conditions";
import { Measurements } from "./models/Measurements";
import { UserMeasurements } from "./models/UserMeasurements";
import Users from "./models/Users";

// Sync tables to DB with Sequelize and Seed DB if needed
const syncDbTables = async () => {
  await Movies.sync();

  await Conditions.sync().then(async function (response) {
    let conditionsSeeded = await Conditions.findAll({ raw: true });

    //  Seed table if empty
    if (!conditionsSeeded.length) {
      return Conditions.bulkCreate([
        { name: "Diabetes" },
        { name: "Heart Disease" },
        { name: "Pregnancy" },
      ]);
    }
  });

  await Measurements.sync().then(async function () {
    let measurementsSeeded = await Measurements.findAll({ raw: true });

    //  Seed table if empty
    if (!measurementsSeeded.length) {
      return Measurements.bulkCreate([
        { measurement: "BloodPressure" },
        { measurement: "Tired" },
        { measurement: "Hungry" },
        { measurement: "Thirsty" },
        { measurement: "Mood" },
        { measurement: "Stressed" },
      ]);
    }
  });

  await Users.sync();
  await UserMeasurements.sync();
};

export default syncDbTables;
