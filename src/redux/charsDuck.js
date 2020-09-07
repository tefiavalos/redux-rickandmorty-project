import ApolloClient, { gql } from 'apollo-boost'

// constantes
let initialData = {
  fetching: false,
  character: [],
  location: [],
  episode: [],
  nextPageCh: 2,
  nextPageEp: 2,
  nextPageLo: 2,
  prevPageCh: null,
  prevPageEp: null,
  prevPageLo: null,
  pagesCh: null,
  page: 1
}

let client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
})

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
let UPDATE_CH_PAGE = "UPDATE_CH_PAGE"
let UPDATE_EP_PAGE = "UPDATE_EP_PAGE"
let UPDATE_LO_PAGE = "UPDATE_LO_PAGE"
let PREV_CH_PAGE = "PREV_CH_PAGE"
let PREV_EP_PAGE = "PREV_EP_PAGE"
let PREV_LO_PAGE = "PREV_LO_PAGE"
let GET_LOCATION = "GET_LOCATION"
let GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS"
let GET_LOCATION_ERROR = "GET_LOCATION_ERROR"
let GET_EPISODES = "GET_EPISODES"
let GET_EPISODES_SUCCESS = "GET_EPISODES_SUCCESS"
let GET_EPISODES_ERROR = "GET_EPISODES_ERROR"
let PAGES_CH = "PAGES_CH"
// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case PAGES_CH:
      return { ...state, fetching: false, pagesCh: action.payload }
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
      return { ...state, location: action.payload, fetching: false}
    case UPDATE_CH_PAGE:
      return { ...state, nextPageCh: action.payload }
    case UPDATE_LO_PAGE:
      return { ...state, nextPageLo: action.payload }
    case UPDATE_EP_PAGE:
      return { ...state, nextPageEp: action.payload }
      case PREV_CH_PAGE:
      return { ...state, prevPageCh: action.payload }
    case PREV_LO_PAGE:
      return { ...state, prevPageLo: action.payload }
    case PREV_EP_PAGE:
      return { ...state, prevPageEp: action.payload }
    case GET_CHARACTERS:
      return { ...state, fetching: true, page: action.payload }
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
          info{
            pages
            next
            prev
          }
          results{
            name
            image
            type
            gender
            species
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
  let { nextPageCh } = getState().data

  return client.query({
    query,
    variables: { page: nextPageCh }
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_CH_PAGE,
        payload: data.characters.info.next -1 && data.characters.info.next
      })
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: data.characters.results
      })
    }
    )
}

export let prevPageAction = () => (dispatch, getState) => {
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
  let { prevPageCh } = getState().data

  return client.query({
    query,
    variables: { page: prevPageCh }
  })
    .then(({ data }) => {
      dispatch({
        type: PREV_CH_PAGE,
        payload: data.characters.info.next == 2 ? data.characters.info.pages : data.characters.info.prev
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
    type
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

export let nextPageLocationAction = () => (dispatch, getState) => {
  let query = gql`
    query ($page:Int){
        locations(page:$page){
          info{
            pages
            next
            prev
          }
          results{
            name
            type
            dimension
            residents{
              name
              type
            }
          }
        }
      }
    `
  let { nextPageLo } = getState().data

  return client.query({
    query,
    variables: { page: nextPageLo }
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_LO_PAGE,
        payload: data.locations.info.next
      })
      dispatch({
        type: GET_LOCATION_SUCCESS,
        payload: data.locations.results
      })
    }
    )
}

export let prevPageLocationAction = () => (dispatch, getState) => {
  let query = gql`
    query ($page:Int){
        locations(page:$page){
          info{
            pages
            next
            prev
          }
          results{
            name
            type
            dimension
            residents{
              name
              type
            }
          }
        }
      }
    `
  let { nextPageLo } = getState().data

  return client.query({
    query,
    variables: { page: nextPageLo }
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_LO_PAGE,
        payload: data.locations.info.next
      })
      dispatch({
        type: GET_LOCATION_SUCCESS,
        payload: data.locations.results
      })
    }
    )
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

export let nextPageEpisodesAction = () => (dispatch, getState) => {
  let query = gql`
    query ($page:Int){
        episodes(page:$page){
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
      }
    `
  let { nextPageEp } = getState().data

  return client.query({
    query,
    variables: { page: nextPageEp }
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_EP_PAGE,
        payload: data.episodes.info.next
      })
      dispatch({
        type: GET_EPISODES_SUCCESS,
        payload: data.episodes.results
      })
    }
    )
} 

export let prevPageEpisodesAction = () => (dispatch, getState) => {
  let query = gql`
    query ($page:Int){
        episodes(page:$page){
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
      }
    `
  let { nextPageEp } = getState().data

  return client.query({
    query,
    variables: { page: nextPageEp }
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_EP_PAGE,
        payload: data.episodes.info.next
      })
      dispatch({
        type: GET_EPISODES_SUCCESS,
        payload: data.episodes.results
      })
    }
    )
} 

export function getPage(dispatch) {
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
            type
            gender
            species
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
            type: PAGES_CH,
            payload: error
          })
          return
        }
        dispatch({
          type: PAGES_CH,
          payload: data.characters.info.pages
        })
      })
}