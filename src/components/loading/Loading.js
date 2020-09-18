import React from 'react';
import PropTypes from 'prop-types';
import img from '../../assets/beer.png'
import './loading.css'

 const Loading = ({message}) =>{
    return(
    <div className='loading-container'>
        <h1 className='loading'>{message}</h1>
        <img src={img} className='loading-img' alt='loading'></img>
    </div>
    )
}

Loading.propTypes = {
    message: PropTypes.string
}

export default Loading