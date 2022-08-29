import React, { useContext } from 'react';
import { ScreenCtx } from '../../context/ScreenContext/ScreenCtx';
import classes from './Start.module.css';

const StartScreen = () => {
    const {openQuiz} = useContext(ScreenCtx);
    
    return <div className={classes.container}>
        <h1>part of speech</h1>
        <p>
            In English language, words can be categorized according to their syntactic functions, which is known as "Part of Speech".
            <br/>Examples of part of speech: (noun, verb, adjective, ...)
        </p>
        <button onClick={openQuiz}>start quiz</button>
    </div>
}

export default StartScreen;