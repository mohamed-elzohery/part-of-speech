import request, {Response} from "supertest";
import app from '../app';
import {Category, Word} from '../types';
import { WORDS_NUMBER } from "../controllers/getWords"; 

interface TypedResponse extends Response{
    body: Word[]
};

describe('words endpoint', () => {
    let response: TypedResponse;
    beforeAll(async () => {
        response = await request(app).get('/words');
        expect(Array.isArray(response.body)).toBeTruthy();
    })

    it('has desired length', async () => {
        expect(response.body.length).toEqual(WORDS_NUMBER);
    });

    it('has at least one noun', async () => {
        expect(response.body.map(({pos}) => pos)).toContain(Category.NOUN);
    });

    it('has at least one verb', async () => {
        expect(response.body.map(({pos}) => pos)).toContain(Category.VERB);
    });

    it('has at least one adjective', async () => {
        expect(response.body.map(({pos}) => pos)).toContain(Category.ADJECTIVE);
    });

    it('has at least one adverb', async () => {
        expect(response.body.map(({pos}) => pos)).toContain(Category.ADVERB);
    });

    it('has no duplicated word', async () => {
        const idArr = response.body.map(({id}) => id);
        expect(Array.isArray(response.body) && new Set(idArr).size === idArr.length)
        .toBeTruthy();
    });
});