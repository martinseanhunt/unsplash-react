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
  const { results: { state } } = useContext(Context)

  const history = useHistory()
  
  const { 
    error, 
    loading, 
    results, 
    totalPages,
    hasLoadedInitialResults
  } = state

  const {
    page,
    searchQuery,
    pathname,
    isFavourites
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
  if(error) return (<Error error={error} />)
  if(loading || !hasLoadedInitialResults) return (
    <Loading height={hasLoadedInitialResults ? '1591' : undefined}/>
  ) 
  
  return (
    <Section>
      <ResultsTitle
        isFavourites={isFavourites}
        searchQuery={searchQuery}
      />
      {results.length ? (
        <ResultsContainer>
          {results.map(r => 
            <ResultCard 
              result={r}  
              key={r.id} 
              isFavourites={isFavourites}
              page={page}
            />)}
        </ResultsContainer>
      ) : (
        <Error 
          error={`Looks like there aren't any results here`} 
          height='300'  
        />
      )}
      
      <Pagination 
        page={page}
        totalPages={totalPages}
        searchQuery={searchQuery}
        pathname={pathname}
        handleChangePage={handleChangePage}
        pageLength={results.length}
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