import chai from "chai";
import sinon from "sinon";

const expect = chai.expect;

import {createUserNote, returnUserMeasurementByConditionAndMeasurement, updateUserMeasurement, saveAggregateUserMeasurements, getUserWeeklyMeasurements} from "../../../services/userMeasurements";
import { UserNotes } from "../../../database/models/UserNotes";
import { UserNote } from "../../../models/UserNote";
import { UserMeasurements } from "../../../database/models/UserMeasurements";
import { UserMeasurement } from "../../../models/UserMeasurement";
import { sequelizeConnection } from "../../../database/sequelizeConnection";
import * as dbHelpers from "../../../database/helpers/db-helpers";
import { Measurements } from "../../../database/models/Measurements";


describe("User Measurement services test", () => {
	it("should return UserMeasurement data properly formatted", () => {
		let dailyAndWeeklyMeasurements = {
			daily: [
				{
					id: 119,
					measurement_value: "232",
					created_at: "2021-04-26T19:35:42.434Z",
					condition_name: "Heart Disease",
					measurement: "hemoglobin",
					measurement_type: "vitals",
				},
				{
					id: 120,
					measurement_value: "33",
					created_at: "2021-04-26T19:35:42.520Z",
					condition_name: "Heart Disease",
					measurement: "Cholesterol",
					measurement_type: "vitals",
				},
			],
			weekly: [
				{
					id: 3,
					measurement_value: "142",
					created_at: "2021-04-21T14:45:48.720Z",
					condition_name: "Heart Disease",
					measurement: "bloodSugar",
					measurement_type: "vitals",
				},
				{
					id: 58,
					measurement_value: "5",
					created_at: "2021-04-21T16:36:23.406Z",
					condition_name: "Heart Disease",
					measurement: "hungry",
					measurement_type: "feelings",
				},
			],
		};

		let expected = {
			"Heart Disease": {
				daily: {
					vitals: {
						hemoglobin: [
							{
								id: 119,
								measurement_value: "232",
								created_at: "2021-04-26T19:35:42.434Z",
								condition_name: "Heart Disease",
								measurement: "hemoglobin",
								measurement_type: "vitals",
							},
						],
						Cholesterol: [
							{
								id: 120,
								measurement_value: "33",
								created_at: "2021-04-26T19:35:42.520Z",
								condition_name: "Heart Disease",
								measurement: "Cholesterol",
								measurement_type: "vitals",
							},
						],
					},
				},
				weekly: {
					vitals: {
						bloodSugar: [
							{
								id: 3,
								measurement_value: "142",
								created_at: "2021-04-21T14:45:48.720Z",
								condition_name: "Heart Disease",
								measurement: "bloodSugar",
								measurement_type: "vitals",
							},
						],
					},
                    feelings: {
                        hungry: [
                            {
                                id: 58,
                                measurement_value: "5",
                                created_at: "2021-04-21T16:36:23.406Z",
                                condition_name: "Heart Disease",
                                measurement: "hungry",
                                measurement_type: "feelings",
                            },
                        ],
                    },
				},
			},
        };
        
        let actual = returnUserMeasurementByConditionAndMeasurement(dailyAndWeeklyMeasurements);

        expect(actual).to.eql(expected);
    });
    
    describe("service should call db methods", () => {
        it("CreateUserNote should call UserNote.Create", async () => {
            let newNote: UserNote = { user_id: 1, note: "hello", note_category: 3 };
            const mockUserNotes = sinon.stub(UserNotes, "create").resolves();            

            await createUserNote(newNote);

            expect(mockUserNotes.called).true;
            
        });

        it("updateUserMeasurement should call UserMeasurement.Upate", async () => {
            let updatedMeasurement: UserMeasurement = {
                user_id: 3,
                condition_id: 2,
                measurement_id: 3,
                measurement_value: "none",
                created_at: "2021-04-14T17:39:17.881Z",
                id: 10,
          };
            const mockUserMeasurements = sinon.stub(UserMeasurements, "update").resolves();            

            await updateUserMeasurement(updatedMeasurement);

            expect(mockUserMeasurements.called).true;
            
        });

        it("saveAggregateUserMeasurements should call UserMeasurement.create for each measurement", async () => {
            let measurementPayload = {
                user_id: "3",
                pregnancy: {
                    measurements: {
                        vitals: {
                            hemoglobin: "382",
                            temperature: "99",
                            "Blood sugar": [134],
                        },
                    },
                },
            };
            const mockUserMeasurements = sinon.mock(UserMeasurements); 
            mockUserMeasurements.expects("create").exactly(3);

            await saveAggregateUserMeasurements(measurementPayload);

            mockUserMeasurements.verify();
        });

        it.only(`creates a new measurement in db when passed in payload`, async () => {
            let measurementPayload = {
                user_id: "3",
                pregnancy: {
                    measurements: {
                        vitals: {
                            newMeasurementName: "test",
                        },
                    },
                },
            };

            const mockCreateMeasurement = sinon.stub(dbHelpers, "createMeasurement").resolves(110);
            const mockUserMeasurements = sinon.mock(UserMeasurements);

            mockUserMeasurements.expects("create").exactly(1);

            await saveAggregateUserMeasurements(measurementPayload);

            mockUserMeasurements.verify();
            expect(mockCreateMeasurement.called).true;
        });

        it(`getUserWeeklyMeasurements calls a query`, async() => { 
            const mockSequelizeConnection = sinon.stub(sequelizeConnection, "query").resolves();

            await getUserWeeklyMeasurements(1, "diabetes");

            expect(mockSequelizeConnection.called).true;

         });
      });

      
});

export {};
