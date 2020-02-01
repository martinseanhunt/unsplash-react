import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../util/api'
import Context from '../../store/Context'
import Section from '../layout/Section'
import ResultCard from './ResultCard'

// TODO: change all anonymous functions to match the following structure
const Results = props => {
  const { search: { state, dispatch } } = useContext(Context)
  const { error, loading, result, page, searchQuery } = state

  // TODO: Think about whether this is the best approach... Is it good to 
  // Use a hook here and allow this to update itself whenever the relevant state
  // changes since it can be changed from here or other components
  useEffect(() => {
    dispatch({ type: 'SET_SEARCH_LOADING' })
    
    api.searchImages(searchQuery, page)
      .then(payload => {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload })
      })
      .catch(e => {
        console.error(e)
        dispatch({ type: 'SET_SEARCH_ERROR', payload: e.message })
      })
  },[page, searchQuery, dispatch])

  const prevPage = e => {
    e.preventDefault()
    dispatch({ type: 'SET_SEARCH_PAGE', payload: page - 1 })
  }

  const nextPage = e => {
    e.preventDefault()
    dispatch({ type: 'SET_SEARCH_PAGE', payload: page + 1 })
  }

  // TODO: Error and Loading components
  if(loading || !result) return (<div>Loading...</div>)
  if(error) return (<div>{state.error}</div>)

  // if there's no search query the result is just an array, otherwise the results are on result.results
  // TODO: I don't like this at all... Change state structure
  const results = result.results || result

  return (
    <Section>
      <ResultsContainer>
        {results.map(r => <ResultCard result={r} key={r.id} />)}
      </ResultsContainer>
      <div>
        {result.total_pages && `page ${page} of ${result.total_pages}`}
        {page > 1 && <button onClick={prevPage}>Prev</button>}

        {((page <= result.total_pages) || !result.total_pages) && <button onClick={nextPage}>Next</button>}
      </div>
    </Section>
  )
}

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default Results