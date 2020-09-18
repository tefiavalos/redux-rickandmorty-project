import React from 'react'
import './search.css'
import PropTypes from 'prop-types'

const Search = ({handleChange, formSearch}) => {
    return (
        <form className='container-search'>
            <input type="text" placeholder="Search" onChange={handleChange}
                value={formSearch} name="Characters"/>
        </form>
    )
}

Search.propTypes = {
    handleChange: PropTypes.func, 
    formSearch: PropTypes.string
  }

  export default Search