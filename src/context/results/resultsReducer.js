const initialState = {
  error: null,
  loading: false,
  results: [],
  totalPages: null,
  hasLoadedInitialResults: false,
  modal: null
}

const resultsReducer = (state,{type, payload}) => {
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
      return {
        ...state,
        results: isSearch ? payload.results : payload,
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