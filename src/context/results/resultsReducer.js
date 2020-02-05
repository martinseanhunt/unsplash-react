const initialState = {
  error: null,
  loading: false,
  results: [],
  totalPages: null,
  hasLoadedInitialResults: false,
  modal: null
}

const resultsReducer = (state,{type, payload}) => {
  // TODO: THis is messy. It was a quick decision that I 
  // made early on and planned to come back to but didn't get time
  const isSearch = !Array.isArray(payload)

  switch(type) {
    case 'SET_RESULTS_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
        results: []
      }
    case 'SET_RESULTS_RESULTS':
      /* 
        NOTE: In rare edge cases the API can sometimes return an empty object
        giving isSearch a false positive this is a quick fix. Really I should 
        seperate out search and non search result logic at the component level
        and have them fire different actions...

        Then I wouldn't have to mess around with this isSearch logic at all
        (would still need to test for empty obj though  )
      */
      let results
      if(isSearch) {
        // If there's no results property on the obect then it's a false negative
        // Set to empty array
        results = payload.results ? payload.results : []
      } else {
        results = payload
      }

      return {
        ...state,
        results,
        totalPages: payload.total_pages,
        loading: false,
        error: null,
        hasLoadedInitialResults: true
      }
    case 'SET_RESULTS_FAVOURITES':
      return {
        ...state,
        results: isSearch ? payload.results : payload,
        totalPages: payload.total_pages,
        loading: false,
        error: null,
        hasLoadedInitialResults: true
      }
    case 'RESULT_REMOVE_FAVOURITE': {
      return {
        ...state,
        results: state.results.filter(r => r.id !== payload)
      }
    }
    case 'RESULT_SET_FAVOURITE': {
      return {
        ...state,
        results: state.results.map(r => r.id === payload.id 
          ? { ...r, liked_by_user: payload.value }  
          : r
        )
      }
    }
    case 'RESULTS_APPEND_ONE': {
      return {
        ...state,
        results: [...state.results, payload[0]]
      }
    }
    case 'SET_RESULTS_ERROR':
      return {
        ...state,
        loading: false,
        results: [],
        error: payload,
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        modal: state.results.find(r => r.id === payload)
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modal: null
      }
    default:
      return state
  }
}

export default resultsReducer
export { initialState }