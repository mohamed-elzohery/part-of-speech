import { Actions, Action, State } from "./ScreenCtx";

const ScreenReducer = (state: State, action: Action) => {
    if(action.type === Actions.OPEN_QUIZ) return {...state,isQuizOpen: true, isFinalOpen: false};
    if(action.type === Actions.OPEN_FINAL) return {...state, isQuizOpen: false, isFinalOpen: true};
    if(action.type === Actions.OPEN_START) return {...state, isQuizOpen: false, isFinalOpen: false};
    return state;
}

export default ScreenReducer;