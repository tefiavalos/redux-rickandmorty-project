import React from 'react'
import ButtonPagination from '../button/ButtonPagination'
import Loading from '../loading/Loading'
import PropTypes from 'prop-types'
import { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction } from '../../redux/dataDuck'
import { connect } from 'react-redux'
import './render.css'

export function Render({  formSearch, handleClick, render, data, handleClickPrev }) {
    return (
        <>    
            <div className="container-render">
                <div className="container-button">
            <ButtonPagination handleClick={handleClickPrev} action={'<'} />
            <ButtonPagination handleClick={handleClick} action={'>'} />
            </div>
                {formSearch.length >= 3 && data.filter(data => data.name.toLowerCase().includes(formSearch)).map(render)}
                {formSearch && formSearch.length < 3 &&
                    <Loading message={'Mientras buscas, tomá tu birrita (y dame 3 caracteres)'}/>}
                {!formSearch && data.map(render)}
                <div className="container-button">
            <ButtonPagination handleClick={handleClickPrev} action={'<'} />
            <ButtonPagination handleClick={handleClick} action={'>'} />
            </div>
            </div>
            

</>
    )
}

Render.propTypes = {
    formSearch: PropTypes.string, 
    handleClick: PropTypes.func, 
    render: PropTypes.func, 
    data: PropTypes.array, 
    handleClickPrev: PropTypes.func
  }

function mapState({ data }) {

    return {
        characters: data.character,
        nextPage: data.nextPageCh,
        prevPage: data.prevPage,
        location: data.location,
        episode: data.episode,
        fetching: data.fetching
    }
}

export default connect(mapState, { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction })(Render)
