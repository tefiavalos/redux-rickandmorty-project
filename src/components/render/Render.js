import React from 'react'
import Card from '../card/Card'
import Button from '../button/Button'
import Loading from '../loading/Loading'
import Pagination from '@material-ui/lab/Pagination'
import { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction } from '../../redux/charsDuck'
import { connect } from 'react-redux'
import './render.css'

export function Render({ characters, formSearch, handleClick, render, data, handleClickPrev, nextPage, pagesCh }) {
    
    return (
        <>
            <Button handleClickPrev={handleClickPrev} message={'<'} />
            <Button handleClickNext={handleClick} message={'>'} />
            <div className="container-render">
                {formSearch.length >= 3 && data.filter(data => data.name.toLowerCase().includes(formSearch)).map((data, i) => {
                    return (
                        <Card name={data.name} image={data.image} i={i}></Card>
                    )
                })}
                {formSearch && formSearch.length < 3 &&
                    <Loading message={'Mientras buscas, tomá tu birrita (y dame 3 caracteres)'}/>}
                {!formSearch && data.map(render)}
            </div>
            <Button handleClickPrev={handleClickPrev} message={'<'} />
            <Button handleClickNext={handleClick} message={'>'} />
           {/*  <Pagination count={34} color="secondary" /> */}
        </>
    )
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
