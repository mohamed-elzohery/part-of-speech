import React, { useContext, useEffect, useState } from 'react';
import { sendScore } from '../../API';
import Spinner from '../../components/spinner/Spinner';
import { ScreenCtx } from '../../context/ScreenContext/ScreenCtx';
import { UserCTX } from '../../context/UserContext/UserCtx';
import classes from './Final.module.css';

const Final = () => {
    const {finalScore, resetScore} = useContext(UserCTX);
    const {openStart} = useContext(ScreenCtx)
    const [rank, setRank] = useState<number | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(()=>{
        sendScore({finalScore: finalScore * 10})
        .then(({data: {rank}}) => setRank(rank))
        .catch(err => setIsError(true));
    }, [finalScore]);

    const handleTryAgain = () => {
        openStart();
        resetScore();
    }

    if(isError) return <p className={classes.error}>Error while sending data</p>;

    if(rank !== null) return <div className={classes.container}>
        <h1>You scored <span>{finalScore * 10}</span></h1>
        <h3>You are ranked higher than {rank}% of who took this test</h3>
        <button onClick={handleTryAgain}>Try Again</button>
    </div>;

    return <Spinner />
    
}

export default Final;