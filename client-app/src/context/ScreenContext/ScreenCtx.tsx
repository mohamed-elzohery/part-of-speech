import React, {createContext, ReactNode, useReducer} from "react";
import ScreenReducer from "./ScreenReducer";

export enum Actions {
    OPEN_QUIZ = "OPEN_QUIZ",
    OPEN_FINAL = "OPEN_FINAL",
    OPEN_START = "OPEN_START",
}

interface Props{
    children?: ReactNode
}

export interface State {
    isQuizOpen: boolean,
    isFinalOpen: boolean,
    openQuiz: () => void,
    openFinal: () => void,
    openStart: () => void,
}

const initialState = {
    isQuizOpen: false,
    isFinalOpen: false,
    openQuiz: () => {},
    openFinal: () => {},
    openStart: () => {},
}

export interface Action{
    type: Actions
    payload?: string,
}

export const ScreenCtx = createContext(initialState);


const ScreenProvider: React.FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(ScreenReducer, initialState);

    const openQuiz = () => {
        dispatch({type: Actions.OPEN_QUIZ});
    }

    const openFinal = () => {
        dispatch({type: Actions.OPEN_FINAL});
    }

    const openStart = () => {
        dispatch({type: Actions.OPEN_START});
    }


    return <ScreenCtx.Provider value={{...state, openQuiz, openFinal, openStart}}>
        {children}
    </ScreenCtx.Provider>
}

export default ScreenProvider;