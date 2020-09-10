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
  pageCh: 1,
  pageLo: 1,
  pageEp: 1
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
let PAGE_CH = "PAGE_CH"
let PAGE_LO = "PAGE_LO"
let PAGE_EP = "PAGE_EP"
// reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case PAGE_LO:
      return { ...state, fetching: false, pageLo: action.payload }
    case PAGE_EP:
      return { ...state, fetching: false, pageEp: action.payload }
    case PAGE_CH:
      return { ...state, fetching: false, pageCh: action.payload }
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
      dispatch({
        type: PAGE_CH,
        payload: 1
      })
    })
}

/* export let getPageLo = () => (dispatch) => {
      dispatch({
        type: PAGE_LO,
        payload: 1
      })
}

export let getPageEp = () => (dispatch) => {
      dispatch({
        type: PAGE_EP,
        payload: 1
      })
}

export let getPage = () => (dispatch) => {
      dispatch({
        type: PAGE_CH,
        payload: 1
      })
} */


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
  let { pageCh } = getState().data

  return client.query({
    query,
    variables: { page: nextPageCh }
  })
    .then(({ data }) => {
      dispatch({
        type: UPDATE_CH_PAGE,
        payload: data.characters.info.next
      })
      dispatch({
        type: PAGE_CH,
        payload: pageCh + 1
      })
      dispatch({
        type: PREV_CH_PAGE,
        payload: data.characters.info.prev
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
  let { pageCh } = getState().data

  return client.query({
    query,
    variables: { page: prevPageCh }
  })
    .then(({ data }) => {
      dispatch({
        type: PREV_CH_PAGE,
        payload: data.characters.info.prev
      })
      dispatch({
        type: PAGE_CH,
        payload: pageCh - 1
      })
      dispatch({
        type: UPDATE_CH_PAGE,
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
  let { pageLo } = getState().data

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
        type: PAGE_LO,
        payload: pageLo + 1
      })
      dispatch({
        type: PREV_LO_PAGE,
        payload: data.locations.info.prev
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
  let { prevPageLo } = getState().data
  let { pageLo } = getState().data

  return client.query({
    query,
    variables: { page: prevPageLo }
  })
    .then(({ data }) => {
      dispatch({
        type: PREV_LO_PAGE,
        payload: data.locations.info.prev
      })
      dispatch({
        type: PAGE_LO,
        payload: pageLo - 1
      })
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
  let { pageEp } = getState().data


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
        type: PAGE_EP,
        payload: pageEp + 1
      })
      dispatch({
        type: PREV_EP_PAGE,
        payload: data.episodes.info.prev
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
  let { prevPageEp } = getState().data
  let { pageEp } = getState().data

  return client.query({
    query,
    variables: { page: prevPageEp }
  })
    .then(({ data }) => {
      dispatch({
        type: PREV_EP_PAGE,
        payload: data.episodes.info.prev
      })
      dispatch({
        type: PAGE_EP,
        payload: pageEp - 1
      })
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

