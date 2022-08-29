import React, {useCallback, useEffect, useReducer} from "react";
import classes from './QuizScreen.module.css';
import Spinner from "../../components/spinner/Spinner";
import { Word, Category } from "../../types";
import { getWords } from "../../API";
import Option from "../../components/option/Option";
import ProgressBar from "../../components/progress-bar/ProgressBar";
import { useContext } from "react";
import { UserCTX } from "../../context/UserContext/UserCtx";
import { ScreenCtx } from "../../context/ScreenContext/ScreenCtx";

import QuizReducer from "./QuizReducer";

const optionsArr = Object.values(Category);

export const ANSWER_TIME_IN_SECONDS = 30;

export enum ActionTypes {
    LOAD_WORDS = "LOAD_DATA",
    REPORT_ERROR = "REPORT_ERROR",
    SUMBIT_ANSWER = "SUMBIT_ANSWER",
    GO_NEXT = "GO_NEXT",
    SELECT_OPTION = "SELECT_OPTION",
    DECREASE_COUNTER = "DECREASE_COUNTER",
}

export interface StateI {
    words: Word[],
    selectedOption: Category | null,
    isChecked: boolean,
    isRightAnswer: boolean,
    isError: boolean,
    currentWordIndex: number | null,
    counter: number,
}

export interface Action {
    type: ActionTypes,
    payload?: {
        words?: Word[],
        isRight?: boolean,
        option?: Category
    }
}

const initialState = {
    words: [],
    selectedOption: null,
    isChecked: false,
    isRightAnswer: false,
    isError: false,
    currentWordIndex:  null,
    counter: ANSWER_TIME_IN_SECONDS,
}

const QuizScreen = () => {

    // Context States
    const {increaseScore} = useContext(UserCTX);
    const {openFinal} = useContext(ScreenCtx);

    // States
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    // State-Derived Variables
    const currentWord = state.currentWordIndex !== null ?  state.words[state.currentWordIndex!] : null;

    // Getting data from server
    useEffect(() => {
        getWords()
            .then(({data}) => {
               dispatch({type: ActionTypes.LOAD_WORDS, payload: {words: data}});
            })
            .catch(err => dispatch({type: ActionTypes.REPORT_ERROR}));
    } ,[]);

    // Actions Handlers
    const handleSelect = (option: Category) => {
        if(state.isChecked) return;
        dispatch({type: ActionTypes.SELECT_OPTION, payload: {option}});
    }

    const handleCheck = () => {
        if(!state.selectedOption) return;
        dispatch({type: ActionTypes.SUMBIT_ANSWER, payload: {isRight: currentWord!.pos === state.selectedOption}})
        if(currentWord?.pos === state.selectedOption) increaseScore();
    }

    const handleNext = useCallback(() => {
        dispatch({type: ActionTypes.GO_NEXT});
        if(state.currentWordIndex === state.words.length - 1) openFinal();
    }
    ,[state.currentWordIndex, state.words.length, openFinal]);

    // Timer Functionality
    useEffect(() => {
        const timer = setInterval(() => {
            if(state.counter === 1) return handleNext();
            dispatch({type: ActionTypes.DECREASE_COUNTER});
        } , 1000);

        return () => clearInterval(timer);
    }, [state.counter, handleNext]);


    if(state.isError) return <p className={classes.error}>Error while fetching data</p>;

    if(currentWord) return <div className={classes.container}>
        <h1><span>{currentWord.word}</span> is ...</h1>
        {optionsArr.map((option, index) => (
            <Option 
                isSelected={state.selectedOption === option} 
                onSelect={handleSelect} option={option} 
                key={index} 
                isRightAnswer={state.isRightAnswer}
                isChecked={state.isChecked}
            />
        ))}
        <span className={`${classes.counter} ${state.counter < 10 ? classes.danger : ''}`}>00:{state.counter.toString().padStart(2,'0')}</span>
        <ProgressBar progress={Math.floor((state.currentWordIndex! / state.words.length) * 100)} />
        <div className={classes.bottom}>
            <div className={classes.counter}>Q {state.currentWordIndex! + 1}/{state.words.length}</div>
            {state.isChecked ? <button onClick={handleNext}>{state.currentWordIndex === state.words.length - 1 ? "sumbit quiz" : "next"}</button> 
                        : <button disabled={!state.selectedOption} onClick={handleCheck}>sumbit answer</button>}
            </div>
        </div>;

    return <Spinner />;
}

export default QuizScreen;