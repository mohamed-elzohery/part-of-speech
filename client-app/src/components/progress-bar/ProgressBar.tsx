import React from "react";
import classes from './ProgressBar.module.css';

interface Props {
    progress: number,
}
const ProgressBar: React.FC<Props> = ({progress}) => {
    return (
      <div className={classes.container}>
        <div className={classes.progress} style={{width: `${progress}%`}}>
          <span className={classes.label} style={{color: progress === 0 ? "#0000FF" : "#FFF", marginLeft: '4rem' }}>{`${progress}%`}</span>
        </div>
      </div>
    );
  };

export default ProgressBar;