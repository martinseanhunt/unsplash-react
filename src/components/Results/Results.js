import React, { useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Context from '../../store/Context'
import useGetResults from './useGetResults'

import Section from '../layout/Section'
import ResultCard from './ResultCard'
import Loading from '../Loading'
import Error from '../Error'
import ResultsTitle from './ResultsTitle'
import Pagination from './Pagination'

const Results = props => {
  const { 
    results: { state, dispatch }, 
    user: { state: user } 
  } = useContext(Context)

  const history = useHistory()
  
  const { 
    error, 
    loading, 
    results, 
    totalPages 
  } = state

  const {
    initialized,
    page,
    searchQuery,
    pathname,
    isFavorites
  } = useGetResults()

  const handleChangePage = (change) => {
    // TODO: This is a quick fix... Improve getting top value
    // TODO: This would work a lot better with prefetching
    window.scrollTo({
      top: 486, 
      behavior: 'smooth'
    })
    history.push(`${pathname}?page=${page + change}${searchQuery ? `&query=${searchQuery}`: ''}`)
  }

  // TODO: This is a quick fix, improve how I'm getting height
  if(loading) return (<Loading height={results.length ? '1591' : undefined}/>) 
  if(error) return (<Error error={error} />)
  if(!initialized) return null
  
  return (
    <Section>
      <ResultsTitle
        isFavorites={isFavorites}
        searchQuery={searchQuery}
      />
      <ResultsContainer>
        {results.map(r => 
          <ResultCard 
            result={r}  
            key={r.id} 
            isFavorites={isFavorites}
            page={page}
          />)}
      </ResultsContainer>
      <Pagination 
        page={page}
        totalPages={totalPages}
        searchQuery={searchQuery}
        pathname={pathname}
        handleChangePage={handleChangePage}
      />
    </Section>
  )
}

const ResultsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
`

export default Results