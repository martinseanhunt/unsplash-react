import { useMemo, useReducer } from 'react'

import searchReducer from './reducers/searchReducer'
import userReducer from './reducers/userReducer'

export default () => {
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    error: null,
    result: null,
    loading: false,
    page: 1,
    searchTerm: ''
  })

  const [userState, userDispatch] = useReducer(userReducer, {
    user: null
  })

  // TODO: Should I be using useMemo here or in the index.js?
  const store = useMemo(() => ({
    search: {
      state: searchState,
      dispatch: searchDispatch
    },
    user: {
      state: userState,
      dispatch: userDispatch
    }
  }), [
    searchState,
    userState
  ])

  return store
}



