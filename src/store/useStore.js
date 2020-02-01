import { useMemo, useReducer } from 'react'

import searchReducer from './reducers/searchReducer'

export default () => {
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    error: null,
    result: null,
    loading: false,
    page: 1,
    searchTerm: ''
  })

  // TODO: Should I be using useMemo here or in the index.js?
  const store = useMemo(() => ({
    search: {
      state: searchState,
      dispatch: searchDispatch
    }
  }), [
    searchState,
  ])

  return store
}



