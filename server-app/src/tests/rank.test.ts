import request, {Response} from "supertest";
import app from '../app';

interface TypedResponse extends Response{
    body: {
        rank: number
    }
};

describe('Rank endpoint', () => {
    let response: Response;
    it('is equal to 80%',async () => {
        response = await request(app).post('/rank').send({finalScore: 90});
        expect(Array.isArray(response.body.rank)).toBe(90);
    });

    it('is equal to 56.67%',async () => {
        response = await request(app).post('/rank').send({finalScore: 60});
        expect(Array.isArray(response.body.rank)).toBe(56.67);
    });

    it('is equal to 40%',async () => {
        response = await request(app).post('/rank').send({finalScore: 50});
        expect(Array.isArray(response.body.rank)).toBe(40);
    });

    it('is equal to 26.67%',async () => {
        response = await request(app).post('/rank').send({finalScore: 30});
        expect(Array.isArray(response.body.rank)).toBe(26.67);
    });
});

