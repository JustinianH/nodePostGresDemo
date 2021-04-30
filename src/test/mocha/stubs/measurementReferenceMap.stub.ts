import { MeasurementsReferenceMap } from "../../../models/MeasurementsReferenceMap";

const measurementReferenceMap: MeasurementsReferenceMap = {
	conditionNamesToKeys: {
		diabetes: 1,
		heartdisease: 2,
		pregnancy: 3,
	},
	measurementTypesToKeys: {
		feelings: 1,
		mentalhealth: 2,
		selfcare: 3,
		vitals: 4,
	},
	noteCategoriesToKeys: {
		changesinme: 1,
		mytodolist: 2,
		mytipoftheday: 3,
		myquestionsanswered: 4,
		myfoodismymedicine: 5,
		mylifeishowiliveit: 6,
		community: 7,
	},
	measurementNamesToKeys: {
		tired: 2,
		hungry: 3,
		thirsty: 4,
		mood: 5,
		stressed: 6,
		doctoractivities: 7,
		exercisetoday: 8,
		eatenwell: 9,
		sleptwell: 10,
		meditationtoday: 11,
		takenvitamins: 12,
		checkedbloodsugar: 24,
		connectedtoday: 14,
		morningwalk: 15,
		meditation: 16,
		bloodsugar: 27,
		temperature: 26,
		bloodpressure: 21,
		cranky: 22,
		hemoglobin: 28,
		cholesterol: 29,
	},
};

export default measurementReferenceMap;