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
exports.PointsPerWord = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const getWords_1 = require("./getWords");
// Constants
exports.PointsPerWord = 10;
const getRank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if request body has no final score property or not a number
    if (req.body.finalScore === null || isNaN(req.body.finalScore)) {
        res.status(400).json({ message: 'invalid final score' });
        return;
    }
    // Extract final score from body
    const { finalScore } = req.body;
    // Counting max score
    const maxScore = exports.PointsPerWord * getWords_1.WORDS_NUMBER;
    // Check if score is in range
    if (finalScore > exports.PointsPerWord * getWords_1.WORDS_NUMBER || finalScore < 0) {
        res.status(400).json({ message: 'invalid final score range' });
        return;
    }
    // Reading data from json file
    const data = yield promises_1.default.readFile(path_1.default.join(__dirname, '../../data/TestData.json'));
    // Extract score list
    const { scoresList } = JSON.parse(data.toString());
    // Counting scores less than player score
    let lessTanCounter = 0;
    scoresList.forEach(score => {
        if (finalScore > score)
            lessTanCounter++;
    });
    const rank = Math.ceil((lessTanCounter / scoresList.length)
        * maxScore * 100) / maxScore;
    res.json({ rank });
});
exports.default = getRank;
