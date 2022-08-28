import request from "supertest";
import app from '../app';

it('Visiting route /wrong', async () => {
    await request(app).get('/wrong').expect(404);
});