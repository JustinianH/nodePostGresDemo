import * as dbHelpers from "../../../database/helpers/db-helpers";
import sinon from "sinon";
import { Conditions } from "../../../database/models/Conditions";
import measurementReferenceMap from "../stubs/measurementReferenceMap.stub";
import chai from "chai";
import { MeasurementTypes } from "../../../database/models/MeasurementTypes";
import { NoteCategories } from "../../../database/models/NoteCategories";
import { Measurements } from "../../../database/models/Measurements";
import measurementsFromDb from "../stubs/measurementsFromDb.stub";

const expect = chai.expect;

describe("test db helpers", () => {

    afterEach(() => {
        sinon.restore();
    });

	it(`getConditionNames to Keys returns condition name to keys`, async () => {
		// stub out the find alls to make sure it returns reversed map

		const conditionsFromDb = [
			{
				id: 1,
				name: "Diabetes",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
			{
				id: 2,
				name: "Heart Disease",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
			{
				id: 3,
				name: "Pregnancy",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
		];

        sinon.stub(Conditions, "findAll").resolves(Conditions.bulkBuild(conditionsFromDb));
        
        const expected = measurementReferenceMap.conditionNamesToKeys;
        const actual = await dbHelpers.getConditionNamesToKeys();

        expect(actual).to.be.eql(expected);
    });
    
    it(`getMeasurementTypesToKeys returns type names to keys`, async () => {
		// stub out the find alls to make sure it returns reversed map

		const measurementTypesFromDb = [
			{
				id: 1,
				type: "feelings",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
			{
				id: 2,
				type: "Mental Health",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
			{
				id: 3,
				type: "Self Care",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
            },
            {
				id: 4,
				type: "Vitals",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
		];

        sinon.stub(MeasurementTypes, "findAll").resolves(MeasurementTypes.bulkBuild(measurementTypesFromDb));
        
        const expected = measurementReferenceMap.measurementTypesToKeys;
        const actual = await dbHelpers.getMeasurementTypesToKeys();

        expect(actual).to.be.eql(expected);
    });

    it(`getMeasurementTypesToKeys returns type names to keys`, async () => {
		const noteCategoriesFromDb = [
			{
				id: 1,
				category: "changesInMe",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
			{
				id: 2,
				category: "myToDoList",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
			{
				id: 3,
				category: "myTipOfTheDay",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
            },
            {
				id: 4,
				category: "myQuestionsAnswered",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
            },
            {
				id: 5,
				category: "myFoodIsMyMedicine",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
            },
            {
				id: 6,
				category: "myLifeIsHowILiveIt",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
            },
            {
				id: 7,
				category: "community",
				createdAt: "2021-04-21T14:43:18.964Z",
				updatedAt: "2021-04-21T14:43:18.964Z",
			},
		];

        sinon.stub(NoteCategories, "findAll").resolves(NoteCategories.bulkBuild(noteCategoriesFromDb));
        
        const expected = measurementReferenceMap.noteCategoriesToKeys;
        const actual = await dbHelpers.getNoteCategoriesToKeys();

        expect(actual).to.be.eql(expected);
    });

    it(`getMeasurementNamesToKeys returns measurment names to keys`, async() => { 
        sinon.stub(Measurements, "findAll").resolves(Measurements.bulkBuild(measurementsFromDb));
        const expected = measurementReferenceMap.measurementNamesToKeys;
        const actual = await dbHelpers.getMeasurementNamesToKeys();

        expect(actual).to.be.eql(expected);            
     });
});

export {};
