import React from 'react';
import { Category } from '../../types';
import classes from './Option.module.css'

interface Props {
    option: Category,
    isSelected: boolean,
    isChecked: boolean,
    isRightAnswer: boolean,
    onSelect: (option: Category) => void
}

const Option: React.FC<Props> = ({option, isSelected = false, onSelect, isChecked, isRightAnswer}) => {

    const handleSelect = () => {
        onSelect(option);
    }

    return  <div onClick={handleSelect} 
                className={`${classes.optionBox}
                ${isSelected && classes.selected} 
                ${isChecked && classes.disabled}
                ${isSelected && isChecked ? (isRightAnswer ? classes.right : classes.wrong) : "" }`}
            >
                <label htmlFor={option}>{option}</label>
                <input type="button" id={option} value={option} />
            </div>
}

export default Option;