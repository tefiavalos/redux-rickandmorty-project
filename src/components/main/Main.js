import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import Filter from '../filter/Filter'
import Search from '../search/Search'
import Render from '../render/Render'
import Loading from '../loading/Loading'
import { connect } from 'react-redux'
import { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction } from '../../redux/charsDuck'
import './main.css'


function Home({ characters, nextPageAction, location, episode, fetching, 
    nextPageEpisodesAction, nextPageLocationAction, prevPageAction }) {
    let [valor, setValor] = useState("characters")
    const [formSearch, setFormSearch] = useState('');

    function renderCharacter(chars, i) {
        return (
            <Card {...chars} key={i} />
        )

    }

    function renderLocation(location, i) {
        return (
            <Card {...location} key={i} />
        )
    }

    function renderEpisode(episode, i) {
        return (
            <Card {...episode} episodeCharacter={episode.characters} key={i} />
            
        )
    }

    function filter(e) {
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
            render={renderCharacter} 
            data={characters}
            valor={valor}
            formSearch={formSearch}></Render>
            </>
            }
            {valor === "episode" &&
            <>
            <Search handleChange={handleChange} formSearch={formSearch}></Search>
            <Render 
            handleClick={nextPageEpisodesAction} 
            render={renderEpisode} 
            data={episode}
            valor={valor}
            formSearch={formSearch}></Render>
            </>
            }
            {valor === "location" &&
            <>
            <Search handleChange={handleChange} formSearch={formSearch}></Search>
            <Render 
            handleClick={nextPageLocationAction} 
            render={renderLocation}
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
        nextPage: data.nextPage,
        location: data.location,
        episode: data.episode,
        fetching: data.fetching
    }
}

export default connect(mapState, { nextPageAction, nextPageEpisodesAction, nextPageLocationAction, prevPageAction })(Home)
