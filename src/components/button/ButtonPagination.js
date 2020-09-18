import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const ButtonPagination = ({ action, handleClick }) => {
    return (
        <button onClick={handleClick}>{action}</button>
    )
}

ButtonPagination.propTypes = {
    message: PropTypes.string,
    handleClickPrev: PropTypes.func,
    handleClickNext: PropTypes.func
}

export default ButtonPagination