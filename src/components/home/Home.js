import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../card/Card'
import { connect } from 'react-redux'
import { nextPageAction } from '../../redux/charsDuck'
import './home.css'


function Home({characters, nextPageAction, location, episode}) {
    function renderCharacter(chars, i) {
        return (
            <Card {...chars} key={i}/>
        )
    }

    function handleClick(){
        return(
            nextPageAction()
        )
    }

    return (
        <>
        <div>
            <form>
                <input type="radio" value="Locations" />
                <label>Locations</label>
            </form>
        </div>
        
        <div className="container-characters">
            {characters.map(renderCharacter)}
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

export default connect(mapState, {nextPageAction})(Home)
/* import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction, addToFavoritesAction } from '../../redux/charsDuck'


function Home({ addToFavoritesAction, chars, removeCharacterAction }) {

    function renderCharacter() {
        let char = chars[0]
        return (
        //prop que inventó para el componente Card
            <Card
            rightClick={addFav}
            leftClick={nextCharacter}
            {...char} />
        )
    }

    function nextCharacter() {
        removeCharacterAction()
    }

    function addFav() {
        addToFavoritesAction()
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

//mapStateToProps

function mapState(state){
    return {
        chars: state.characters.array
    }
}

export default connect(mapState, {removeCharacterAction, addToFavoritesAction})(Home) */