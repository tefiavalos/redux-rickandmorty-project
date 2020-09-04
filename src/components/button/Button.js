import React from 'react'
import './button.css'

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