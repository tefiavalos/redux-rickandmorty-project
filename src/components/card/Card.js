import React, { useState } from 'react'
import './card.css'

export default function Card({
    name, image, dimension, episode, type, created
}) {

    const [display, setDisplay] = useState("none")

    function handleClick() {
        setDisplay(display === "none" ? "block" : "none")
    }
    return (
        <>
            <div onClick={handleClick}>
                <h1>
                    {name}
                </h1>
                <div >
                    {image ? <img alt={name} src={image} /> : dimension || episode}
                </div>
                <modal className={`${display}`}>
                    <h1>{name}</h1>
                    {type ? <h1>{type}</h1> : <h1>{created}</h1>}
                </modal>
            </div>

        </>
    )
}

