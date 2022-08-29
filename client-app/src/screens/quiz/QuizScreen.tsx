import React, {useEffect, useState} from "react";
import classes from './QuizScreen.module.css';
import Spinner from "../../components/spinner/Spinner";
import { Word, Category } from "../../types";
import { getWords } from "../../API";
import Option from "../../components/option/Option";
import ProgressBar from "../../components/progress-bar/ProgressBar";

const optionsArr = Object.values(Category);



const QuizScreen = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [selectedOption, setSelectedOption] = useState<Category | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentWordIndex, setCurrentWord] = useState<number | null>(null);
    const currentWord = currentWordIndex !== null ?  words[currentWordIndex] : null;

    useEffect(() => {
        getWords()
            .then(({data}) => {
                setWords(data);
                setCurrentWord(0);
                setIsError(false);
            })
            .catch(err => setIsError(true))
    } ,[]);

    const handleSelect = (option: Category) => {
        setSelectedOption(option);
    }



    if(isError) return <p className={classes.error}>Error while fetching data</p>;

    if(currentWord) return <div className={classes.container}>
        <h1><span>{currentWord.word}</span> is ...</h1>
        {optionsArr.map((option, index) => (
            <Option isSelected={selectedOption === option} onSelect={handleSelect} option={option} key={index} />
        ))}
        <ProgressBar progress={Math.floor((currentWordIndex! + 1) / words.length)} />
        <div className={classes.bottom}>
            <div className={classes.counter}>Q {currentWordIndex! + 1}/{words.length}</div>
            {isChecked ? <button>next</button> 
                        : <button disabled={!selectedOption}>check answer</button>}
            </div>
        </div>;

    return <Spinner />;
}

export default QuizScreen;