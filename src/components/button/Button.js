import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button({ message, handleClickPrev, handleClickNext }) {
    function handleClick () {
        if (message === '>') {
            handleClickNext()
        }
        else {
            handleClickPrev()
        }
    }


    return (
        <button onClick={handleClick}>{message}</button>
    )
}

Button.propTypes = {
    message: PropTypes.string,
    handleClickPrev: PropTypes.func,
    handleClickNext: PropTypes.func
}