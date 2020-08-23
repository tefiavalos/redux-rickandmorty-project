import ApolloClient, { gql } from 'apollo-boost'

// constantes
let initialData = {
    fetching: false,
    location: [],
    nextPage: 2
}

let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
})

let GET_LOCATION = "GET_LOCATION"
let GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS"
let GET_LOCATION_ERROR = "GET_LOCATION_ERROR"
let UPDATE_PAGE = "UPDATE_PAGE"

// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case GET_LOCATION:
            return { ...state, fetching: true }
        case GET_LOCATION_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_LOCATION_SUCCESS:
            return { ...state, location: action.payload, fetching: false }
    }
}
// actions (thunks)

/* export let nextPageAction = () => (dispatch, getState) => {
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
} */


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
        dimension
        residents{
          name
          type
        }
      }
    }
    } `
    dispatch({
        type: GET_LOCATION
    })
    return client.query({
        query
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
                payload: data.locations
            })
            console.log(data)
        })

}