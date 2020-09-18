import React from 'react'
import PropTypes from 'prop-types';
import './generalButton.css'

const GeneralButton = ({message, handleClick, classButton}) => {
    
    return (
        <button className={classButton} onClick={handleClick}>{message}</button>
    )
}

GeneralButton.propTypes = {
    message: PropTypes.string
}

export default GeneralButton