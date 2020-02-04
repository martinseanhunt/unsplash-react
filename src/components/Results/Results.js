import React from 'react'
import { useHistory } from 'react-router-dom'

import api from '../../api/api'
import { useUserContext } from '../../context/user/UserContext'
import { useResultsContext } from '../../context/results/ResultsContext'
import useGetResults from '../../hooks/useGetResults'
import theme from '../../globalstyles/theme'

import Section from '../layout/Section'
import Loading from '../common/Loading'
import Error from '../common/Error'
import ResultsTitle from './ResultsTitle'
import ResultsContainer from './styles/ResultsContainer'
import ResultCard from './ResultCard/ResultCard'
import Pagination from './Pagination/Pagination'

const Results = props => {
  const history = useHistory()
  const { state, dispatch: resultsDispatch } = useResultsContext()
  const { state: user } = useUserContext()
  
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

  const handleLikePhoto = async (resultId) => {
    try {
      await api.likePhoto(resultId)
      resultsDispatch({ 
        type: 'RESULT_SET_FAVOURITE', 
        payload: { id: resultId, value: true } 
      })
    } catch(e) {
      console.warn(e)
    } 
  }

  const handleUnlikePhoto = async (resultId) => {
    try {
      if(!isFavourites) {
        await api.unlikePhoto(resultId) 
        resultsDispatch({ 
          type: 'RESULT_SET_FAVOURITE', 
          payload: { id: resultId, value: false } 
        })
      } else {
        const nextPage = await api.getFavourites(user.username, page + 1)
        await api.unlikePhoto(resultId) 
        resultsDispatch({ type: 'RESULT_REMOVE_FAVOURITE', payload: resultId})
        if(nextPage.length)
          resultsDispatch({ type: 'RESULTS_APPEND_ONE', payload: nextPage })
      }
    } catch(e) {
      console.warn(e)
    }
  }

  const handleChangePage = (change) => {
    const scrollTo = theme.layout.headerHight - 50

    if(window.pageYOffset > scrollTo) {
      window.scrollTo({
        top: scrollTo, 
        behavior: 'smooth'
      })
    }
    
    history.push(`${pathname}?page=${page + change}${searchQuery ? `&query=${searchQuery}`: ''}`)
  }

  // TODO: This is a quick temp solution, improve how I'm getting height
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
              isFavouritesPage={isFavourites}
              page={page}
              handleLikePhoto={handleLikePhoto}
              handleUnlikePhoto={handleUnlikePhoto}
              user={user}
            />
          )}
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

export default Results