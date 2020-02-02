import { useMemo, useReducer } from 'react'

import resultsReducer, { resultsDefaultState } from './reducers/resultsReducer'
import userReducer, { userDefaultState } from './reducers/userReducer'

export default () => {
  const [resultsState, resultsDispatch] = useReducer(resultsReducer, resultsDefaultState)

  const [userState, userDispatch] = useReducer(userReducer, userDefaultState)

  // TODO: Should I be using useMemo here or in the index.js?
  const store = useMemo(() => ({
    results: {
      state: resultsState,
      dispatch: resultsDispatch
    },
    user: {
      state: userState,
      dispatch: userDispatch
    }
  }), [
    resultsState,
    userState
  ])

  return store
}



