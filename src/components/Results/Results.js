import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'

import api from '../../util/api'
import Context from '../../store/Context'
import Section from '../layout/Section'
import ResultCard from './ResultCard'

// TODO: change all anonymous functions to match the following structure
const Results = props => {
  const { results: { state, dispatch } } = useContext(Context)
  const { error, loading, results, page, searchQuery, totalPages } = state

  // TODO: Think about whether this is the best approach... Is it good to 
  // Use a hook here and allow this to update itself whenever the relevant state
  // changes since it can be changed from here or other components
  useEffect(() => {
    dispatch({ type: 'SET_RESULTS_LOADING' })
    
    api.searchImages(searchQuery, page)
      .then(payload => {
        dispatch({ type: 'SET_RESULTS_RESULTS', payload })
      })
      .catch(e => {
        console.error(e)
        dispatch({ type: 'SET_RESULTS_ERROR', payload: e.message })
      })
  },[page, searchQuery, dispatch])

  const prevPage = e => {
    e.preventDefault()
    dispatch({ type: 'SET_RESULTS_PAGE', payload: page - 1 })
  }

  const nextPage = e => {
    e.preventDefault()
    dispatch({ type: 'SET_RESULTS_PAGE', payload: page + 1 })
  }

  // TODO: Error and Loading components
  if(loading) return (<div>Loading...</div>)
  if(error) return (<div>{state.error}</div>)

  return (
    <Section>
      <ResultsContainer>
        {results.map(r => <ResultCard result={r} key={r.id} />)}
      </ResultsContainer>
      <div>
        {totalPages && `page ${page} of ${totalPages}`}
        {page > 1 && <button onClick={prevPage}>Prev</button>}

        {((page <= totalPages) || !totalPages) && <button onClick={nextPage}>Next</button>}
      </div>
    </Section>
  )
}

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default Results