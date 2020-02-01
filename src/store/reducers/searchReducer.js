export default (state,{type, payload}) => {
  switch(type) {
    case 'SET_SEARCH_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
        results: null
      }
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        result: payload,
        loading: false,
        error: null
      }
    case 'SET_SEARCH_ERROR':
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case 'SET_SEARCH_PAGE':
      console.log(payload)
      return {
        ...state,
        page: payload
      }
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        page: 1,
        searchQuery: payload
      }
    default:
      return state
  }
}