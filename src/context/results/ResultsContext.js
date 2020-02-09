import React, { useContext, createContext, useReducer, useMemo } from 'react'

import resultsReducer, { initialState } from './resultsReducer'

const ResultsContext = createContext()
const useResultsContext = () => useContext(ResultsContext)

const ResultsContextProvider = props => {
  const [state, dispatch] = useReducer(resultsReducer, initialState)

  const value = useMemo(() => ({
    state,
    dispatch
  }), [
    state, 
    dispatch
  ])

  return (
    <ResultsContext.Provider value={props.value || value}>
      {props.children}
    </ResultsContext.Provider>
  )
}

export default ResultsContextProvider
export { useResultsContext }