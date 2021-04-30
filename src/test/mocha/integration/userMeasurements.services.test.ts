import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";

const expect = chai.expect;
chai.use(chaiHttp);

describe("integration tests for userMeasurement services", () => {
	let mockApp;

	beforeEach(() => {
		mockApp = chai.request(app);
	});

	it(`Accesses measurement data from DB on GET request`, async () => {
        // Difficult to test the response payload here because it will depend on data entered recently
		mockApp.get("/user-measurements?userId=3&condition=heartdisease").end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});
    });
    
	it.skip(`Saves aggregate measurement data on a POST`, async () => {

        const mockPayload = {
            user_id: "3",
            "heart disease": {
                measurements: {
                    vitals: {
                        temperature: "99",
                    }
                },
            },
        };
        mockApp.post("/user-measurements/aggregate").send(mockPayload).end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});
    });
    
    it.skip(`Udpates measurement data on a PUT`, async () => {

        const mockPayload = {
            measurement_value: "112",
            user_id: 3,
            created_at: "2021-04-26T19:35:42.434Z",
            condition: "Heart Disease",
            measurement: "hemoglobin",
            measurement_type: "vitals",
        };

        mockApp.put("/user-measurements").send(mockPayload).end(function (err, res) {
            console.log(res.body);
            expect(res.body).to.eql([1])
			expect(err).to.be.null;
			expect(res).to.have.status(200);
		});
	});
});
