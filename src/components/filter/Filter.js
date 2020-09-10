import React from 'react';
import PropTypes from 'prop-types';
import './filter.css'

export default function Filter({ filter }) {
    return (
        <form className='container-filter'>
            <label className="container-input">
                Characters
                <input type="radio" value="characters" defaultChecked name="radio" onClick={filter} />
                <span className="checkmark"></span>
            </label>
            <label className="container-input input-2">
                Locations
                <input type="radio" name="radio" value="location" onClick={filter} />
                <span className="checkmark"></span>
            </label>
            <label className="container-input input-3">
                Episodes
                <input type="radio" name="radio" value="episode" onClick={filter} />
                <span className="checkmark"></span>
            </label>
        </form>
    )
}

Filter.propTypes = {
    filter: PropTypes.func
}