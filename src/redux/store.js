import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import dataReducer, { getCharacterAction, getLocationsAction, getEpisodesAction } from './dataDuck'
import thunk from 'redux-thunk'


let rootReducer = combineReducers({
    data: dataReducer,
    //locations: locationReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let generateStore = () => {
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    )

    getCharacterAction()(store.dispatch, store.getState)
    getLocationsAction()(store.dispatch, store.getState)
    getEpisodesAction()(store.dispatch, store.getState)
    return store
}

export default generateStore 