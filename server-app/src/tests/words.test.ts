import request from "supertest";
import app from '../app';
import {Word} from '../../types';

export interface TypedResponse extends request.Response{
    body: Word[]
};

describe('words endpoint', async () => {
    it('is ten', async () => {
        const response: TypedResponse = await request(app).get('/words');

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(10);
    });

    it('has at least one noun', async () => {
        const response: TypedResponse = await request(app).get('/words');

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.map(({pos}) => pos)).toContain('noun');
    });

    it('has at least one verb', async () => {
        const response: TypedResponse = await request(app).get('/words');

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.map(({pos}) => pos)).toContain('verb');
    });

    it('has at least one adjective', async () => {
        const response: TypedResponse = await request(app).get('/words');

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.map(({pos}) => pos)).toContain('adjective');
    });

    it('has at least one adverb', async () => {
        const response: TypedResponse = await request(app).get('/words');

        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.map(({pos}) => pos)).toContain('adverb');
    });
});