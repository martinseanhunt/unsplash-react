import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import api from '../api/api'
import { useUserContext } from '../context/user/UserContext'
import { useResultsContext } from '../context/results/ResultsContext'
import useQuery from './useQuery'

const useGetResults = () => {
  const { dispatch: resultsDispatch } = useResultsContext()
  const { state: user } = useUserContext()

  const { pathname } = useLocation()
  const isFavourites = pathname.includes('/favourites')

  const query = useQuery()
  const page = parseInt(query.get('page')) || 1
  const searchQuery = query.get('query')

  const { id: userId, username } = user

  useEffect(() => {    
    /* 
      Note: I thought about using useCallback for these and moving them outside the 
      useEffect, but I think they are small enouggh functions that it's not entirely worth it 
      should do some more reading on this to properly weight the performance cost/benefit  
    */

    const getFavourites = async () => {
      try {
        const payload = await api.getFavourites(username, page)
        resultsDispatch({ type: 'SET_RESULTS_FAVOURITES', payload })
      } catch(e) {
        handleError(e)
      }
    }

    const searchImages = async () => {
      try {
        const payload = await api.searchImages(searchQuery, page)
        resultsDispatch({ type: 'SET_RESULTS_RESULTS', payload })
      } catch(e) {
          handleError(e)
      }
    }

    const handleError = e => resultsDispatch({ type: 'SET_RESULTS_ERROR', payload: e.message })
    
    resultsDispatch({ type: 'SET_RESULTS_LOADING' })

    if(isFavourites && userId){
      getFavourites()
    } else {
      searchImages()
    } 
    
  },[page, searchQuery, resultsDispatch, pathname, userId, username, isFavourites])

  return {
    page,
    searchQuery,
    pathname,
    isFavourites
  }
}

export default useGetResults