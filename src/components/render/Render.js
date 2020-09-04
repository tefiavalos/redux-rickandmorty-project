import React from 'react'
import Card from '../card/Card'
import Button from '../button/Button'
import Pagination from '@material-ui/lab/Pagination'
import { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction } from '../../redux/charsDuck'
import { connect } from 'react-redux'
import './render.css'

export function Render({ formSearch, handleClick, render, data, handleClickPrev, pagesCh }) {
    console.log(pagesCh)
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
                    <div>
                        <h1 className='loading'>Mientras buscas, tomate tu birrita</h1>
                        <img src='https://images.vexels.com/media/users/3/137941/isolated/preview/62e3913301b94a8effd0e834369d8bb2-ilustraci--n-de-tarro-de-cerveza-by-vexels.png'></img>
                    </div>}
                {!formSearch && data.map(render)}
            </div>
            <Button message={'anterior'} />
            <Button handleClick={handleClick} message={'siguiente'} />
            <Pagination count={pagesCh} color="secondary" />
                    </>
    )
}

function mapState({ data }) {

    return {
        characters: data.character,
        nextPage: data.nextPage,
        prevPage: data.prevPage,
        location: data.location,
        episode: data.episode,
        fetching: data.fetching,
        pagesCh: data.pagesCh
    }
}

export default connect(mapState, { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction })(Render)
