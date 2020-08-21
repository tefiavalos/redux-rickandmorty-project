import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import charsReducer, { getCharacterAction } from './charsDuck'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    characters: charsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )
    // consiuiendo los persojaes por primera vez
    getCharacterAction()(store.dispatch, store.getState)
    return store
}