import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import charsReducer, { getCharacterAction, getLocationsAction, getEpisodesAction } from './charsDuck'
import thunk from 'redux-thunk'


let rootReducer = combineReducers({
    data: charsReducer,
    //locations: locationReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
    )
    // consiuiendo los persojaes por primera vez
    getCharacterAction()(store.dispatch, store.getState)
    getLocationsAction()(store.dispatch, store.getState)
    getEpisodesAction()(store.dispatch, store.getState)
    return store
}