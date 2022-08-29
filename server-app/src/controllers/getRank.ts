import fs from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { DataI, WORDS_NUMBER } from './getWords';

// Constants
export const PointsPerWord = 10;

const getRank = async (req: Request, res: Response, next: NextFunction) => {

    // Check if request body has no final score property or not a number
    if(req.body.finalScore === null || isNaN(req.body.finalScore)){
        res.status(400).json({message: 'invalid final score'});
        return;
    }

    // Extract final score from body
    const {finalScore} = req.body;

    // Counting max score
    const maxScore = PointsPerWord * WORDS_NUMBER;

    // Check if score is in range
    if(finalScore > PointsPerWord * WORDS_NUMBER || finalScore < 0){
        res.status(400).json({message: 'invalid final score range'});
        return;
    }

    // Reading data from json file
    const data = await fs.readFile(path.join(__dirname, '../../data/TestData.json'));
        
    // Extract score list
    const {scoresList}: DataI = JSON.parse(data.toString());

    // Counting scores less than player score
    let lessThanCounter = 0;

    scoresList.forEach(score => {
        if(finalScore > score) lessThanCounter++;
    });

    const rank = Math.ceil((lessThanCounter / scoresList.length)
                * maxScore * 100) / maxScore;

    res.json({rank});
}

export default getRank;