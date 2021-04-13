import request from 'supertest';
import app from '../../../app.js';
import User from '../../../models/User';

const deleteTestUser = async (userId) => {
    return await request(app).delete(`/user/${userId}`);
}

describe('The user api operates correctly', () => {
    it("successfully creates a user in db", async () => {
        
        const newUser: User = {
            name: "Tina",
            age: 50
        };

        const result: any = await request(app).post("/user").send({"user": newUser});

        expect(result.statusCode).toBe(200);
        expect(result).not.toBeNull();
        expect(result.body.rows[0].name).toBe("Tina");

        // delete test user
        await deleteTestUser(result.body.rows[0].id);
    })

    it("successfully deletes a user in db", async () => {
        
        const newUser: User = {
            name: "Allen",
            age: 22
        };

        // Create Test User
        const result: any = await request(app).post("/user").send({"user": newUser});
        // delete test user
        const deleteResult: any = await deleteTestUser(result.body.rows[0].id);

        expect(deleteResult.statusCode).toBe(200);
        expect(result).not.toBeNull();
    })

    it("successfully retrieves a user by id in db", async () => {
        
        const newUser: User = {
            name: "Terrence",
            age: 39
        };

        // Create Test User
        const result: any = await request(app).post("/user").send({"user": newUser});
        const userId: Number = result.body.rows[0].id;

        const retrievedUser: any = await request(app).get(`/user/${userId}`);

        expect(retrievedUser.statusCode).toBe(200);
        expect(retrievedUser).not.toBeNull();
        expect(retrievedUser.body.name).toBe("Terrence");
        
        await deleteTestUser(userId);

    })
});
