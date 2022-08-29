import { Actions, Action, State } from "./ScreenCtx";

const ScreenReducer = (state: State, action: Action) => {
    console.log(action.type);
    if(action.type === Actions.OPEN_QUIZ) return {...state,isQuizOpen: true, isFinalOpen: false};
    if(action.type === Actions.OPEN_FINAL) return {...state, isQuizOpen: false, isFinalOpen: true};
    return state;
}

export default ScreenReducer;