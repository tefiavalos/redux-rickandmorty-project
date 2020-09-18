import React from 'react'
import './footer.css'

const Footer = () => {
    let today = new Date()
    let date = `${today.getDate()}-${(today.getMonth())}-${(today.getFullYear())}`

    return(
       <footer>
           <div className='container-p'>
           <p className='name'>Estefanía Avalos</p>
           <p className='date'>{date}</p>
           </div>
       </footer>
    )
}

export default Footer