import request from 'supertest';
import app from '../../../app.js';

test("should return a movie critic", async() => {
    await request(app).get('/movies/critic')
        .expect(200)
})