import React, {useContext, useEffect, useState} from "react";
import classes from './QuizScreen.module.css';
import Spinner from "../../components/spinner/Spinner";
import { Word, Category } from "../../types";
import { getWords } from "../../API";
import Option from "../../components/option/Option";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import { ScreenCtx } from "../../context/ScreenContext/ScreenCtx";
import { UserCTX } from "../../context/UserContext/UserCtx";

const optionsArr = Object.values(Category);

const QuizScreen = () => {
    const {openFinal} = useContext(ScreenCtx);
    const {increaseScore} = useContext(UserCTX);
    const [words, setWords] = useState<Word[]>([]);
    const [selectedOption, setSelectedOption] = useState<Category | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isRightAnswer, setIsRightAnswer] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
    const currentWord = currentWordIndex !== null ?  words[currentWordIndex] : null;

    useEffect(() => {
        getWords()
            .then(({data}) => {
                setWords(data);
                setCurrentWordIndex(0);
                setIsError(false);
            })
            .catch(err => setIsError(true))
    } ,[]);

    useEffect(() => {
        setSelectedOption(null);
        setIsChecked(false);
        setIsRightAnswer(false);
    }, [currentWordIndex])

    const handleSelect = (option: Category) => {
        if(isChecked) return;
        setSelectedOption(option);
    }

    const handleCheck = () => {
        if(!selectedOption) return;
        setIsChecked(true);
        if(currentWord!.pos === selectedOption) {
            setIsRightAnswer(true);
            increaseScore();
        };
    }

    const handleNext = () => {
        console.log(currentWordIndex);
        if(currentWordIndex === words.length - 1) return openFinal();
        if(currentWordIndex !== null) setCurrentWordIndex(prev => ++prev!);
    }

    if(isError) return <p className={classes.error}>Error while fetching data</p>;

    if(currentWord) return <div className={classes.container}>
        <h1><span>{currentWord.word}</span> is ...</h1>
        {optionsArr.map((option, index) => (
            <Option 
                isSelected={selectedOption === option} 
                onSelect={handleSelect} option={option} 
                key={index} 
                isRightAnswer={isRightAnswer}
                isChecked={isChecked}
            />
        ))}
        <ProgressBar progress={Math.floor((currentWordIndex! / words.length) * 100)} />
        <div className={classes.bottom}>
            <div className={classes.counter}>Q {currentWordIndex! + 1}/{words.length}</div>
            {isChecked ? <button onClick={handleNext}>{currentWordIndex === words.length - 1 ? "sumbit answers" : "next"}</button> 
                        : <button disabled={!selectedOption} onClick={handleCheck}>check answer</button>}
            </div>
        </div>;

    return <Spinner />;
}

export default QuizScreen;