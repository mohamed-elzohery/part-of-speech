import request, {Response} from "supertest";
import app from '../app';

interface TypedResponse extends Response{
    body: {
        rank?: number,
        message?: string
    }
};

describe('Rank endpoint', () => {
    let response: TypedResponse;
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

    it('is invalid number -greater-',async () => {
        response = await request(app).post('/rank').send({finalScore: 110});
        expect(400);
        expect(response.body.message).toBe('invalid final score');
    });

    it('is invalid number -lower-',async () => {
        response = await request(app).post('/rank').send({finalScore: -10});
        expect(400);
        expect(response.body.message).toBe('invalid final score');
    });

    it('is an invalid value',async () => {
        response = await request(app).post('/rank').send({finalScore: "random"});
        expect(400);
        expect(response.body.message).toBe('invalid final score');
    });

    it('is an empty body',async () => {
        response = await request(app).post('/rank');
        expect(400);
        expect(response.body.message).toBe('invalid final score');
    });
});

