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
exports.WORDS_NUMBER = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const types_1 = require("../types");
;
// Constants
exports.WORDS_NUMBER = 10;
// Helper Function O(n)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
const getWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Reading data from json file
    const data = yield promises_1.default.readFile(path_1.default.join(__dirname, '../../data/TestData.json'));
    // Extract wordlist
    const { wordList: allWords } = JSON.parse(data.toString());
    // Shuffle Words Array
    let randomWords = shuffleArray(allWords);
    // Occurences Checking Object
    const includedCategoriesArr = Object.values(types_1.Category);
    const categoriesObject = includedCategoriesArr.reduce((acc, current) => Object.assign(acc, { [current]: false }), {});
    // array for unique words category;
    const uniqueWords = [];
    // array to collect the rest of words so we just loop one time
    // Keeping time complexity O(n)
    const restWords = [];
    randomWords.every((word) => {
        // Check if desired length is reached and unique categoreies are all present
        //  so we don't have to loop the entire array
        if ((uniqueWords.length === includedCategoriesArr.length)
            &&
                (uniqueWords.length + restWords.length === exports.WORDS_NUMBER)) {
            return false;
        }
        if (categoriesObject[word.pos] === false) {
            categoriesObject[word.pos] = true;
            uniqueWords.push(word);
        }
        else {
            restWords.push(word);
        }
        return true;
    });
    // Merge Arrays and shuffle
    const mergedArray = shuffleArray([...uniqueWords, ...restWords].slice(0, exports.WORDS_NUMBER));
    res.json(mergedArray);
});
exports.default = getWords;
