import ApolloClient, { gql } from 'apollo-boost'

// constantes
let initialData = {
    fetching: false,
    array: [],
    nextPage: 2,
}

let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
})

let UPDATE_PAGE = "UPDATE_PAGE"
let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"

// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case UPDATE_PAGE:
            return { ...state, nextPage: action.payload }
        case GET_CHARACTERS:
            return { ...state, fetching: true }
        case GET_CHARACTERS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_CHARACTERS_SUCCESS:
            return { ...state, array: action.payload, fetching: false }
        default:
            return state
    }
}

// actions (thunks)
export let getCharacterAction = () => (dispatch, getState) => {
    let query = gql`
    query ($page:Int){
        characters(page:$page){
          results{
            name
            image
          }
        }
      }
    `
    dispatch({
        type: GET_CHARACTERS
    })
    return client.query({
        query
    })
        .then(({ data, error }) => {
            if (error) {
                dispatch({
                    type: GET_CHARACTERS_ERROR,
                    payload: error
                })
                return
            }
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: data.characters.results
            })
        })
}

export let nextPageAction = () => (dispatch, getState) => {
    let query = gql`
    query ($page:Int){
        characters(page:$page){
          info{
            pages
            next
            prev
          }
          results{
            name
            image
          }
        }
      }
    `
    let { nextPage } = getState().characters
    return client.query({
        query,
        variables: { page: nextPage }
    })
        .then(({ data }) => {
            dispatch({
                type: UPDATE_PAGE,
                payload: data.characters.info.next
            })
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: data.characters.results
            })

        }
        )
}

