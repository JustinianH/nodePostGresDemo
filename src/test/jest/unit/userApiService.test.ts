import { Client } from "pg";

import {getAllUsers} from "../../../services/userApiService";
import User from "../../../models/User";

//jest.mock("Client");

describe.skip("userApiService should return correct data", () => {
    test("GetAllUsers should return all users", () => {
        let response: Array<User> = [{name: "Jhune", age: 33}];

    
    })
})