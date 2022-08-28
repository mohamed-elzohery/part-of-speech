import fs from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { Category, Word } from '../types';

// Types
export interface DataI {
    wordList: Word[],
    scoresList: number[]
};

type HasCategory = {
    [key in Category]?: boolean
}

// Constants
export const WORDS_NUMBER = 10;


// Helper Function O(n)
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const getWords = async (req: Request, res: Response, next: NextFunction) => {
    
    // Reading data from json file
    const data = await fs.readFile(path.join(__dirname, '../../data/TestData.json'));
    
    // Extract wordlist
    const {wordList: allWords}: DataI = JSON.parse(data.toString());
    
    // Shuffle Words Array
    let randomWords: Word[] = shuffleArray(allWords);
    
    // Occurences Checking Object
    const includedCategoriesArr = Object.values(Category);
    const categoriesObject: HasCategory = includedCategoriesArr.reduce((acc, current) => Object.assign(acc, {[current]: false}), {});

    // array for unique words category;
    const uniqueWords: Word[] = [];

    // array to collect the rest of words so we just loop one time
    // Keeping time complexity O(n)
    const restWords: Word[] = [];

    randomWords.every((word) => {
        // Check if desired length is reached and unique categoreies are all present
        //  so we don't have to loop the entire array
        if((uniqueWords.length === includedCategoriesArr.length)
            && 
          (uniqueWords.length + restWords.length === WORDS_NUMBER)){
            return false;
        }

        if(categoriesObject[word.pos] === false){
            categoriesObject[word.pos] = true;
            uniqueWords.push(word);
        }else{
            restWords.push(word);
        }
        return true;
    });

    // Merge Arrays and shuffle
    const mergedArray = shuffleArray([...uniqueWords, ...restWords].slice(0, WORDS_NUMBER));

    res.json(mergedArray);
};

export default getWords;