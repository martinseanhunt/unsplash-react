const resultsDefaultState = {
  error: null,
  loading: false,
  page: 1,
  searchQuery: '',
  results: [],
  totalPages: null,
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
      }
    case 'SET_RESULTS_FAVORITES':
      return {
        ...state,
        results: isSearch ? payload.results : payload,
        totalPages: payload.total_pages,
        searchQuery: '',
        loading: false,
        error: null,
      }
    case 'SET_RESULTS_ERROR':
      return {
        ...state,
        loading: false,
        results: [],
        error: payload,
      }
    case 'SET_RESULTS_PAGE':
      return {
        ...state,
        page: payload
      }
    case 'SET_REULTS_SEARCH_QUERY':
      return {
        ...state,
        page: 1,
        total_pages: null,
        searchQuery: payload,
        results: []
      }
    default:
      return state
  }
}

export default resultsReducer
export { resultsDefaultState }