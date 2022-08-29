import React, {createContext, ReactNode, useState} from 'react';

interface Props {
    children?: ReactNode
}

const initialState = {
    finalScore: 0,
    increaseScore: () => {},
    resetScore: () => {},
}

export const UserCTX = createContext(initialState);

const UserProvieder: React.FC<Props> = ({children}) => {
    const [finalScore, setFinalScore] = useState<number>(0);

    const increaseScore = () => setFinalScore(prev => ++prev);
    const resetScore = () => setFinalScore(0);

    return <UserCTX.Provider value={{increaseScore, resetScore, finalScore}}>{children}</UserCTX.Provider>
}

export default UserProvieder;