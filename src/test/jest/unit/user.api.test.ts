import request from 'supertest';
import app from '../../../app.js';
import {getAllUsers, getUserById, createNewUser, updateExistingUser, deleteUser} from '../../../services/userApiService';

jest.mock('../../../services/userApiService');

describe('calls correct services from endpoints', () => {
    it("calls getAllUsers from user/all", async () => {
        const result = await request(app).get("/user/all");
        expect(getAllUsers).toHaveBeenCalled();
    })

    it("calls getUserById from user/id", async () => {
        const result = await request(app).get("/user/1");
        expect(getUserById).toHaveBeenCalled();
    });


    it("calls getcreateNewUserUserById from user/id", async () => {
        const result = await request(app).post("/user");
        expect(createNewUser).toHaveBeenCalled();
    })

    it("calls updateExistingUser from user", async () => {
        const result = await request(app).put("/user/1");
        expect(updateExistingUser).toHaveBeenCalled();
    });

    it("calls deleteUser from user", async () => {
        const result = await request(app).delete("/user/1");
        expect(deleteUser).toHaveBeenCalled();
    })
});

export {}