"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const types_1 = require("../types");
const getWords_1 = require("../controllers/getWords");
;
describe('words endpoint', () => {
    let response;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, supertest_1.default)(app_1.default).get('/words');
        expect(Array.isArray(response.body)).toBeTruthy();
    }));
    it('has desired length', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.body.length).toEqual(getWords_1.WORDS_NUMBER);
    }));
    it('has at least one noun', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.body.map(({ pos }) => pos)).toContain(types_1.Category.NOUN);
    }));
    it('has at least one verb', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.body.map(({ pos }) => pos)).toContain(types_1.Category.VERB);
    }));
    it('has at least one adjective', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.body.map(({ pos }) => pos)).toContain(types_1.Category.ADJECTIVE);
    }));
    it('has at least one adverb', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(response.body.map(({ pos }) => pos)).toContain(types_1.Category.ADVERB);
    }));
    it('has no duplicated word', () => __awaiter(void 0, void 0, void 0, function* () {
        const idArr = response.body.map(({ id }) => id);
        expect(Array.isArray(response.body) && new Set(idArr).size === idArr.length)
            .toBeTruthy();
    }));
});
