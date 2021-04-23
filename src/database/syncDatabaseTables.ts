import { Conditions } from "./models/Conditions";
import { Measurements } from "./models/Measurements";
import { UserMeasurements } from "./models/UserMeasurements";
import Users from "./models/Users";
import { MeasurementTypes } from "./models/MeasurementTypes";
import { NoteCategories } from "./models/NoteCategories";
import { UserNotes } from "./models/UserNotes";

// Sync tables to DB with Sequelize and Seed DB if needed
const syncDbTables = async () => {
  
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
  
  await MeasurementTypes.sync().then(async function () {
    let measurementTypesSeeded = await MeasurementTypes.findAll({ raw: true });

    //  Seed table if empty
    if (!measurementTypesSeeded.length) {
      return MeasurementTypes.bulkCreate([
        { type: "feelings" },
        { type: "mentalHealth" },
        { type: "selfCare" },
        { type: "vitals" }
      ]);
    }
  });

  await Measurements.sync().then(async function () {
    let measurementsSeeded = await Measurements.findAll({ raw: true });
    
    //  Seed table if empty
    if (!measurementsSeeded.length) {
      return Measurements.bulkCreate([
        { measurement: "bloodSugar", measurement_type: null },
        { measurement: "tired", measurement_type: 1 },
        { measurement: "hungry", measurement_type: 1},
        { measurement: "thirsty", measurement_type: 1},
        { measurement: "mood", measurement_type: 1},
        { measurement: "stressed", measurement_type: 1},
        { measurement: "doctorActivities", measurement_type: 3},
        { measurement: "exerciseToday", measurement_type: 3},
        { measurement: "eatenWell", measurement_type: 3},
        { measurement: "sleptWell", measurement_type: 3},
        { measurement: "meditationToday", measurement_type: 3},
        { measurement: "takenVitamins", measurement_type: 4},
        { measurement: "checkedBloodSugar", measurement_type: 4},
        { measurement: "connectedToday", measurement_type: 2},
        { measurement: "morningWalk", measurement_type: 2},
        { measurement: "meditation", measurement_type: 2},
      ]);
    }
  });

  await Users.sync();
  
  await NoteCategories.sync().then(async function () {
    let noteCategoriesSeeded = await NoteCategories.findAll({ raw: true });

    if(!noteCategoriesSeeded.length) {
        NoteCategories.bulkCreate([
            {category: "changesInMe"},
            {category: "myToDoList"},
            {category: "myTipOfTheDay"},
            {category: "myQuestionsAnswered"},
            {category: "myFoodIsMyMedicine"},
            {category: "myLifeIsHowILiveIt"},
            {category: "community"},
        ])
    }
  });

  await UserNotes.sync();
  await UserMeasurements.sync();
};

export default syncDbTables;
