import React from 'react'

export default function Card({
    name, image
}) {
    return (
        <div >
            <div >
                <img alt="rick" src={image} />
                <p>
                    {name}
                </p>
            </div>
        </div>
    )
}

