import React, { useState } from 'react'
import Card from '../card/Card'
import Filter from '../filter/Filter'
import Search from '../search/Search'
import Render from '../render/Render'
import Loading from '../loading/Loading'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction, prevPageEpisodesAction, prevPageLocationAction } from '../../redux/dataDuck'
import './main.css'


const Home = ({ characters, episode, location, nextPageAction, fetching, 
    nextPageEpisodesAction, nextPageLocationAction, prevPageAction, 
    page, prevPageEpisodesAction, prevPageLocationAction }) => {
        
    let [valor, setValor] = useState("characters")
    const [formSearch, setFormSearch] = useState('');

    const renderData = (data, i) => {
        return (
            <Card 
            {...data}
            key={i}
            episodeCharacters={data.characters} /> 
        )
    }

    const filter = (e) => {
        return (
            setValor(e.target.value)
        )
    }

    const handleChange = (e) => {
        setFormSearch(e.target.value);
    }

    if(fetching){
        return(
            <Loading message={'Mientras carga, toma tu birrita'}/>
        )
    }

    return (
        <main>
            <Filter filter={filter}></Filter>
            <div className="card-container">
            {valor === "characters" &&
            <>
            <Search handleChange={handleChange} formSearch={formSearch}></Search>
            <Render 
            handleClickPrev={prevPageAction}
            handleClick={nextPageAction} 
            page={page}
            render={renderData} 
            data={characters}
            valor={valor}
            formSearch={formSearch}></Render>
            </>
            }
            {valor === "episode" &&
            <>
            <Search handleChange={handleChange} formSearch={formSearch}></Search>
            <Render 
            handleClickPrev={prevPageEpisodesAction}
            handleClick={nextPageEpisodesAction} 
            page={page}
            render={renderData} 
            data={episode}
            valor={valor}
            formSearch={formSearch}></Render>
            </>
            }
            {valor === "location" &&
            <>
            <Search handleChange={handleChange} formSearch={formSearch}></Search>
            <Render 
            handleClickPrev={prevPageLocationAction}
            handleClick={nextPageLocationAction} 
            page={page}
            render={renderData}
            data={location}
            valor={valor}
            formSearch={formSearch}></Render>
            </>
            }
            </div>
            
        </main>
    )
}

function mapState({ data }) {

    return {
        characters: data.character,
        nextPage: data.nextPageCh,
        location: data.location,
        episode: data.episode,
        fetching: data.fetching,
        page: data.page
    }
}

Home.propTypes = {
    characters: PropTypes.array, 
    nextPageAction: PropTypes.func, 
    location: PropTypes.array, 
    episode: PropTypes.array, 
    fetching: PropTypes.bool, 
    nextPageEpisodesAction: PropTypes.func, 
    nextPageLocationAction: PropTypes.func, 
    prevPageAction: PropTypes.func, 
    page: PropTypes.number, 
    prevPageEpisodesAction: PropTypes.func, 
    prevPageLocationAction: PropTypes.func,
}

export default connect(mapState, { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction, prevPageEpisodesAction, prevPageLocationAction })(Home)
