import React, { useContext } from 'react';
import classes from './App.module.css';
import { ScreenCtx } from './context/ScreenContext/ScreenCtx';
import Final from './screens/final/Final';
import QuizScreen from './screens/quiz/QuizScreen';
import StartScreen from './screens/start/Start';


function App() {
  const { isQuizOpen, isFinalOpen } = useContext(ScreenCtx);
  return (
   <div className={classes.container}>
    <main className={classes.main}>
        {isQuizOpen && <QuizScreen />}
        {isFinalOpen && <Final />}
        {!isFinalOpen && !isQuizOpen && <StartScreen />}
    </main>
   </div>
  );
}

export default App;
