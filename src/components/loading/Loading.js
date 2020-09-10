import React from 'react';
import PropTypes from 'prop-types';
import './loading.css'

export default function Loading({message}) {
    return(
    <div className='loading-container'>
        <h1 className='loading'>{message}</h1>
        <img 
        className='loading-img' 
        src='https://images.vexels.com/media/users/3/137941/isolated/preview/62e3913301b94a8effd0e834369d8bb2-ilustraci--n-de-tarro-de-cerveza-by-vexels.png'
        alt='loading'></img>
    </div>
    )
}

Loading.propTypes = {
    message: PropTypes.string
}