import React from 'react'
import './loading.css'

export default function Loading({message}) {
    return(
    <div className='loading-container'>
        <h1 className='loading'>{message}</h1>
        <img src='https://images.vexels.com/media/users/3/137941/isolated/preview/62e3913301b94a8effd0e834369d8bb2-ilustraci--n-de-tarro-de-cerveza-by-vexels.png'></img>
    </div>
    )
}