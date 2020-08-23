import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import { connect } from 'react-redux'
import { nextPageAction } from '../../redux/charsDuck'
import './home.css'


function Home({ characters, nextPageAction, location, episode }) {
    let [valor, setValor] = useState("characters")

    function renderCharacter(chars, i) {
        return (
            <Card {...chars} key={i} />
        )

    }

    function renderLocation(location, i) {
        console.log(location)

        return (
            <Card {...location} key={i} />
        )
    }

    function renderEpisode(episode, i) {
        return (
            <Card {...episode} key={i} />
        )
    }

    function handleClick() {
        return (
            nextPageAction()
        )
    }
    function filter(e){
    return(
    setValor(e.target.value)
    )    
    }
    return (
        <>
 <div>
                <form>
                    <input type="radio" name="type-filter" value="characters" onClick={filter} />
                    <label>Characters</label>
                    <input type="radio" name="type-filter" value="location" onClick={filter} />
                    <label>Locations</label>
                    <input type="radio" name="type-filter" value="episode" onClick={filter} />
                    <label>Episodes</label>
                </form>
            </div>
            <div>

                {valor === "characters" && characters.map(renderCharacter)}
                {valor === "location" && location.map(renderLocation)}
                {valor === "episode" && episode.map(renderEpisode)}

            </div>
            <button onClick={handleClick}>siguiente</button>
        </>
    )
}

function mapState({ data }) {

    return {
        characters: data.character,
        nextPage: data.nextPage,
        location: data.location,
        episode: data.episode
    }
}

export default connect(mapState, { nextPageAction })(Home)
