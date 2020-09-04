import React, { useState } from 'react'
import Modal from '../modal/Modal'
import './card.css'

export default function Card({
    name, image, dimension, episode, type, created, gender, species
}) {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="container">
                <h1>
                    {name}
                </h1>

                {image ? <img className="data-image" alt={name} src={image} /> : dimension || episode}
                <button className={`button-modal`} onClick={handleOpen}>
                    See more
                </button>
                <Modal
                    handleClose={handleClose}
                    handleOpen={handleOpen}
                    open={open}
                    name={name}
                    type={type}
                    created={created}
                    gender={gender}
                    species={species}
                    image={image}
                    dimension={dimension}
                    episode={episode}></Modal>
            </div>

        </>
    )
}

