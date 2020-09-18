import React from 'react'
import Modal from '../modal/Modal'
import PropTypes from 'prop-types';
import './card.css'

const Card = ({
    name, image, dimension, episode, type, created, gender, species, residents, episodeCharacters
}) => {
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
                {image ? <img className="data-image" alt={name} src={image} /> : 
                <p className='p-card'>{dimension || episode}</p>}
                <button className='button-card' onClick={handleOpen}>
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
                    episode={episode}
                    episodeCharacters={episodeCharacters} 
                    residents={residents}></Modal>
            </div>

        </>
    )
}

Card.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    dimension: PropTypes.string,
    episode: PropTypes.string,
    type: PropTypes.string,
    created: PropTypes.string,
    gender: PropTypes.string,
    species: PropTypes.string,
    residents: PropTypes.array,
    episodeCharacter: PropTypes.array,
}

export default Card