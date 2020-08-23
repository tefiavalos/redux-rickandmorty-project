import ApolloClient, { gql } from 'apollo-boost'

// constantes
let initialData = {
  fetching: false,
  character: [],
  location: [],
  episode: [],
  nextPage: 2,
}

let client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
})

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
let UPDATE_PAGE = "UPDATE_PAGE"
let GET_LOCATION = "GET_LOCATION"
let GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS"
let GET_LOCATION_ERROR = "GET_LOCATION_ERROR"
let GET_EPISODES = "GET_EPISODES"
let GET_EPISODES_SUCCESS = "GET_EPISODES_SUCCESS"
let GET_EPISODES_ERROR = "GET_EPISODES_ERROR"
// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_EPISODES:
      return { ...state, fetching: true }
    case GET_EPISODES_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case GET_EPISODES_SUCCESS:
      return { ...state, episode: action.payload, fetching: false }
    case GET_LOCATION:
      return { ...state, fetching: true }
    case GET_LOCATION_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case GET_LOCATION_SUCCESS:
      return { ...state, location: action.payload, fetching: false }
    case UPDATE_PAGE:
      return { ...state, nextPage: action.payload }
    case GET_CHARACTERS:
      return { ...state, fetching: true }
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case GET_CHARACTERS_SUCCESS:
      return { ...state, character: action.payload, fetching: false }
    default:
      return state
  }
}

// actions (thunks)
export let getCharacterAction = () => (dispatch) => {
  let query = gql`
    query ($page:Int){
        characters(page:$page){
          results{
            name
            image
            type
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


export let getLocationsAction = () => (dispatch) => {
  let query = gql`
{
  locations 
  {
    info{
      pages
      next
      prev
    }
  results{
    name
    dimension
    residents{
      name
      type
    }
  }
}
}`
  dispatch({
    type: GET_LOCATION
  })
  return client.query({
    query,
  })

    .then(({ data, error }) => {
      if (error) {
        dispatch({
          type: GET_LOCATION_ERROR,
          payload: error
        })
      }
      dispatch({
        type: GET_LOCATION_SUCCESS,
        payload: data.locations.results
      })
    })

}

export let getEpisodesAction = () => (dispatch) => {
  let query = gql`
  {
    episodes{
      info{
        pages
        next
        prev
      }
      results{
        characters{
          name
          image
        }
        name
        created
        episode
      }
    }
  }`
  dispatch({
    type: GET_EPISODES
  })
  return client.query({
    query,
  })

    .then(({ data, error }) => {
      if (error) {
        dispatch({
          type: GET_EPISODES_ERROR,
          payload: error
        })
      }
      dispatch({
        type: GET_EPISODES_SUCCESS,
        payload: data.episodes.results
      })
    })

}

