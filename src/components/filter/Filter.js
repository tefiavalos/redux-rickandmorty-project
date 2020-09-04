import React from 'react'
import './filter.css'
export default function Filter({ filter }) {
    return (
        <form className='container-filter'>
            <label class="container-input">
                Characters
                <input type="radio" value="characters" defaultChecked name="radio" onClick={filter} />
                <span class="checkmark"></span>
            </label>
            <label class="container-input">
                Locations
                <input type="radio" name="radio" value="location" onClick={filter} />
                <span class="checkmark"></span>
            </label>
            <label class="container-input">
                Episodes
                <input type="radio" name="radio" value="episode" onClick={filter} />
                <span class="checkmark"></span>
            </label>
        </form>
    )
}