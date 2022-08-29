import React from 'react';
import { Category } from '../../types';
import classes from './Option.module.css'

interface Props {
    option: Category,
    isSelected: boolean,
    onSelect: (option: Category) => void
}

const Option: React.FC<Props> = ({option, isSelected = false, onSelect}) => {

    const handleSelect = () => {
        onSelect(option);
    }

    return  <div onClick={handleSelect} className={`${classes.optionBox} ${isSelected && classes.selected}`}>
                <label htmlFor={option}>{option}</label>
                <input type="button" id={option} value={option} />
            </div>
}

export default Option;