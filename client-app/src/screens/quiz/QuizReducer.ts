import { Action, ActionTypes, StateI } from "./QuizScreen";
import { Category, Word } from "../../types";
import {ANSWER_TIME_IN_SECONDS} from './QuizScreen';

const QuizReducer = (state: StateI, action: Action) => {

    const {type} = action;
    
    switch (type) {

        case ActionTypes.LOAD_WORDS:
            const words = action.payload!.words as Word[];
            return {...state, currentWordIndex: 0, isError: false, words};


        case ActionTypes.REPORT_ERROR:
            return {...state, isError: true};


        case ActionTypes.SUMBIT_ANSWER:
            const isRight = action.payload!.isRight;
            state = {...state, isChecked: true}
            if(isRight){
                state = {...state, isRightAnswer: true};
            }
            return state;


        case ActionTypes.SELECT_OPTION:
            const option = action.payload?.option as Category;
            return {...state, selectedOption: option};


        case ActionTypes.GO_NEXT:
            state = {...state, counter: ANSWER_TIME_IN_SECONDS};
            if(state.currentWordIndex === state.words.length - 1){
                return state;
            };
            if(state.currentWordIndex !== null) state = {
                ...state,
                currentWordIndex: state.currentWordIndex + 1,
                isChecked: false,
                selectedOption: null,
                isRightAnswer: false
            };
            return state;

        case ActionTypes.DECREASE_COUNTER:
            return {...state, counter: state.counter - 1}
    
        default:
            return state;
    }
}

export default QuizReducer;